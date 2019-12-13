import { ComponentCanDeactivate, ThesauriSet } from '@cadmus/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { startWith, map, debounceTime, distinctUntilChanged, take } from 'rxjs/operators';
import { DialogService } from '../services/dialog.service';

/**
 * Base class for part/fragment editors dumb components.
 * The model type is the templated argument T.
 */
export abstract class ModelEditorComponentBase<T>
  implements ComponentCanDeactivate {
    private _json: string;
    private _ignoreJsonChange: boolean;

    // thesaurus
    private _thesauri: ThesauriSet | null;

    /**
     * True if the edited model is dirty, i.e. its data were edited
     * locally, but not saved to the server.
     */
    @Input()
    public dirty$: Observable<boolean>;

    /**
     * The JSON code representing the part being edited.
     */
    @Input()
    public get json(): string {
      return this._json;
    }
    public set json(value: string) {
      this._json = value;
      if (!this._ignoreJsonChange) {
        this.onModelSet(this.getModelFromJson());
      }
    }
    /**
     * Event emitted when the edited part's JSON is saved.
     */
    @Output()
    public jsonChange: EventEmitter<string>;

    /**
     * The optional thesauri to be used within this editor.
     */
    @Input()
    public get thesauri(): ThesauriSet | null {
      return this._thesauri;
    }
    public set thesauri(value: ThesauriSet | null) {
      this._thesauri = value;
      this.onThesauriSet();
    }

    /**
     * True to disable the editor.
     */
    @Input()
    set disabled(value: boolean) {
      if (!this.form) {
        return;
      }
      if (value) {
        this.form.disable();
      } else {
        this.form.enable();
      }
    }

    /**
     * Emitted when the user requests to close the editor.
     */
    @Output()
    public editorClose: EventEmitter<any>;

    /**
     * The root form of the editor.
     * You MUST instantiate this form in the ctor.
     */
    public form: FormGroup;

    constructor(protected dialogService: DialogService) {
      this.jsonChange = new EventEmitter<string>();
      this.editorClose = new EventEmitter<any>();
    }

    /**
     * Implementation of ComponentCanDeactivate, which relies on the dirty$
     * input property and on the root form's dirty state, when available.
     */
    public canDeactivate(): Observable<boolean> {
      // can-deactivate from dirty
      const canFromDirty$ = this.dirty$.pipe(
        startWith(true),
        map(d => {
          return !d;
        })
      );

      // if form not available, just rely on the dirty property
      if (!this.form) {
        return canFromDirty$;
      } else {
        // else combine dirty AND form.dirty
        const canFromForm$ = this.form.statusChanges.pipe(
          startWith(true),
          debounceTime(300),
          distinctUntilChanged(),
          map(_ => {
            return !this.form.dirty;
          })
        );
        return combineLatest([canFromDirty$, canFromForm$]).pipe(
          map(([fd, ff]) => {
            return fd && ff;
          })
        );
      }
    }

    /**
     * Get the part from the specified JSON code, or from the current
     * json property if no JSON code is specified. This is just a helper
     * method for parsing JSON and casting it to the template argument type.
     *
     * @param json The optional JSON code representing the part.
     * @returns The part, or null.
     */
    protected getModelFromJson(json: string = null): T {
      if (!json) {
        json = this._json;
      }
      return json ? JSON.parse(json) : null;
    }

    /**
     * Update the json property from the specified code and emit the
     * corresponding jsonChange event, without triggering a call to
     * onModelSet.
     *
     * @param json The JSON core representing the part.
     */
    protected updateJson(json: string) {
      this._ignoreJsonChange = true;
      try {
        this.json = json;
        this.jsonChange.emit(json);
      } finally {
        this._ignoreJsonChange = false;
      }
    }

    /**
     * Invoked whenever the json property is set (=data comes from input json
     * property), unless setting it via updateJson. The default implementation
     * does nothing. Override to add custom behavior, e.g. update the form to
     * reflect the new part value.
     */
    protected onModelSet(model: T) {}

    /**
     * Invoked whenever the thesauri property is set. Override to take
     * custom actions, typically to set some bound properties.
     */
    protected onThesauriSet() {}

    /**
     * Implement in derived classes to get the mode from form's controls.
     * This is used when saving (=data goes to the output jsonChange event).
     */
    protected getModelFromForm(): T {
      return null;
    }

    /**
     * Emit a request to close the editor.
     */
    public close() {
      if (!this.form.dirty) {
        this.editorClose.emit();
        return;
      }
      this.dialogService
        .confirm('Warning', 'Discard changes?')
        .pipe(take(1))
        .subscribe((ok: boolean) => {
          if (ok) {
            this.editorClose.emit();
          }
        });
    }

    /**
     * Save the edited data if valid. This invokes getModelFromForm to get
     * the model from the form's controls, serializes it into JSON,
     * updates the json property, and marks the root form as pristine.
     */
    public save() {
      if (this.form.invalid) {
        return;
      }
      const part = this.getModelFromForm();
      this.updateJson(JSON.stringify(part));
      this.form.markAsPristine();
    }
  }

import { ComponentCanDeactivate, ThesauriSet } from '@cadmus/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { startWith, map, debounceTime, distinctUntilChanged } from 'rxjs/operators';

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

    @Output()
    public editorClose: EventEmitter<any>;

    /**
     * The root form of the editor.
     * You MUST instantiate this form in the ctor.
     */
    public form: FormGroup;

    constructor() {
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
     * Update the json property from the specified code, without triggering
     * a call to onPartSet.
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
     * Invoked whenever the json property is set, unless setting it via
     * updateJson. The default implementation does nothing. Override
     * to add custom behavior, e.g. update the form to reflect the new part value.
     */
    protected onModelSet(model: T) {}

    /**
     * Invoked whenever the thesauri property is set.
     */
    protected onThesauriSet() {}
  }

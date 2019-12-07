import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { distinctUntilChanged, map, startWith, debounceTime } from 'rxjs/operators';
import {
  Fragment,
  ComponentCanDeactivate,
  ThesauriSet
} from '@cadmus/core';
import { FormGroup } from '@angular/forms';
import { Observable, combineLatest } from 'rxjs';

// Angular abstract components:
// https://medium.com/@ozak/stop-repeating-yourself-in-angular-how-to-create-abstract-components-9726d43c99ab

/**
 * Abstract base component for dumb fragment editors. The template argument specifies
 * the fragment's type. You can leave it to its default value (Fragment) if not
 * required.
 * As this is not an abstract class, you do not need to remember to invoke
 * super for the overridden methods. When you use an abstract class and inject
 * anything to it, you need to call super and inject them in your the constructor
 * of your subclasses as well. While it is true that Injector helps you with
 * this, you can avoid that constructor and the super call when you use the
 * decorator instead, and declare the component in a module.
 */
@Component({
  selector: 'cadmus-fragment-editor-base',
  template: '',
  styles: []
})
export class FragmentEditorBaseComponent<T = Fragment>
  implements OnInit, ComponentCanDeactivate {
  private _json: string;
  private _ignoreJsonChange: boolean;

  // thesaurus
  private _thesauri: ThesauriSet | null;

  /**
   * True if the edited part is dirty, i.e. its data were edited
   * locally, but not saved to the server.
   */
  @Input()
  public dirty$: Observable<boolean>;

  /**
   * The JSON code representing the fragment being edited.
   */
  @Input()
  public get json(): string {
    return this._json;
  }
  public set json(value: string) {
    this._json = value;
    if (!this._ignoreJsonChange) {
      this.onFragmentSet(this.getFragmentFromJson());
    }
  }
  /**
   * Event emitted when the edited fragment's JSON is saved.
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

  ngOnInit() {}

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
        map(s => {
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
   * Get the fragment from the specified JSON code, or from the current
   * json property if no JSON code is specified. This is just a helper
   * method for parsing JSON and casting it to the template argument type.
   *
   * @param json The optional JSON code representing the fragment.
   * @returns The fragment, or null.
   */
  protected getFragmentFromJson(json: string = null): T {
    if (!json) {
      json = this._json;
    }
    return json ? JSON.parse(json) : null;
  }

  /**
   * Update the json property from the specified code, without triggering
   * a call to onFragmentSet.
   *
   * @param json The JSON core representing the fragment.
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
   * to add custom behavior, e.g. update the form to reflect the new fragment value.
   */
  protected onFragmentSet(fragment: T) {}

  /**
   * Invoked whenever the thesauri property is set.
   */
  protected onThesauriSet() {}
}

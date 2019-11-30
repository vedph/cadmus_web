import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { Thesaurus, Fragment } from '@cadmus/core';
import { FormGroup } from '@angular/forms';

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
export class FragmentEditorBaseComponent<T = Fragment> implements OnInit {
  private _json: string;
  private _ignoreJsonChange: boolean;

  // thesaurus
  private _thesauri: { [key: string]: Thesaurus } | null;

  /**
   * True if the control is disabled.
   */
  @Input()
  public disabled: boolean;

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
  public get thesauri(): { [key: string]: Thesaurus } | null {
    return this._thesauri;
  }
  public set thesauri(value: { [key: string]: Thesaurus } | null) {
    this._thesauri = value;
    this.onThesauriSet();
  }

  /**
   * Event emitted whenever the dirty state of the editor changes.
   */
  @Output()
  public editorDirty: EventEmitter<boolean>;

  @Output()
  public editorClose: EventEmitter<any>;

  constructor() {
    this.jsonChange = new EventEmitter<string>();
    this.editorDirty = new EventEmitter<boolean>();
    this.editorClose = new EventEmitter<any>();
  }

  ngOnInit() {}

  /**
   * Subscribe to the status change of the specified form,
   * so that whenever its dirty status changes, a corresponding
   * editorDirty event is fired.
   *
   * @param form The form group to subscribe to.
   */
  protected subscribeToFormStatus(form: FormGroup) {
    form.statusChanges
      .pipe(
        map(_ => form.dirty),
        distinctUntilChanged()
      )
      .subscribe(dirty => {
        this.editorDirty.emit(dirty);
      });
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

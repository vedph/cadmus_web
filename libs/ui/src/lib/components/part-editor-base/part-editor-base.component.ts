import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { Part, Thesaurus } from '@cadmus/core';
import { FormGroup } from '@angular/forms';

// Angular abstract components:
// https://medium.com/@ozak/stop-repeating-yourself-in-angular-how-to-create-abstract-components-9726d43c99ab

/**
 * Abstract base component for dumb part editors. The template argument specifies
 * the part's type. You can leave it to its default value (Part) if not
 * required.
 * As this is not an abstract class, you do not need to remember to invoke
 * super for the overridden methods. When you use an abstract class and inject
 * anything to it, you need to call super and inject them in your the constructor
 * of your subclasses as well. While it is true that Injector helps you with
 * this, you can avoid that constructor and the super call when you use the
 * decorator instead, and declare the component in a module.
 */
@Component({
  selector: 'cadmus-part-editor-base',
  template: '',
  styles: []
})
export class PartEditorBaseComponent<T = Part> implements OnInit {
  private _partJson: string;
  private _ignoreJsonChange: boolean;

  // thesaurus
  private _thesauri: { [key: string]: Thesaurus } | null;

  /**
   * True if the control is disabled.
   */
  @Input()
  public disabled: boolean;

  /**
   * The JSON code representing the part being edited.
   */
  @Input()
  public get json(): string {
    return this._partJson;
  }
  public set json(value: string) {
    this._partJson = value;
    if (!this._ignoreJsonChange) {
      this.onPartSet(this.getPartFromJson());
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
   * Get the part from the specified JSON code, or from the current
   * json property if no JSON code is specified. This is just a helper
   * method for parsing JSON and casting it to the template argument type.
   *
   * @param json The optional JSON code representing the part.
   * @returns The part, or null.
   */
  protected getPartFromJson(json: string = null): T {
    if (!json) {
      json = this._partJson;
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
    } finally {
      this._ignoreJsonChange = false;
    }
  }

  /**
   * Invoked whenever the json property is set, unless setting it via
   * updateJson. The default implementation does nothing. Override
   * to add custom behavior, e.g. update the form to reflect the new part value.
   */
  protected onPartSet(part: T) {}

  /**
   * Invoked whenever the thesauri property is set.
   */
  protected onThesauriSet() {}
}

import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Part, Thesaurus } from '@cadmus/core';

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
  private _thesauri: Thesaurus[];

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
      this.onJsonSet();
    }
  }
  /**
   * Event emitted when the edited part's json is saved.
   */
  @Output()
  public jsonChange: EventEmitter<string>;

  constructor() {
    this.jsonChange = new EventEmitter<string>();
  }

  /**
   * The optional thesauri to be used within this editor.
   */
  @Input()
  public get thesauri(): Thesaurus[] | null {
    return this._thesauri;
  }
  public set thesauri(value: Thesaurus[] | null) {
    this._thesauri = value;
    this.onThesauriSet();
  }

  ngOnInit() {}

  /**
   * Get the part from the specified JSON code, or from the current
   * json property if no JSON code is specified. This is just a helper
   * method for parsing JSON and casting it to the template argument type.
   *
   * @param json The optionsl JSON code representing the part.
   * @returns The part, or null.
   */
  protected getPart(json: string = null): T {
    if (!json) {
      json = this._partJson;
    }
    return json ? JSON.parse(json) : null;
  }

  /**
   * Set the json property from the specified part, without triggering
   * a call to onJsonSet.
   */
  protected setPart(part: T) {
    this._ignoreJsonChange = true;
    try {
      this.json = JSON.stringify(part);
    } finally {
      this._ignoreJsonChange = false;
    }
  }

  /**
   * Set the json property from the specified code, without triggering
   * a call to onJsonSet.
   */
  protected setPartJson(json: string) {
    this._ignoreJsonChange = true;
    try {
      this.json = json;
    } finally {
      this._ignoreJsonChange = false;
    }
  }

  /**
   * Invoked whenever the json property is set, unless setting it via
   * setPart methods. The default implementation does nothing. Override
   * to add custom behavior, e.g. update the form to reflect the new part value.
   */
  protected onJsonSet() {}

  /**
   * Invoked whenever the thesauri property is set.
   */
  protected onThesauriSet() {}
}

import { ThesauriSet, User } from '@cadmus/core';
import { Input, Output, EventEmitter, Directive } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthService } from '@cadmus/api';
import { extractPristineChanges } from '../utils';

/**
 * Base class for part/fragment editors dumb components.
 * The model type is the templated argument T.
 * A dumb component gets as input the JSON representing the model,
 * and optionally the JSON representing a set of thesauri.
 * It outputs the JSON representing the model (when saved),
 * a request to close the editor, and a notification about the dirty
 * state of the editor itself.
 * When implementing your model editor extending this class:
 * - set the form property to your "root" form;
 * - call initEditor in your OnInit;
 * - override onModelSet, and eventually OnThesauriSet;
 * - override getModelFromForm.
 */
@Directive()
export abstract class ModelEditorComponentBase<T> {
  private _json: string;
  private _ignoreJsonChange: boolean;

  // thesaurus
  private _thesauri: ThesauriSet | null;

  /**
   * The part's item ID.
   */
  @Input()
  public itemId: string;

  /**
   * The part's role ID.
   */
  @Input()
  public roleId: string;

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
      this.onModelSet(this.getModelFromJson(value));
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
   * Emitted when the dirty state of the edited data changes.
   */
  @Output()
  public dirtyChange: EventEmitter<boolean>;

  /**
   * The root form of the editor.
   * You MUST instantiate this form in the ctor.
   */
  public form: FormGroup;

  /**
   * The current user.
   */
  public user: User;

  /**
   * The user authorization level (0-4).
   */
  public userLevel: number;

  constructor(private _authService: AuthService) {
    this.jsonChange = new EventEmitter<string>();
    this.editorClose = new EventEmitter<any>();
    this.dirtyChange = new EventEmitter<boolean>();

    // this.updateUserProperties(_authService.currentUserValue);
    _authService.currentUser$.subscribe((user: User) => {
      this.updateUserProperties(user);
    });
  }

  private updateUserProperties(user: User) {
    this.user = user;
    this.userLevel = this._authService.getCurrentUserLevel();
  }

  /**
   * Initialize the editor. You MUST call this at the end of your OnInit.
   */
  protected initEditor() {
    // this.form.valueChanges
    //   .pipe(
    //     map((_) => {
    //       return this.form.dirty;
    //     }),
    //     distinctUntilChanged()
    //   )
    //   .subscribe((dirty: boolean) => {
    //     this.dirtyChange.emit(dirty);
    //   });

    extractPristineChanges(this.form).subscribe(p => {
      this.dirtyChange.emit(!p);
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
  protected getModelFromJson(json: string = null): T {
    if (!json) {
      json = this._json;
    }
    const model: T = json ? JSON.parse(json) : null;
    if (!model) {
      return null;
    }
    // an empty object ({}) must be treated as null
    return Object.keys(model).length? model : null;
  }

  /**
   * Update the json property from the specified JSON code, and emit the
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
   * property), unless setting it via updateJson. Implement to update the form
   * controls to reflect the new model data.
   * @param model The model set, or null.
   */
  protected abstract onModelSet(model: T): void;

  /**
   * Invoked whenever the thesauri property is set. Override to take
   * custom actions, typically to set some bound properties.
   */
  protected onThesauriSet(): void {}

  /**
   * Implement in derived classes to get the model from form's controls.
   * This is used when saving (=data goes to the output jsonChange event).
   */
  protected abstract getModelFromForm(): T;

  /**
   * Trim the specified text, if not falsy, eventually flattening and normalizing
   * its whitespaces.
   *
   * @param text The text to trim.
   * @param flattenWs True to flatten and normalize whitespaces. When this is
   * true, all the whitespaces are converted into a single space.
   * @returns The processed text.
   */
  protected trimIfAny(text: string, flattenWs = false): string {
    if (!text) {
      return text;
    }
    if (flattenWs) {
      text = text.replace(/\s+/g, ' ');
    }
    text = text.trim();
    return text;
  }

  /**
   * Emit a request to close the editor.
   */
  public close() {
    this.editorClose.emit();
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
    // the form is no more dirty
    this.form.markAsPristine();
    this.dirtyChange.emit(false);
  }
}

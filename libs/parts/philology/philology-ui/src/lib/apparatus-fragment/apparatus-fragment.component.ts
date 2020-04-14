import { Component, OnInit } from '@angular/core';
import { ApparatusFragment } from '../..';
import { AuthService } from '@cadmus/api';
import { ModelEditorComponentBase, DialogService } from '@cadmus/ui';
import { ApparatusEntryType, ApparatusEntry } from '../apparatus-fragment';
import {
  FormControl,
  FormBuilder,
  Validators,
  FormGroup
} from '@angular/forms';
import { Thesaurus } from '@cadmus/core';

/**
 * Critical apparatus fragment.
 * Thesauri: apparatus-tags, apparatus-witnesses, apparatus-authors.
 */
@Component({
  selector: 'cadmus-apparatus-fragment',
  templateUrl: './apparatus-fragment.component.html',
  styleUrls: ['./apparatus-fragment.component.css']
})
export class ApparatusFragmentComponent
  extends ModelEditorComponentBase<ApparatusFragment>
  implements OnInit {
  private _newEditedEntry: boolean;

  public fragment: ApparatusFragment;
  public editedEntry: ApparatusEntry;
  public currentTabIndex: number;

  public tag: FormControl;
  public entryCount: FormControl;
  public form: FormGroup;

  public tagThesaurus: Thesaurus;
  public witnessThesaurus: Thesaurus;
  public authorThesaurus: Thesaurus;

  constructor(
    authService: AuthService,
    formBuilder: FormBuilder,
    private _dialogService: DialogService
  ) {
    super(authService);
    // form
    this.tag = formBuilder.control(null, Validators.maxLength(50));
    this.entryCount = formBuilder.control(0, Validators.min(1));
    this.form = formBuilder.group({
      tag: this.tag,
      entryCount: this.entryCount
    });
    this.currentTabIndex = 0;
  }

  ngOnInit() {
    this.initEditor();
  }

  private getThesaurus(key: string) {
    if (this.thesauri && this.thesauri[key]) {
      return this.thesauri[key];
    }
    return null;
  }

  protected onThesauriSet() {
    this.tagThesaurus = this.getThesaurus('apparatus-tags');
    this.witnessThesaurus = this.getThesaurus('apparatus-witnesses');
    this.authorThesaurus = this.getThesaurus('apparatus-authors');
  }

  private updateForm(model: ApparatusFragment) {
    if (!model) {
      this.form.reset();
      return;
    }
    this.tag.setValue(model.tag);
    this.entryCount.setValue(model.entries?.length || 0);
    this.form.markAsPristine();
  }

  protected onModelSet(model: ApparatusFragment) {
    this.fragment = model;
    this.updateForm(model);
  }

  protected getModelFromForm(): ApparatusFragment {
    let fr = this.getModelFromJson();
    if (!fr) {
      fr = {
        location: this.fragment ? this.fragment.location : null,
        entries: []
      };
    }
    fr.tag = this.tag.value;
    fr.entries = this.fragment.entries;
    return fr;
  }

  public getEntryTypeDsc(type: number): string {
    switch (type) {
      case 1: return 'add-b';
      case 2: return 'add-a';
      case 3: return 'note';
      default: return 'rep';
    }
  }

  public addEntry() {
    const entry = { type: ApparatusEntryType.replacement };
    this.fragment.entries.push(entry);
    this.entryCount.setValue(this.fragment.entries.length);
    this._newEditedEntry = true;
    this.editEntry(entry);
  }

  public editEntry(entry: ApparatusEntry) {
    this.editedEntry = entry;
    this.currentTabIndex = 1;
  }

  public onEntrySave(entry: ApparatusEntry) {
    this._newEditedEntry = false;
    const i = this.fragment.entries.indexOf(this.editedEntry);
    this.fragment.entries.splice(i, 1, entry);
    this.currentTabIndex = 0;
    this.editedEntry = null;
    this.form.markAsDirty();
  }

  public onEntryClose() {
    if (this._newEditedEntry) {
      const index = this.fragment.entries.indexOf(this.editedEntry);
      this.fragment.entries.splice(index, 1);
      this.entryCount.setValue(this.fragment.entries.length);
    }
    this.currentTabIndex = 0;
    this.editedEntry = null;
  }

  public removeEntry(index: number) {
    this._dialogService
      .confirm('Confirm Deletion', 'Delete entry?')
      .subscribe(result => {
        if (!result) {
          return;
        }
        this.fragment.entries.splice(index, 1);
        this.entryCount.setValue(this.fragment.entries.length);
        this.form.markAsDirty();
      });
  }

  public moveEntryUp(index: number) {
    if (index < 1) {
      return;
    }
    const entry = this.fragment.entries[index];
    this.fragment.entries.splice(index, 1);
    this.fragment.entries.splice(index - 1, 0, entry);
    this.form.markAsDirty();
  }

  public moveEntryDown(index: number) {
    if (index + 1 >= this.fragment.entries.length) {
      return;
    }
    const item = this.fragment.entries[index];
    this.fragment.entries.splice(index, 1);
    this.fragment.entries.splice(index + 1, 0, item);
    this.form.markAsDirty();
  }
}

import { Component, OnInit } from '@angular/core';
import {
  BibliographyPart,
  BibEntry,
  BIBLIOGRAPHY_PART_TYPEID
} from '../bibliography-part';
import { ModelEditorComponentBase, DialogService } from '@cadmus/ui';
import { Thesaurus } from '@cadmus/core';
import { AuthService } from '@cadmus/api';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

/**
 * Bibliography part editor.
 * Thesauri: languages, bibliography-typeIds (optional).
 */
@Component({
  selector: 'cadmus-bibliography-part',
  templateUrl: './bibliography-part.component.html',
  styleUrls: ['./bibliography-part.component.css']
})
export class BibliographyPartComponent
  extends ModelEditorComponentBase<BibliographyPart>
  implements OnInit {
  private _newEditedEntry: boolean;

  public part: BibliographyPart;
  public editedEntry: BibEntry;
  public currentTabIndex: number;

  public typeIdThesaurus: Thesaurus;
  public langThesaurus: Thesaurus;

  public entryCount: FormControl;

  constructor(
    authService: AuthService,
    formBuilder: FormBuilder,
    private _dialogService: DialogService
  ) {
    super(authService);
    // form
    this.entryCount = formBuilder.control(0, Validators.min(1));

    this.form = formBuilder.group({
      entryCount: this.entryCount
    });
  }

  ngOnInit(): void {
    this.initEditor();
  }

  protected onThesauriSet() {
    const langKey = 'languages';
    if (this.thesauri && this.thesauri[langKey]) {
      this.langThesaurus = this.thesauri[langKey];
    } else {
      this.langThesaurus = null;
    }

    const bibKey = 'bibliography-typeIds';
    if (this.thesauri && this.thesauri[bibKey]) {
      this.typeIdThesaurus = this.thesauri[bibKey];
    } else {
      this.typeIdThesaurus = null;
    }
  }

  private updateForm(model: BibliographyPart) {
    if (!model) {
      this.form.reset();
      return;
    }
    this.part = model;
    this.entryCount.setValue(model.entries?.length || 0);
    this.form.markAsPristine();
  }

  protected onModelSet(model: BibliographyPart) {
    this.updateForm(model);
  }

  protected getModelFromForm(): BibliographyPart {
    let part = this.getModelFromJson();
    if (!part) {
      part = {
        itemId: null,
        id: null,
        typeId: BIBLIOGRAPHY_PART_TYPEID,
        roleId: null,
        timeCreated: new Date(),
        creatorId: null,
        timeModified: new Date(),
        userId: null,
        entries: []
      };
    }
    part.entries = this.part.entries;
    return part;
  }

  public addEntry() {
    const entry: BibEntry = {
      typeId: this.typeIdThesaurus?.entries[0].id,
      title: null,
      language: this.langThesaurus?.entries[0].id
    };
    this.part.entries.push(entry);
    this.entryCount.setValue(this.part.entries.length);
    this._newEditedEntry = true;
    this.editEntry(entry);
  }

  public editEntry(entry: BibEntry) {
    this.editedEntry = entry;
    this.currentTabIndex = 1;
  }

  public onEntrySave(entry: BibEntry) {
    this._newEditedEntry = false;
    const i = this.part.entries.indexOf(this.editedEntry);
    this.part.entries.splice(i, 1, entry);
    this.currentTabIndex = 0;
    this.editedEntry = null;
    this.form.markAsDirty();
  }

  public onEntryClose(entry: BibEntry) {
    if (this._newEditedEntry) {
      const index = this.part.entries.indexOf(this.editedEntry);
      this.part.entries.splice(index, 1);
      this.entryCount.setValue(this.part.entries.length);
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
        this.part.entries.splice(index, 1);
        this.entryCount.setValue(this.part.entries.length);
        this.form.markAsDirty();
      });
  }

  public moveEntryUp(index: number) {
    if (index < 1) {
      return;
    }
    const entry = this.part.entries[index];
    this.part.entries.splice(index, 1);
    this.part.entries.splice(index - 1, 0, entry);
    this.form.markAsDirty();
  }

  public moveEntryDown(index: number) {
    if (index + 1 >= this.part.entries.length) {
      return;
    }
    const item = this.part.entries[index];
    this.part.entries.splice(index, 1);
    this.part.entries.splice(index + 1, 0, item);
    this.form.markAsDirty();
  }
}

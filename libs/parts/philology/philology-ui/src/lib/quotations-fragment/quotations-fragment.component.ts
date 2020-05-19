import { Component, OnInit } from '@angular/core';
import { QuotationsFragment, QuotationEntry } from '../quotations-fragment';
import { ModelEditorComponentBase, DialogService } from '@cadmus/ui';
import { AuthService } from '@cadmus/api';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Thesaurus, ThesaurusEntry } from '@cadmus/core';
import { QuotationWorksService } from './quotation-works.service';

/**
 * Quotations fragment editor.
 * Thesauri: quotation-works (optional), quotation-tags (optional).
 */
@Component({
  selector: 'cadmus-quotations-fragment',
  templateUrl: './quotations-fragment.component.html',
  styleUrls: ['./quotations-fragment.component.css'],
})
export class QuotationsFragmentComponent
  extends ModelEditorComponentBase<QuotationsFragment>
  implements OnInit {
  private _newEditedEntry: boolean;

  public fragment: QuotationsFragment;
  public editedEntry: QuotationEntry;
  public currentTabIndex: number;

  public worksThesaurus: Thesaurus;
  public tagsThesaurus: Thesaurus;
  public workDictionary: Record<string, ThesaurusEntry[]>;

  public entryCount: FormControl;

  constructor(
    authService: AuthService,
    formBuilder: FormBuilder,
    private _dialogService: DialogService,
    private _worksService: QuotationWorksService
  ) {
    super(authService);
    // form
    this.entryCount = formBuilder.control(0, Validators.min(1));

    this.form = formBuilder.group({
      entryCount: this.entryCount,
    });
  }

  ngOnInit() {
    this.initEditor();
  }

  protected onThesauriSet() {
    const wKey = 'quotation-works';
    if (this.thesauri && this.thesauri[wKey]) {
      this.worksThesaurus = this.thesauri[wKey];
      this.workDictionary = this._worksService.buildDictionary(
        this.worksThesaurus.entries
      );
    } else {
      this.worksThesaurus = null;
      this.workDictionary = null;
    }

    const tKey = 'quotation-tags';
    if (this.thesauri && this.thesauri[tKey]) {
      this.tagsThesaurus = this.thesauri[tKey];
    } else {
      this.tagsThesaurus = null;
    }
  }

  private updateForm(model: QuotationsFragment) {
    if (!model) {
      this.form.reset();
      return;
    }
    this.fragment = model;
    this.entryCount.setValue(model.entries?.length || 0);
    this.form.markAsPristine();
  }

  protected onModelSet(model: QuotationsFragment) {
    this.fragment = model;
    this.updateForm(model);
  }

  protected getModelFromForm(): QuotationsFragment {
    let fr = this.getModelFromJson();
    if (!fr) {
      fr = {
        location: this.fragment ? this.fragment.location : null,
        entries: [],
      };
    }
    fr.entries = this.fragment.entries;
    return fr;
  }

  public getNameFromId(id: string): string {
    return this.worksThesaurus.entries.find((e) => e.id === id)?.value || id;
  }

  public addEntry() {
    const entry: QuotationEntry = {
      author: null,
      work: null,
      citation: null,
    };
    this.fragment.entries.push(entry);
    this.entryCount.setValue(this.fragment.entries.length);
    this._newEditedEntry = true;
    this.editEntry(entry);
  }

  public editEntry(entry: QuotationEntry) {
    this.editedEntry = entry;
    this.currentTabIndex = 1;
  }

  public onEntrySave(entry: QuotationEntry) {
    this._newEditedEntry = false;
    const i = this.fragment.entries.indexOf(this.editedEntry);
    this.fragment.entries.splice(i, 1, entry);
    this.currentTabIndex = 0;
    this.editedEntry = null;
    this.form.markAsDirty();
  }

  public onEntryClose(entry: QuotationEntry) {
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
      .subscribe((result) => {
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

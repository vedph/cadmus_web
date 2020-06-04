import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BibEntry, BibAuthor } from '../bibliography-part';
import { Thesaurus } from '@cadmus/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  FormArray,
} from '@angular/forms';
import { Keyword } from '../keywords-part';
import { distinctUntilChanged } from 'rxjs/operators';
import { DialogService } from '@cadmus/ui';
import { BehaviorSubject } from 'rxjs';

/**
 * Bibliography entry editor used by BibliographyPartComponent to edit a single
 * entry in the bibliography part.
 */
@Component({
  selector: 'cadmus-bibliography-entry',
  templateUrl: './bibliography-entry.component.html',
  styleUrls: ['./bibliography-entry.component.css'],
})
export class BibliographyEntryComponent implements OnInit {
  private _entry: BibEntry;

  @Input()
  public get entry(): BibEntry {
    return this._entry;
  }
  public set entry(value: BibEntry) {
    if (this._entry === value) {
      return;
    }
    this._entry = value;
    this.updateForm(value);
  }

  @Input()
  public langThesaurus: Thesaurus | null;
  @Input()
  public typeThesaurus: Thesaurus | null;
  @Input()
  public roleThesaurus: Thesaurus | null;

  @Output()
  public editorClose: EventEmitter<any>;
  @Output()
  public entryChange: EventEmitter<BibEntry>;

  // form - general
  public type: FormControl;
  public language: FormControl;
  public authors: FormArray;
  public title: FormControl;
  public note: FormControl;
  // form - container
  public contributors: FormArray;
  public container: FormControl;
  public edition: FormControl;
  public number: FormControl;
  public placePub: FormControl;
  public yearPub: FormControl;
  public location: FormControl;
  public accessDate: FormControl;
  public firstPage: FormControl;
  public lastPage: FormControl;
  // form - keywords
  public keywords: Keyword[];
  public keyLanguage: FormControl;
  public keyValue: FormControl;
  public keyForm: FormGroup;

  public form: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _dialogService: DialogService
  ) {
    // events
    this.editorClose = new EventEmitter<any>();
    this.entryChange = new EventEmitter<BibEntry>();
    // form - general
    this.type = _formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(50),
    ]);
    this.language = _formBuilder.control(null, Validators.required);
    this.authors = _formBuilder.array([], Validators.required);
    this.title = _formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(300),
    ]);
    this.note = _formBuilder.control(null, Validators.maxLength(1000));
    // form - container
    this.contributors = _formBuilder.array([]);
    this.container = _formBuilder.control(null, Validators.maxLength(300));
    this.edition = _formBuilder.control(0, [
      Validators.min(0),
      Validators.max(100),
    ]);
    this.number = _formBuilder.control(null, Validators.maxLength(50));
    this.placePub = _formBuilder.control(null, Validators.maxLength(100));
    this.yearPub = _formBuilder.control(null, [
      Validators.min(0),
      Validators.max(new Date().getFullYear()),
    ]);
    this.location = _formBuilder.control(null, Validators.maxLength(500));
    this.accessDate = _formBuilder.control(new Date());
    this.firstPage = _formBuilder.control(0, [
      Validators.min(0),
      Validators.max(10000),
    ]);
    this.lastPage = _formBuilder.control(0, [
      Validators.min(0),
      Validators.max(10000),
    ]);
    // form - keywords
    this.keywords = [];
    this.keyLanguage = _formBuilder.control(null, [
      Validators.pattern(/^[a-z]{3}$/),
    ]);
    this.keyValue = _formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(100),
    ]);
    this.keyForm = _formBuilder.group({
      keyLanguage: this.keyLanguage,
      keyValue: this.keyValue,
    });

    this.form = _formBuilder.group({
      type: this.type,
      language: this.language,
      authors: this.authors,
      title: this.title,
      note: this.note,
      contributors: this.contributors,
      container: this.container,
      edition: this.edition,
      number: this.number,
      placePub: this.placePub,
      yearPub: this.yearPub,
      location: this.location,
      accessDate: this.accessDate,
      firstPage: this.firstPage,
      lastPage: this.lastPage,
    });
  }

  ngOnInit(): void {
    // automatically set last page when first is set to something > 0
    // and last is not set
    this.firstPage.valueChanges.pipe(distinctUntilChanged()).subscribe((_) => {
      if (
        this.firstPage.value > 0 &&
        this.lastPage.value < this.firstPage.value
      ) {
        this.lastPage.setValue(this.firstPage.value);
      }
    });
  }

  private getAuthorGroup(author?: BibAuthor): FormGroup {
    return this._formBuilder.group({
      lastName: this._formBuilder.control(author?.lastName, [
        Validators.required,
        Validators.maxLength(50),
      ]),
      firstName: this._formBuilder.control(
        author?.firstName,
        Validators.maxLength(50)
      ),
      roleId: this._formBuilder.control(
        author?.roleId,
        Validators.maxLength(50)
      ),
    });
  }

  private setAuthors(authors: BibAuthor[], ctl: FormArray) {
    if (!this.authors) {
      this.authors.reset();
      return;
    }
    if (authors) {
      for (let i = 0; i < authors.length; i++) {
        ctl.push(this.getAuthorGroup(authors[i]));
      }
    }
    this.authors.markAsPristine();
  }

  private updateForm(entry: BibEntry) {
    if (!entry) {
      this.form.reset();
      return;
    }

    this.type.setValue(entry.typeId);
    this.language.setValue(entry.language);
    this.setAuthors(entry.authors, this.authors);
    this.title.setValue(entry.title);
    this.note.setValue(entry.note);
    this.setAuthors(entry.contributors, this.contributors);
    this.container.setValue(entry.container);
    this.edition.setValue(entry.edition);
    this.number.setValue(entry.number);
    this.placePub.setValue(entry.placePub);
    this.yearPub.setValue(entry.yearPub);
    this.location.setValue(entry.location);
    this.accessDate.setValue(entry.accessDate);
    this.firstPage.setValue(entry.firstPage);
    this.lastPage.setValue(entry.lastPage);

    this.keywords = [];
    for (let i = 0; i < entry.keywords?.length || 0; i++) {
      this.keywords.push(entry.keywords[i]);
    }

    this.form.markAsPristine();
  }

  private getAuthors(ctl: FormArray): BibAuthor[] {
    const authors: BibAuthor[] = [];

    for (let i = 0; i < ctl.length; i++) {
      const g = ctl.at(i) as FormGroup;
      authors.push({
        lastName: g.controls['lastName'].value?.trim(),
        firstName: g.controls['firstName'].value?.trim(),
        roleId: g.controls['roleId'].value?.trim(),
      });
    }
    return authors.length ? authors : null;
  }

  private getEntry(): BibEntry {
    return {
      typeId: this.type.value?.trim(),
      language: this.language.value,
      authors: this.getAuthors(this.authors),
      title: this.title.value?.trim(),
      note: this.note.value?.trim(),
      contributors: this.getAuthors(this.contributors),
      container: this.container.value?.trim(),
      edition: this.edition.value,
      number: this.number.value?.trim(),
      placePub: this.placePub.value?.trim(),
      yearPub: this.yearPub.value,
      location: this.location.value?.trim(),
      accessDate: this.accessDate.value,
      firstPage: this.firstPage.value,
      lastPage: this.lastPage.value,
      keywords: this.keywords.length ? this.keywords : null,
    };
  }

  public addKeyword() {
    if (this.keyForm.invalid) {
      return;
    }
    if (
      !this.keywords.some(
        (k) =>
          k.language === this.keyLanguage.value &&
          k.value === this.keyValue.value
      )
    ) {
      this.keywords.push({
        language: this.keyLanguage.value,
        value: this.keyValue.value,
      });
      this.form.markAsDirty();
    }
  }

  public deleteKeyword(index: number) {
    this.keywords.splice(index, 1);
    this.form.markAsDirty();
  }

  public moveKeywordUp(index: number) {
    if (index < 1) {
      return;
    }
    const k = this.keywords[index];
    this.keywords.splice(index, 1);
    this.keywords.splice(index - 1, 0, k);
    this.form.markAsDirty();
  }

  public moveKeywordDown(index: number) {
    if (index + 1 >= this.keywords.length) {
      return;
    }
    const k = this.keywords[index];
    this.keywords.splice(index, 1);
    this.keywords.splice(index + 1, 0, k);
    this.form.markAsDirty();
  }

  public cancel() {
    if (this.form.pristine) {
      this.editorClose.emit();
      return;
    }

    this._dialogService
      .confirm('Confirm Close', 'Drop entry changes?')
      .subscribe((result) => {
        if (result) {
          this.editorClose.emit();
        }
      });
  }

  public save() {
    if (this.form.invalid) {
      return;
    }
    const entry = this.getEntry();
    this.entryChange.emit(entry);
  }
}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BibEntry, BibAuthor } from '../bibliography-part';
import { Thesaurus } from '@cadmus/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from '@angular/forms';
import { Keyword } from '../keywords-part';
import { distinctUntilChanged } from 'rxjs/operators';

/**
 * Bibliography entry editor used by BibliographyPartComponent to edit a single
 * entry in the bibliography part.
 */
@Component({
  selector: 'cadmus-bibliography-entry',
  templateUrl: './bibliography-entry.component.html',
  styleUrls: ['./bibliography-entry.component.css']
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
  public authors: BibAuthor[];
  public authorCount: FormControl;
  public title: FormControl;
  public note: FormControl;
  // form - container
  public contributors: BibAuthor[];
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

  constructor(formBuilder: FormBuilder) {
    // events
    this.editorClose = new EventEmitter<any>();
    this.entryChange = new EventEmitter<BibEntry>();
    // form - general
    this.type = formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(50)
    ]);
    this.language = formBuilder.control(null, Validators.required);
    this.authors = [];
    this.authorCount = formBuilder.control(0, Validators.min(1));
    this.title = formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(300)
    ]);
    this.note = formBuilder.control(null, Validators.maxLength(1000));
    // form - container
    this.contributors = [];
    this.edition = formBuilder.control(0, [
      Validators.min(0),
      Validators.max(100)
    ]);
    this.number = formBuilder.control(null, Validators.maxLength(50));
    this.placePub = formBuilder.control(null, Validators.maxLength(100));
    this.yearPub = formBuilder.control(null, [
      Validators.min(0),
      Validators.max(new Date().getFullYear())
    ]);
    this.location = formBuilder.control(null, Validators.maxLength(500));
    this.accessDate = formBuilder.control(new Date());
    this.firstPage = formBuilder.control(0, [
      Validators.min(0),
      Validators.max(10000)
    ]);
    this.lastPage = formBuilder.control(0, [
      Validators.min(0),
      Validators.max(10000)
    ]);
    // form - keywords
    this.keywords = [];
    this.keyLanguage = formBuilder.control(null, [
      Validators.pattern(/^[a-z]{3}$/)
    ]);
    this.keyValue = formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(100)
    ]);
    this.keyForm = formBuilder.group({
      keyLanguage: this.keyLanguage,
      keyValue: this.keyValue
    });

    this.form = formBuilder.group({
      type: this.type,
      language: this.language,
      authorCount: this.authorCount,
      title: this.title,
      note: this.note,
      edition: this.edition,
      number: this.number,
      placePub: this.placePub,
      yearPub: this.yearPub,
      location: this.location,
      accessDate: this.accessDate,
      firstPage: this.firstPage,
      lastPage: this.lastPage
    });
  }

  ngOnInit(): void {
    // automatically set last page when first is set to something > 0
    // and last is not set
    this.firstPage.valueChanges.pipe(distinctUntilChanged()).subscribe(_ => {
      if (!this.lastPage.value && this.firstPage.value > 0) {
        this.lastPage.setValue(this.firstPage.value);
      }
    });
  }

  private updateForm(entry: BibEntry) {
    if (!entry) {
      this.form.reset();
      return;
    }

    this.type.setValue(entry.typeId);
    this.language.setValue(entry.language);
    this.authors = [];
    for (let i = 0; i < entry.authors?.length || 0; i++) {
      this.authors.push(entry.authors[i]);
    }
    this.authorCount.setValue(this.authors.length);
    this.title.setValue(entry.title);
    this.note.setValue(entry.note);

    this.contributors = [];
    for (let i = 0; i < entry.contributors?.length || 0; i++) {
      this.contributors.push(entry.contributors[i]);
    }
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

  private getEntry(): BibEntry {
    return {
      typeId: this.type.value?.trim(),
      language: this.language.value,
      authors: this.authors,
      title: this.title.value?.trim(),
      note: this.note.value?.trim(),
      contributors: this.contributors.length ? this.contributors : null,
      edition: this.edition.value,
      number: this.number.value?.trim(),
      placePub: this.placePub.value?.trim(),
      yearPub: this.yearPub.value,
      location: this.location.value?.trim(),
      accessDate: this.accessDate.value,
      firstPage: this.firstPage.value,
      lastPage: this.lastPage.value,
      keywords: this.keywords.length ? this.keywords : null
    };
  }

  public onAuthorsChange(authors: BibAuthor[]) {
    this.authorCount.setValue(authors?.length || 0);
  }

  public addKeyword() {
    if (this.keyForm.invalid) {
      return;
    }
    if (
      !this.keywords.some(
        k =>
          k.language === this.keyLanguage.value &&
          k.value === this.keyValue.value
      )
    ) {
      this.keywords.push({
        language: this.keyLanguage.value,
        value: this.keyValue.value
      });
    }
  }

  public deleteKeyword(index: number) {
    this.keywords.splice(index, 1);
  }

  public moveKeywordUp(index: number) {
    if (index < 1) {
      return;
    }
    const k = this.keywords[index];
    this.keywords.splice(index, 1);
    this.keywords.splice(index - 1, 0, k);
  }

  public moveKeywordDown(index: number) {
    if (index + 1 >= this.keywords.length) {
      return;
    }
    const k = this.keywords[index];
    this.keywords.splice(index, 1);
    this.keywords.splice(index + 1, 0, k);
  }

  public cancel() {
    this.editorClose.emit();
  }

  public save() {
    if (this.form.invalid) {
      return;
    }
    const entry = this.getEntry();
    this.entryChange.emit(entry);
  }
}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ThesaurusEntry } from '@cadmus/core';
import { QuotationEntry } from '../quotations-fragment';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { DialogService } from '@cadmus/ui';
import { BehaviorSubject } from 'rxjs';
import { QuotationWorksService } from '../quotations-fragment/quotation-works.service';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'cadmus-quotation-entry',
  templateUrl: './quotation-entry.component.html',
  styleUrls: ['./quotation-entry.component.css'],
})
export class QuotationEntryComponent implements OnInit {
  private _entry: QuotationEntry;
  private _workDct: Record<string, ThesaurusEntry[]>;

  // list of authors, collected from _workDct
  public authors$: BehaviorSubject<ThesaurusEntry[]>;
  // list of selected author's works
  public authorWorks$: BehaviorSubject<ThesaurusEntry[]>;

  @Input()
  public get entry(): QuotationEntry {
    return this._entry;
  }
  public set entry(value: QuotationEntry) {
    this._entry = value;
    this.updateForm(value);
  }

  @Input()
  public get workDictionary(): Record<string, ThesaurusEntry[]> {
    return this._workDct;
  }
  public set workDictionary(value: Record<string, ThesaurusEntry[]>) {
    this._workDct = value;
    this.authors$.next(this._worksService.collectAuthors(value));
    setTimeout(() => {
      this.loadAuthorWorks(this.author.value);
    }, 700);
  }

  @Input()
  public tagEntries: ThesaurusEntry[] | null;

  @Output()
  public editorClose: EventEmitter<any>;
  @Output()
  public entryChange: EventEmitter<QuotationEntry>;

  public author: FormControl;
  public work: FormControl;
  public citation: FormControl;
  public citationUri: FormControl;
  public variant: FormControl;
  public tag: FormControl;
  public note: FormControl;
  public form: FormGroup;

  constructor(
    formBuilder: FormBuilder,
    private _dialogService: DialogService,
    private _worksService: QuotationWorksService
  ) {
    // events
    this.editorClose = new EventEmitter<any>();
    this.entryChange = new EventEmitter<QuotationEntry>();

    this.authors$ = new BehaviorSubject<ThesaurusEntry[]>([]);
    this.authorWorks$ = new BehaviorSubject<ThesaurusEntry[]>([]);

    // form
    this.author = formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(50),
    ]);
    this.work = formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(100),
    ]);
    this.citation = formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(50),
    ]);
    this.citationUri = formBuilder.control(null, Validators.maxLength(200));
    this.variant = formBuilder.control(null, Validators.maxLength(1000));
    this.tag = formBuilder.control(null, Validators.maxLength(50));
    this.note = formBuilder.control(null, Validators.maxLength(1000));
    this.form = formBuilder.group({
      author: this.author,
      work: this.work,
      citation: this.citation,
      citationUri: this.citationUri,
      variant: this.variant,
      tag: this.tag,
      note: this.note,
    });
    // when author changes and we're using thesauri, get its works
    this.author.valueChanges.subscribe((id) => {
      if (this._workDct && id) {
        this.loadAuthorWorks(id);
      }
    });
  }

  ngOnInit(): void {
  }

  private loadAuthorWorks(authorId: string) {
    // const oldWorkId = this.work.value;
    const works: ThesaurusEntry[] = [];
    // in each dictionary the key is the author ID and the value is
    // an array where the 1st entry is the author, and all the others
    // his works. So here we skip the 1st entry.
    if (this._workDct[authorId]?.length > 1) {
      for (let i = 1; i < this._workDct[authorId].length; i++) {
        works.push(this._workDct[authorId][i]);
      }
    }
    this.authorWorks$.next(works);
    // this.work.setValue(oldWorkId);
  }

  private updateForm(entry: QuotationEntry) {
    if (!entry) {
      this.form.reset();
      return;
    }

    this.work.setValue(entry.work);
    this.author.setValue(entry.author);
    this.citation.setValue(entry.citation);
    this.citationUri.setValue(entry.citationUri);
    this.variant.setValue(entry.variant);
    this.tag.setValue(entry.tag);
    this.note.setValue(entry.note);

    this.form.markAsPristine();
  }

  private getEntry(): QuotationEntry {
    return {
      author: this.author.value?.trim(),
      work: this.work.value?.trim(),
      citation: this.citation.value?.trim(),
      citationUri: this.citationUri.value?.trim(),
      variant: this.variant.value?.trim(),
      tag: this.tag.value?.trim(),
      note: this.note.value?.trim(),
    };
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

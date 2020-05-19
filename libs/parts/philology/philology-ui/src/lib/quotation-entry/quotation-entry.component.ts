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
import { Observable } from 'rxjs';
import { QuotationWorksService } from '../quotations-fragment/quotation-works.service';
import { distinctUntilChanged, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'cadmus-quotation-entry',
  templateUrl: './quotation-entry.component.html',
  styleUrls: ['./quotation-entry.component.css'],
})
export class QuotationEntryComponent implements OnInit {
  private _entry: QuotationEntry;
  private _workDct: Record<string, ThesaurusEntry[]>;

  // list of authors, collected from _workDct
  public authors: ThesaurusEntry[];
  // list of selected author's works
  public authorWorks: ThesaurusEntry[];

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
    this.work.reset();
    this.author.reset();
    this.authors = this._worksService.collectAuthors(value);
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
  }

  ngOnInit(): void {
    // when author changes and we're using thesauri, get its works
    this.author.valueChanges
      .pipe(distinctUntilChanged(), debounceTime(300))
      .subscribe((id) => {
        if (this.authors) {
          // in each dictionary the key is the author ID and the value is
          // an array where the 1st entry is the author, and all the others
          // his works. So here we skip the 1st entry.
          const works: ThesaurusEntry[] = [];
          if (this._workDct[id]?.length > 1) {
            for (let i = 1; i < this._workDct[id].length; i++) {
              works.push(this._workDct[id][i]);
            }
          }
          this.authorWorks = works;
        }
      });
  }

  private updateForm(entry: QuotationEntry) {
    if (!entry) {
      this.form.reset();
      return;
    }

    this.author.setValue(entry.author);
    this.work.setValue(entry.work);
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

import { Component, OnInit } from '@angular/core';
import { Thesaurus, User, ThesaurusEntry } from '@cadmus/core';
import { Observable } from 'rxjs';
import {
  FormControl,
  FormArray,
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {
  EditThesaurusService,
  EditThesaurusQuery
} from '@cadmus/features/edit-state';
import { AuthService } from '@cadmus/api';
import { DialogService } from '@cadmus/ui';

@Component({
  selector: 'cadmus-thesaurus-editor',
  templateUrl: './thesaurus-editor.component.html',
  styleUrls: ['./thesaurus-editor.component.css']
})
export class ThesaurusEditorComponent implements OnInit {
  public id: string;
  public user: User;
  public userLevel: number;
  public loading$: Observable<boolean>;
  public saving$: Observable<boolean>;
  public error$: Observable<string>;

  public editId: FormControl;
  public entries: FormArray;
  public form: FormGroup;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _query: EditThesaurusQuery,
    private _editService: EditThesaurusService,
    private _authService: AuthService,
    private _dialogService: DialogService,
    private _formBuilder: FormBuilder
  ) {
    this.id = this._route.snapshot.params['id'];
    if (this.id === 'new') {
      this.id = null;
    }
    this.userLevel = 0;

    this.editId = _formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(100),
      Validators.pattern(/^[a-zA-Z0-9_\-\.]+\@[a-z]{2,3}$/g)
    ]);
    this.entries = _formBuilder.array([]);
    this.form = _formBuilder.group({
      editId: this.editId,
      entries: this.entries
    });
  }

  ngOnInit(): void {
    this._authService.currentUser$.subscribe((user: User) => {
      this.user = user;
      this.userLevel = this._authService.getCurrentUserLevel();
    });

    // update form whenever we get new data
    this._query.selectThesaurus().subscribe(thesaurus => {
      this.updateForm(thesaurus);
    });
    this.loading$ = this._query.selectLoading();
    this.saving$ = this._query.selectSaving();
    this.error$ = this._query.selectError();

    this._editService.load(this.id);
  }

  private getEntryGroup(entry?: ThesaurusEntry): FormGroup {
    return this._formBuilder.group({
      id: this._formBuilder.control(entry ? entry.id : null, [
        Validators.required,
        Validators.maxLength(100),
        Validators.pattern(/^[a-zA-Z0-9_\-\.]+$/g)
      ]),
      value: this._formBuilder.control(entry ? entry.value : null, [
        Validators.required,
        Validators.maxLength(200)
      ])
    });
  }

  public addEntry(item?: ThesaurusEntry) {
    this.entries.push(this.getEntryGroup(item));
  }

  public addEntryBelow(index: number) {
    this.entries.insert(index + 1, this.getEntryGroup());
  }

  public removeEntry(index: number) {
    this.entries.removeAt(index);
  }

  public moveEntryUp(index: number) {
    if (index < 1) {
      return;
    }
    const item = this.entries.controls[index];
    this.entries.removeAt(index);
    this.entries.insert(index - 1, item);
  }

  public moveEntryDown(index: number) {
    if (index + 1 >= this.entries.length) {
      return;
    }
    const item = this.entries.controls[index];
    this.entries.removeAt(index);
    this.entries.insert(index + 1, item);
  }

  public clearEntries() {
    this.entries.clear();
  }

  private updateForm(thesaurus: Thesaurus) {
    if (!thesaurus) {
      this.form.reset();
    } else {
      this.editId.setValue(thesaurus.id);
      // entries
      this.entries.clear();
      for (let i = 0; i < thesaurus.entries.length; i++) {
        this.entries.push(this.getEntryGroup(thesaurus.entries[i]));
      }
      this.form.markAsPristine();
    }
  }

  private getLanguage(id: string): string {
    const r = new RegExp('@([a-z]{2,3})$', 'g');
    const m = r.exec(id);
    if (!m) {
      return '';
    } else {
      return m[1];
    }
  }

  private getThesaurus(): Thesaurus {
    const thesaurus: Thesaurus = {
      id: this.editId.value,
      language: this.getLanguage(this.editId.value),
      entries: []
    };

    // collect entries
    for (let i = 0; i < this.entries.controls.length; i++) {
      const g = this.entries.at(i) as FormGroup;
      thesaurus.entries.push({
        id: g.controls['id'].value,
        value: g.controls['value'].value
      });
    }

    return thesaurus;
  }

  public cancel() {
    if (this.form.pristine) {
      this._router.navigate(['/thesauri']);
      return;
    }

    this._dialogService
      .confirm('Discard Changes', `Discard any changes?`)
      .subscribe(result => {
        if (!result) {
          return;
        }
        this._router.navigate(['/thesauri']);
      });
  }

  public save() {
    if (this.form.invalid || this.userLevel < 3) {
      return;
    }
    const thesaurus = this.getThesaurus();
    this._editService.save(thesaurus);
  }
}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Thesaurus } from '@cadmus/core';
import { BibAuthor } from '../bibliography-part';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'cadmus-bib-authors-editor',
  templateUrl: './bib-authors-editor.component.html',
  styleUrls: ['./bib-authors-editor.component.css']
})
export class BibAuthorsEditorComponent implements OnInit {
  private _authors: BibAuthor[];

  @Input()
  public roleThesaurus: Thesaurus;
  @Input()
  public get authors(): BibAuthor[] {
    return this._authors;
  }
  public set authors(value: BibAuthor[]) {
    this._authors = value;
    this.updateForm(value);
  }

  @Output()
  public authorsChange: EventEmitter<BibAuthor[]>;

  public authorsCtl: FormArray;
  public form: FormGroup;

  constructor(private _formBuilder: FormBuilder) {
    this.authorsChange = new EventEmitter<BibAuthor[]>();
    // form
    this.authorsCtl = _formBuilder.array([]);
    this.form = _formBuilder.group({
      authorsCtl: this.authorsCtl
    });
  }

  ngOnInit(): void {}

  private updateForm(authors: BibAuthor[]) {
    this.authorsCtl.clear();
    if (authors) {
      for (let i = 0; i < authors.length; i++) {
        this.authorsCtl.push(this.getAuthorGroup(authors[i]));
      }
    }
    this.form.markAsPristine();
  }

  private getAuthors(): BibAuthor[] {
    const authors: BibAuthor[] = [];
    for (let i = 0; i < this.authorsCtl.length; i++) {
      const g = this.authorsCtl.at(i) as FormGroup;
      authors.push({
        lastName: g.controls['lastName'].value?.trim(),
        firstName: g.controls['firstName'].value?.trim(),
        roleId: g.controls['roleId'].value?.trim()
      });
    }
    return authors;
  }

  private emitChange() {
    if (this.form.invalid) {
      return;
    }
    const authors = this.getAuthors();
    this.authorsChange.emit(authors);
  }

  private getAuthorGroup(author?: BibAuthor): FormGroup {
    return this._formBuilder.group({
      lastName: this._formBuilder.control(author?.lastName, [
        Validators.required,
        Validators.maxLength(50)
      ]),
      firstName: this._formBuilder.control(
        author?.firstName,
        Validators.maxLength(50)
      ),
      roleId: this._formBuilder.control(
        author?.roleId,
        Validators.maxLength(50)
      )
    });
  }

  public addAuthor(item?: BibAuthor) {
    this.authorsCtl.push(this.getAuthorGroup(item));
    this.emitChange();
  }

  public addAuthorBelow(index: number) {
    this.authorsCtl.insert(index + 1, this.getAuthorGroup());
    this.emitChange();
  }

  public removeAuthor(index: number) {
    this.authorsCtl.removeAt(index);
    this.emitChange();
  }

  public moveAuthorUp(index: number) {
    if (index < 1) {
      return;
    }
    const item = this.authorsCtl.controls[index];
    this.authorsCtl.removeAt(index);
    this.authorsCtl.insert(index - 1, item);
    this.emitChange();
  }

  public moveAuthorDown(index: number) {
    if (index + 1 >= this.authorsCtl.length) {
      return;
    }
    const item = this.authorsCtl.controls[index];
    this.authorsCtl.removeAt(index);
    this.authorsCtl.insert(index + 1, item);
    this.emitChange();
  }

  public clearAuthors() {
    for (let i = this.authorsCtl.length - 1; i > -1; i--) {
      this.authorsCtl.removeAt(i);
    }
    this.emitChange();
  }
}

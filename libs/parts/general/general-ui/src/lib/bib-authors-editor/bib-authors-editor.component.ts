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
  @Input()
  public parentForm: FormGroup;
  @Input()
  public controlName: string;
  @Input()
  public roleThesaurus: Thesaurus;

  public authors: FormArray;

  constructor(private _formBuilder: FormBuilder) {
    // defaults
    this.controlName = 'authors';
  }

  ngOnInit(): void {
    this.authors = this.parentForm?.controls[this.controlName] as FormArray;
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
    this.authors.push(this.getAuthorGroup(item));
  }

  public addAuthorBelow(index: number) {
    this.authors.insert(index + 1, this.getAuthorGroup());
  }

  public removeAuthor(index: number) {
    this.authors.removeAt(index);
  }

  public moveAuthorUp(index: number) {
    if (index < 1) {
      return;
    }
    const item = this.authors.controls[index];
    this.authors.removeAt(index);
    this.authors.insert(index - 1, item);
  }

  public moveAuthorDown(index: number) {
    if (index + 1 >= this.authors.length) {
      return;
    }
    const item = this.authors.controls[index];
    this.authors.removeAt(index);
    this.authors.insert(index + 1, item);
  }

  public clearAuthors() {
    for (let i = this.authors.length - 1; i > -1; i--) {
      this.authors.removeAt(i);
    }
  }
}

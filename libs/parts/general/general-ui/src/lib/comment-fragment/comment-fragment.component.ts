import { Component, OnInit } from '@angular/core';
import { CommentFragment } from '../comment-fragment';
import { ModelEditorComponentBase } from '@cadmus/ui';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ThesaurusEntry } from '@cadmus/core';
import { AuthService } from '@cadmus/api';

/**
 * Comment fragment editor component.
 * Thesauri: "comment-tags" when you want to use a closed set of tags.
 */
@Component({
  selector: 'cadmus-comment-fragment',
  templateUrl: './comment-fragment.component.html',
  styleUrls: ['./comment-fragment.component.css']
})
export class CommentFragmentComponent
  extends ModelEditorComponentBase<CommentFragment>
  implements OnInit {
  public fragment: CommentFragment;

  public tag: FormControl;
  public tags: FormControl;
  public text: FormControl;

  public tagEntries: ThesaurusEntry[];

  public editorOptions = {
    theme: 'vs-light',
    language: 'markdown',
    wordWrap: 'on',
    // https://github.com/atularen/ngx-monaco-editor/issues/19
    automaticLayout: true
  };

  constructor(authService: AuthService, formBuilder: FormBuilder) {
    super(authService);
    // form
    this.tag = formBuilder.control(null, Validators.maxLength(100));
    this.tags = formBuilder.control([]);
    this.text = formBuilder.control(null, Validators.required);
    this.form = formBuilder.group({
      tag: this.tag,
      tags: this.tags,
      text: this.text
    });
  }

  ngOnInit() {
    this.initEditor();
  }

  private updateForm(model: CommentFragment) {
    if (!model) {
      this.form.reset();
      return;
    }
    this.tag.setValue(model.tag);
    this.tags.setValue(model.tag);
    this.text.setValue(model.text);
    this.form.markAsPristine();
  }

  protected onModelSet(model: CommentFragment) {
    this.fragment = model;
    this.updateForm(model);
  }

  protected onThesauriSet() {
    const key = 'comment-tags';
    if (this.thesauri && this.thesauri[key]) {
      this.tagEntries = this.thesauri[key].entries;
    } else {
      this.tagEntries = null;
    }
  }

  protected getModelFromForm(): CommentFragment {
    let fr = this.getModelFromJson();
    if (!fr) {
      fr = {
        location: this.fragment ? this.fragment.location : null,
        tag: null,
        text: null
      };
    }
    fr.tag = this.trimIfAny(this.tag.value, true);
    fr.text = this.trimIfAny(this.text.value);
    return fr;
  }
}

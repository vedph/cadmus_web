import { Component, OnInit } from '@angular/core';
import { CommentFragment } from '../comment-fragment';
import { ModelEditorComponentBase, DialogService } from '@cadmus/ui';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ThesaurusEntry } from '@cadmus/core';

/**
 * Comment fragment editor component.
 * Thesauri: optionally provide entries under a "comment-tags" thesaurus
 * when you want to use a closed set of tags.
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

  constructor(formBuilder: FormBuilder, dialogService: DialogService) {
    super(dialogService);
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

  ngOnInit() {}

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
        tag: this.tagEntries ? this.tags.value : this.tag.value,
        text: this.text.value
      };
    }
    fr.tag = this.tag.value? this.tag.value.trim() : null;
    fr.text = this.text.value? this.text.value.trim() : null;
    return fr;
  }
}

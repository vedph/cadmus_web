import { Component, OnInit } from '@angular/core';
import { ModelEditorComponentBase } from '@cadmus/ui';
import { NotePart, NOTE_PART_TYPEID } from '../..';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { ThesaurusEntry } from '@cadmus/core';
import { AuthService } from '@cadmus/api';

/**
 * Note part editor component.
 * Thesauri: optionally "note-tags", when you want to use a closed set of tags.
 */
@Component({
  selector: 'cadmus-note-part',
  templateUrl: './note-part.component.html',
  styleUrls: ['./note-part.component.css']
})
export class NotePartComponent extends ModelEditorComponentBase<NotePart>
  implements OnInit {
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

  private updateForm(model: NotePart) {
    if (!model) {
      this.form.reset();
      return;
    }
    this.tag.setValue(model.tag);
    this.tags.setValue(model.tag);
    this.text.setValue(model.text);
    this.form.markAsPristine();
  }

  protected onModelSet(model: NotePart): void {
    this.updateForm(model);
  }

  protected onThesauriSet() {
    const key = 'note-tags';
    if (this.thesauri && this.thesauri[key]) {
      this.tagEntries = this.thesauri[key].entries;
    } else {
      this.tagEntries = null;
    }
  }

  protected getModelFromForm(): NotePart {
    let part = this.getModelFromJson();
    if (!part) {
      part = {
        itemId: null,
        id: null,
        typeId: NOTE_PART_TYPEID,
        roleId: null,
        timeCreated: new Date(),
        creatorId: null,
        timeModified: new Date(),
        userId: null,
        tag: null,
        text: null
      };
    }
    part.tag = this.tagEntries ? this.tags.value : this.tag.value;
    part.text = this.text.value? this.text.value.trim() : null;
    return part;
  }
}

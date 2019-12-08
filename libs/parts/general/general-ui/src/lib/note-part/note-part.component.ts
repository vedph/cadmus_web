import { Component, OnInit } from '@angular/core';
import { DialogService, ModelEditorComponentBase } from '@cadmus/ui';
import { NotePart, NOTE_PART_TYPEID } from '../..';
import {
  FormControl,
  FormBuilder,
  Validators
} from '@angular/forms';
import { ThesaurusEntry } from '@cadmus/core';
import { take } from 'rxjs/operators';

/**
 * Note part editor component.
 * Thesauri: optionally provide entries under a "note-tags" thesaurus
 * when you want to use a closed set of tags.
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

  constructor(formBuilder: FormBuilder, private _dialog: DialogService) {
    super();
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

  protected onModelSet(model: NotePart) {
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

  private getModelFromForm(): NotePart {
    let part = this.getModelFromJson();
    if (!part) {
      part = {
        itemId: null,
        id: null,
        typeId: NOTE_PART_TYPEID,
        roleId: null,
        tag: this.tagEntries ? this.tags.value : this.tag.value,
        text: this.text.value,
        timeModified: new Date(),
        userId: null
      };
    }
    return part;
  }

  public close() {
    if (!this.form.dirty) {
      this.editorClose.emit();
      return;
    }
    this._dialog
      .confirm('Warning', 'Discard changes?')
      .pipe(take(1))
      .subscribe((ok: boolean) => {
        if (ok) {
          this.editorClose.emit();
        }
      });
  }

  public save() {
    if (this.form.invalid) {
      return;
    }
    const part = this.getModelFromForm();
    this.updateJson(JSON.stringify(part));
    this.form.markAsPristine();
  }
}

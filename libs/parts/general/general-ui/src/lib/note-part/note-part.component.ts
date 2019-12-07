import { Component, OnInit, Input } from '@angular/core';
import { DialogService, PartEditorBaseComponent } from '@cadmus/ui';
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
 * Thesauri: optionally provide entries under a "tags" thesaurus
 * when you want to use a closed set of tags.
 */
@Component({
  selector: 'cadmus-note-part',
  templateUrl: './note-part.component.html',
  styleUrls: ['./note-part.component.css']
})
export class NotePartComponent extends PartEditorBaseComponent<NotePart>
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

  private updateForm(part: NotePart) {
    if (!part) {
      this.form.reset();
      return;
    }
    this.tag.setValue(part.tag);
    this.tags.setValue(part.tag);
    this.text.setValue(part.text);
    this.form.markAsPristine();
  }

  protected onPartSet(part: NotePart) {
    this.updateForm(part);
  }

  protected onThesauriSet() {
    const key = 'tags';
    if (this.thesauri && this.thesauri[key]) {
      this.tagEntries = this.thesauri[key].entries;
    } else {
      this.tagEntries = null;
    }
  }

  private getPartFromForm(): NotePart {
    let part = this.getPartFromJson();
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
    const part = this.getPartFromForm();
    this.updateJson(JSON.stringify(part));
    this.form.markAsPristine();
  }
}

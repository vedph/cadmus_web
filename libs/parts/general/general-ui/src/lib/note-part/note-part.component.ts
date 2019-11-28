import { Component, OnInit } from '@angular/core';
import { DialogService, PartEditorBaseComponent } from '@cadmus/ui';
import { NotePart } from '../..';
import {
  FormGroup,
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
  public form: FormGroup;
  public tag: FormControl;
  public tags: FormControl;
  public text: FormControl;

  public thesEntries: ThesaurusEntry[];

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

  ngOnInit() {
    super.subscribeToFormStatus(this.form);
  }

  private updateForm(part: NotePart) {
    if (!part) {
      this.form.reset();
      return;
    }
    this.tag.setValue(part.tag);
    this.text.setValue(part.text);
    this.form.markAsPristine();
  }

  protected onPartSet(part: NotePart) {
    this.updateForm(part);
  }

  protected onThesauriSet() {
    const key = 'tags';
    if (super.thesauri && super.thesauri[key]) {
      this.thesEntries = super.thesauri[key].entries;
    } else {
      this.thesEntries = null;
    }
  }

  private getPart(): NotePart {
    let part = super.getPartFromJson();
    if (!part) {
      part = {
        itemId: null,
        id: null,
        typeId: 'net.fusisoft.note',
        roleId: null,
        tag: this.tag.value,
        text: this.text.value,
        timeModified: new Date(),
        userId: null
      };
    }
    return part;
  }

  public cancel() {
    if (!this.form.dirty) {
      super.editorClose.emit();
      return;
    }
    this._dialog
      .confirm('Warning', 'Discard changes?')
      .pipe(take(1))
      .subscribe((ok: boolean) => {
        if (ok) {
          super.editorClose.emit();
        }
      });
  }

  public save() {
    if (this.form.invalid) {
      return;
    }
    const part = this.getPart();
    super.updateJson(JSON.stringify(part));
    this.form.markAsPristine();
  }
}

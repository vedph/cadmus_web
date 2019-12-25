import { Component, OnInit } from '@angular/core';
import { KeywordsPart, Keyword, KEYWORDS_PART_TYPEID } from '../keywords-part';
import { ModelEditorComponentBase } from '@cadmus/ui';
import {
  FormBuilder,
  FormControl,
  Validators,
  FormGroup
} from '@angular/forms';
import { ThesaurusEntry } from '@cadmus/core';

/**
 * Keywords editor component.
 * Thesauri: languages.
 */
@Component({
  selector: 'cadmus-keywords-part',
  templateUrl: './keywords-part.component.html',
  styleUrls: ['./keywords-part.component.css']
})
export class KeywordsPartComponent
  extends ModelEditorComponentBase<KeywordsPart>
  implements OnInit {
  public keywords: FormControl;
  // new keyword form
  public newLanguage: FormControl;
  public newValue: FormControl;
  public newForm: FormGroup;
  // thesaurus
  public langEntries: ThesaurusEntry[];

  constructor(formBuilder: FormBuilder) {
    super();
    // form
    this.keywords = formBuilder.control([], Validators.required);
    this.form = formBuilder.group({
      keywords: this.keywords
    });
    // new keyword form
    this.newLanguage = formBuilder.control('eng', Validators.required);
    this.newValue = formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(100)
    ]);
    this.newForm = formBuilder.group({
      newLanguage: this.newLanguage,
      newValue: this.newValue
    });
  }

  ngOnInit() {
    this.initEditor();
  }

  protected onThesauriSet() {
    const key = 'languages';
    if (this.thesauri && this.thesauri[key]) {
      this.langEntries = this.thesauri[key].entries;
    } else {
      this.langEntries = null;
    }
  }

  private compareKeywords(a: Keyword, b: Keyword): number {
    if (!a) {
      if (!b) {
        return 0;
      } else {
        return -1;
      }
    }
    if (!b) {
      return 1;
    }
    const n = a.language.localeCompare(b.language);
    if (n !== 0) {
      return n;
    }
    return a.value.localeCompare(b.value);
  }

  private updateForm(model: KeywordsPart) {
    if (!model) {
      this.form.reset();
      return;
    }

    const ck = Object.assign([], model.keywords);
    ck.sort(this.compareKeywords);
    this.keywords.setValue(ck);
    this.form.markAsPristine();
  }

  protected onModelSet(model: KeywordsPart) {
    this.updateForm(model);
  }

  protected getModelFromForm(): KeywordsPart {
    let part = this.getModelFromJson();
    if (!part) {
      part = {
        itemId: null,
        id: null,
        typeId: KEYWORDS_PART_TYPEID,
        roleId: null,
        timeCreated: new Date(),
        creatorId: null,
        timeModified: new Date(),
        userId: null,
        keywords: []
      };
    }
    part.keywords = [...this.keywords.value];
    return part;
  }

  public addKeyword() {
    if (this.newForm.invalid) {
      return;
    }
    const keyword: Keyword = {
      language: this.newLanguage.value,
      value: this.newValue.value
    };
    let i = 0;
    while (i < this.keywords.value.length) {
      const n = this.compareKeywords(keyword, this.keywords.value[i]);
      if (n === 0) {
        return;
      }
      if (n <= 0) {
        const ck = Object.assign([], this.keywords.value);
        ck.splice(i, 0, keyword);
        this.keywords.setValue(ck);
        this.keywords.markAsDirty();
        break;
      }
      i++;
    }
    if (i === this.keywords.value.length) {
      const ck = Object.assign([], this.keywords.value);
      ck.push(keyword);
      this.keywords.setValue(ck);
      this.keywords.markAsDirty();
    }
  }

  public deleteKeyword(keyword: Keyword) {
    const ck = Object.assign([], this.keywords.value);
    ck.splice(this.keywords.value.indexOf(keyword), 1);
    this.keywords.setValue(ck);
    this.keywords.markAsDirty();
  }
}

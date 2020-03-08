import { Component, OnInit } from '@angular/core';
import { ModelEditorComponentBase } from '@cadmus/ui';
import { AuthService } from '@cadmus/api';
import { FormBuilder, FormArray, Validators } from '@angular/forms';
import {
  IndexKeywordsPart,
  IndexKeyword,
  INDEX_KEYWORDS_PART_TYPEID
} from '../index-keywords-part';
import { ThesaurusEntry, Thesaurus } from '@cadmus/core';

/**
 * Index keywords part editor.
 * Thesauri: languages, keyword-indexes.
 */
@Component({
  selector: 'cadmus-index-keywords-part',
  templateUrl: './index-keywords-part.component.html',
  styleUrls: ['./index-keywords-part.component.css']
})
export class IndexKeywordsPartComponent
  extends ModelEditorComponentBase<IndexKeywordsPart>
  implements OnInit {
  public keywords: FormArray;
  public editedKeyword: IndexKeyword;
  public tabIndex: number;
  // thesaurus
  public indexIdThesaurus: Thesaurus | null;
  public langThesaurus: Thesaurus | null;

  constructor(authService: AuthService, formBuilder: FormBuilder) {
    super(authService);
    // form
    this.keywords = formBuilder.array([], Validators.required);
    this.form = formBuilder.group({
      keywords: this.keywords
    });
    this.tabIndex = 0;
  }

  ngOnInit() {
    this.initEditor();
  }

  protected onThesauriSet() {
    let key = 'languages';
    if (this.thesauri && this.thesauri[key]) {
      this.langThesaurus = this.thesauri[key];
    } else {
      this.langThesaurus = null;
    }
    key = 'keyword-indexes';
    if (this.thesauri && this.thesauri[key]) {
      this.indexIdThesaurus = this.thesauri[key];
    } else {
      this.indexIdThesaurus = null;
    }
  }

  private compareKeywords(a: IndexKeyword, b: IndexKeyword): number {
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
    // indexId
    if (!a.indexId && b.indexId) {
      return -1;
    }
    if (a.indexId && !b.indexId) {
      return 1;
    }
    let n: number;
    if (a.indexId && b.indexId) {
      n = a.indexId.localeCompare(b.indexId);
      if (n !== 0) {
        return n;
      }
    }
    n = a.language.localeCompare(b.language);
    if (n !== 0) {
      return n;
    }
    return a.value.localeCompare(b.value);
  }

  private updateForm(model: IndexKeywordsPart) {
    if (!model) {
      this.form.reset();
      return;
    }

    const ck = Object.assign([], model.keywords);
    ck.sort(this.compareKeywords);
    this.keywords.setValue(ck);
    this.form.markAsPristine();
  }

  protected onModelSet(model: IndexKeywordsPart) {
    this.updateForm(model);
  }

  protected getModelFromForm(): IndexKeywordsPart {
    let part = this.getModelFromJson();
    if (!part) {
      part = {
        itemId: null,
        id: null,
        typeId: INDEX_KEYWORDS_PART_TYPEID,
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

  private addKeyword(keyword: IndexKeyword): boolean {
    let i = 0;
    while (i < this.keywords.value.length) {
      const n = this.compareKeywords(keyword, this.keywords.value[i]);
      if (n === 0) {
        return false;
      }
      if (n <= 0) {
        const ck = Object.assign([], this.keywords.value);
        ck.splice(i, 0, keyword);
        this.keywords.markAsDirty();
        this.keywords.setValue(ck);
        break;
      }
      i++;
    }
    if (i === this.keywords.value.length) {
      const ck = Object.assign([], this.keywords.value);
      ck.push(keyword);
      this.keywords.markAsDirty();
      this.keywords.setValue(ck);
    }
    return true;
  }

  public addNewKeyword() {
    const keyword: IndexKeyword = {
      indexId: this.indexIdThesaurus ? this.indexIdThesaurus.entries[0].id : null,
      language: this.langThesaurus ? this.langThesaurus[0].id : 'eng',
      value: ''
    };
    if (this.addKeyword(keyword)) {
      this.editKeyword(keyword);
    }
  }

  public deleteKeyword(keyword: IndexKeyword) {
    const ck = Object.assign([], this.keywords.value);
    ck.splice(this.keywords.value.indexOf(keyword), 1);
    this.keywords.markAsDirty();
    this.keywords.setValue(ck);
  }

  public editKeyword(keyword: IndexKeyword) {
    this.editedKeyword = keyword;
    this.tabIndex = 1;
  }
}

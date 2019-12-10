import { Component, OnInit, Input } from '@angular/core';
import { COMMENT_FRAGMENT_TYPEID, COMMENT_FRAGMENT_SCHEMA } from '../comment-fragment';
import { ThesauriSet, JsonSchemaService } from '@cadmus/core';

@Component({
  selector: 'cadmus-comment-fragment-demo',
  templateUrl: './comment-fragment-demo.component.html',
  styleUrls: ['./comment-fragment-demo.component.css']
})
export class CommentFragmentDemoComponent implements OnInit {
  private _thesauriJson: string;

  public currentTabIndex: number;
  public schemaName = COMMENT_FRAGMENT_TYPEID;
  public modelJson: string;
  public thesauri: ThesauriSet | null;

  @Input()
  public get thesauriJson(): string {
    return this._thesauriJson;
  }
  public set thesauriJson(value: string) {
    if (this._thesauriJson === value) {
      return;
    }
    this._thesauriJson = value;
    if (value) {
      this.thesauri = JSON.parse(value);
    } else {
      this.thesauri = null;
    }
  }

  constructor(schemaService: JsonSchemaService) {
    this.currentTabIndex = 0;
    schemaService.addSchema(COMMENT_FRAGMENT_TYPEID, COMMENT_FRAGMENT_SCHEMA);
  }

  ngOnInit() {
  }

  public onCodeSaved() {
    this.currentTabIndex = 1;
  }

  public onEditorSaved() {
    this.currentTabIndex = 0;
  }
}

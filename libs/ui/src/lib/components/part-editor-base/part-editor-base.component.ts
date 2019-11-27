import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'cadmus-part-editor-base',
  template: '',
  styles: []
})
export class PartEditorBaseComponent implements OnInit {
  private _partJson: string;

  @Input()
  public get json(): string {
    this._partJson = this.getPartJson();
    return this._partJson;
  }
  public set json(value: string) {
    this._partJson = value;
    this.setPartJson(value);
  }

  constructor() {}

  ngOnInit() {}

  protected setPartJson(json: string) {}

  protected getPartJson(): string {
    return null;
  }
}

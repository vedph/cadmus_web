/**
 * Misspelling operator type.
 */
export enum MspOperator {
  delete = 0,
  replace,
  insert,
  move,
  swap
}

/**
 * Misspelling operation.
 */
export class MspOperation {
  private _operator: MspOperator;
  private _tag: string;
  private _note: string;
  private _valueA: string;
  private _valueB: string;

  public get tag(): string {
    return this._tag;
  }
  public set tag(value: string) {
    this._tag = value;
  }

  // TODO: implement
}

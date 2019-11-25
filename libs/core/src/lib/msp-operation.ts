import { TextRange } from './text-range';

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
  private static readonly _tagRegExp: RegExp = /^[0-9a-zA-Z_\.\-]+$/;
  private static readonly _opRegExp: RegExp = new RegExp(
    // [1]=va ("A")
    '(?:"([^"]+)")?' +
      // [2]=ras [3]=ral (@2x1)
      '\\@(\\d+)(?:[x×](\\d+))?' +
      // [4]=op (=)
      '\\s*([=>~])\\s*' +
      // [5]=vb ("B")
      '(?:"([^"]*)")?' +
      // [6]=rbs [7]=rbl (@2x1)
      '(?:\\@(\\d+)(?:[x×](\\d+))?)?' +
      // [8]=tag ( [tag])
      '(?:\\s*\\[([^\\]{]+)\\])?' +
      // [9]=note ( {note})
      '(?:\\s*\\{([^}]+)})?'
  );

  private _operator: MspOperator;
  private _tag: string;
  private _note: string;
  private _valueA: string;
  private _valueB: string;

  private static parseRangeNumber(text: string): number {
    if (!text || !text.trim()) {
      return 1;
    }
    return parseInt(text, 10);
  }

  private static determineOperator(text: string, operation: MspOperation) {
    switch (text) {
      case '=':
        if (!operation.valueB) {
          operation.operator = MspOperator.delete;
          break;
        }
        operation.operator =
          operation.rangeA.length === 0
            ? MspOperator.insert
            : MspOperator.replace;
        break;
      case '>':
        operation.operator = MspOperator.move;
        break;
      case '~':
        operation.operator = MspOperator.swap;
        break;
    }
  }

  /**
   * Parse the specified text representing a misspelling transform operation.
   * @param text The text.
   * @returns The operation, or null if invalid text.
   */
  public static parse(text: string): MspOperation {
    if (!text || !text.trim()) {
      return null;
    }
    const m = this._opRegExp.exec(text);
    if (!m) {
      return null;
    }

    // [1]=va [2]=ras [3]=ral
    // [4]=op
    // [5]=vb [6]=rbs [7]=rbl
    // [8]=tag [9]=note
    const op = new MspOperation();
    op.rangeA = new TextRange(
      this.parseRangeNumber(m[2]),
      this.parseRangeNumber(m[3]));
    op.valueA = m[1] || null;
    if (m[6]) {
      op.rangeB = new TextRange(
        this.parseRangeNumber(m[6]),
        this.parseRangeNumber(m[7]));
    }
    op.valueB = m[5] || null;
    op.tag = m[8] || null;
    op.note = m[9] || null;

    this.determineOperator(m[4], op);

    // range B is allowed only for move/swap
    if (op.operator !== MspOperator.move
        && op.operator !== MspOperator.swap)
    {
        op.rangeB = null;
    }

    // value B is allowed only for insert/replace/swap
    if (op.operator !== MspOperator.insert
        && op.operator !== MspOperator.replace
        && op.operator !== MspOperator.swap)
    {
        op.valueB = null;
    }

    return op;
  }

  /**
   * The operator.
   */
  public get operator(): MspOperator {
    return this._operator;
  }
  public set operator(value: MspOperator) {
    if (this._operator === value) {
      return;
    }
    this._operator = value;
    // coerce incompatible properties to the new operator
    switch (value) {
      case MspOperator.delete:
        // RAL>0, VB=null
        this._valueB = null;
        break;
      case MspOperator.insert:
        // RAL=0, VA=null, VB!=null
        if (this.rangeA && this.rangeA.length > 0) {
          this.rangeA = new TextRange(this.rangeA.start, 0);
        }
        this._valueA = null;
        break;
      case MspOperator.move:
        // RAL>0, RBL=0, VB=null
        if (this.rangeB && this.rangeB.length > 0) {
          this.rangeB = new TextRange(this.rangeB.start, 0);
        }
        this._valueB = null;
        break;
    }
  }

  /**
   * An optional tag used to group and categorize misspellings operations.
   * E.g. you might want to categorize an operation like
   * "vowels.itacism". A tag can include only letters A-Z or a-z,
   * digits 0-9, underscore, dash, and dot.
   */
  public get tag(): string {
    return this._tag;
  }
  public set tag(value: string) {
    if (value && MspOperation._tagRegExp.test(value) === false) {
      throw new Error(`Invalid msp tag: "${value}"\n` + MspOperation._tagRegExp.source);
    }
    this._tag = value;
  }

  /**
   * An optional free short note to this operation. The note should
   * not include braces, which are automatically dropped when setting
   * this property; also, note's spaces are normalized.
   */
  public get note(): string {
    return this._note;
  }
  public set note(value: string) {
    this._note = this.sanitizeNote(value);
  }

  /**
   * The portion of input text (if any) grabbed by this operation.
   * This is not an operational datum, but is used to label the grabbed
   * input text, so that the operation is more readable for human users.
   * This value should include letters only; anyway, double-quotes
   * characters are removed if present as they are reserved to be used
   * as value delimiters. If empty, the value is coerced to null.
   */
  public get valueA(): string {
    return this._valueA;
  }
  public set valueA(value: string) {
    this._valueA = this.sanitizeValue(value);
  }

  /**
   * The portion of output text (if any) of this operation. This is
   * required only for insert and replace. It is present as a label
   * for swap.
   * This value should include letters only; anyway, double-quotes
   * characters are removed if present as they are reserved to be used
   * as value delimiters. If empty, the value is coerced to null.
   */
  public get valueB(): string {
    return this._valueB;
  }
  public set valueB(value: string) {
    this._valueB = this.sanitizeValue(value);
  }

  /**
   * The text range referred to the input text. This is required.
   */
  public rangeA: TextRange;

  /**
   * The text range referred to the output text. This is required only
   * for move and swap.
   */
  public rangeB: TextRange;

  private sanitizeValue(value: string): string {
    if (!value || !value.trim()) {
      return null;
    }
    return value.replace('"', '');
  }

  private sanitizeNote(note: string): string {
    if (!note || !note.trim()) {
      return null;
    }
    note = note.replace('{', '');
    note = note.replace('}', '');
    return note.replace(/\s+/gi, ' ');
  }

  /**
   * Validate this operation.
   * @returns Error message(s), or null if valid.
   */
  public validate(): string[] {
    const errors = [];

    switch (this._operator) {
      case MspOperator.delete:
        // RAL>0, VB=null
        if (this.rangeA.length === 0) {
          errors.push('Delete operation must span at least 1 character');
        }
        if (this._valueB != null) {
          errors.push('Delete operation must not include a non zero B-value');
        }
        break;
      case MspOperator.insert:
        // RAL=0, VB!=null, VA=null
        if (this.rangeA.length > 0) {
          errors.push('Insert operation must not span');
        }
        if (this._valueA != null) {
          errors.push('Insert operation must not include an A-value');
        }
        if (this._valueB == null) {
          errors.push('Insert operation must include a non zero B-value');
        }
        break;
      case MspOperator.replace:
        // RAL>0, VB!=null
        if (this.rangeA.length === 0) {
          errors.push('Replace operation must span at least 1 character');
        }
        if (this._valueB == null) {
          errors.push('Replace operation must include a non zero B-value');
        }
        break;
      case MspOperator.move:
        // RAL>0, RBL=0, VB=null
        if (this.rangeA.length === 0) {
          errors.push('Move operation must span at least 1 character');
        }
        if (this.rangeB.length > 0) {
          errors.push('Move operation must not span across the B-value');
        }
        if (this._valueB != null) {
          errors.push('Move operation must not include a non zero B-value');
        }
        break;
      case MspOperator.swap:
        // RAL>0, RBL>0
        if (this.rangeA.length === 0) {
          errors.push(
            'Swap operation must span at least 1 character across the A-value'
          );
        }
        if (this.rangeB.length === 0) {
          errors.push(
            'Swap operation must span at least 1 character across the B-value'
          );
        }
        break;
    }

    return errors.length ? errors : null;
  }

  /**
   * Get a parsable text representing this operation.
   * @returns String.
   */
  public toString(): string {
    const sb: string[] = [];

    // ["A"]
    if (this._valueA) {
      sb.push(`"${this._valueA}"`);
    }
    // @N[xN]
    sb.push('@' + this.rangeA.toString());

    // operator
    switch (this._operator) {
      case MspOperator.delete:
        sb.push('=');
        break;

      case MspOperator.replace:
      case MspOperator.insert:
        sb.push(`="${this._valueB}"`);
        break;

      case MspOperator.move:
        sb.push('>@' + this.rangeB.toString());
        break;

      case MspOperator.swap:
        sb.push('~');
        if (this._valueB) {
          sb.push(`"${this._valueB}"`);
        }
        sb.push('@' + this.rangeB.toString());
        break;
    }

    // [tag]
    if (this._tag) {
      sb.push(` [${this._tag}]`);
    }
    // {note}
    if (this._note) {
      sb.push(` {${this._note}}`);
    }

    return sb.join('');
  }
}

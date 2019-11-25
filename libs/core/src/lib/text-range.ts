/**
 * A simple text range, expressed as start character index and characters
 * length. This is used for misspellings operations.
 */
export class TextRange {
  /**
   * The start character index.
   */
  public start: number;

  /**
   * The length in characters.
   */
  public length: number;

  /**
   * Parse the specified text representing a range, in the form "startxlength"
   * or just "start" when length is 1.
   *
   * @param text The text.
   */
  public static parse(text: string): TextRange {
    if (!text) {
      return null;
    }
    // [1]=start, ([2]=length)
    const m = new RegExp('(\\d+)(?:[×x](\\d+))?', 'gm').exec(text);
    if (!m) {
      return null;
    }
    return new TextRange(
      parseInt(m[1], 10),
      m[2]? parseInt(m[2], 10) : 1);
  }

  constructor(start: number, length: number) {
    if (start < 0) throw new RangeError('TextRange start less than 0');
    if (length < 0) throw new RangeError('TextRange length less than 0');

    this.start = start;
    this.length = length;
  }

  /**
   * Get the inclusive end of the range.
   */
  public end(): number {
    const n = this.start + this.length;
    return n > 0? n - 1 : 0;
  }

  /**
   * True if this range value is equal to the other range value.
   * @param other The other range.
   */
  public isEqual(other: TextRange): boolean {
    if (!other) {
      return false;
    }
    return this.start === other.start && this.length === other.length;
  }

  /**
   * Get a parsable textual representation of this range.
   * @returns Text.
   */
  public toString(): string {
    return this.length === 1
      ? this.start.toString()
      : `${this.start}×${this.length}`;
  }
}

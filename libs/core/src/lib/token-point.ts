/**
 * A single point in a token-based textual location.
 */
export class TokenPoint {
  y: number;
  x: number;
  at?: number;
  run?: number;

  /**
   * Parse the specified text representing a token-based point location.
   * @param text The text to parse, in the forms Y.X or Y.X@AxR or
   * Y.X@A, where R=1.
   */
  public static parse(text: string): TokenPoint {
    const r = new RegExp('^(\\d+)\\.(\\d+)(?:@(\\d+)(?:x(\\d+))?)?$', 'g');
    const m = r.exec(text);
    if (!m) {
      return null;
    }
    const pt = new TokenPoint(
      parseInt(m[1], 10),
      parseInt(m[2], 10),
      m[3] ? parseInt(m[3], 10) : 0
    );

    if (m[3]) {
      if (m[4]) {
        pt.run = m[4] ? parseInt(m[4], 10) : 1;
      }
    }
    return pt;
  }

  constructor(y: number, x: number, at = 0, run = 0) {
    this.y = y;
    this.x = x;
    this.at = at;
    this.run = run;
  }

  public toString(): string {
    let s = `${this.y}.${this.x}`;

    if (this.at > 0 && this.run > 0) {
      s += `@${this.at}`;
      if (this.run !== 1) {
        s += `x${this.run}`;
      }
    }
    return s;
  }

  public compareTo(other: TokenPoint): number {
    if (this.y !== other.y) {
      return this.y - other.y;
    }
    if (this.x !== other.x) {
      return this.x - other.x;
    }

    if (this.at !== other.at) {
      return this.at - other.at;
    }
    return this.run - other.run;
  }

  public integralCompareTo(other: TokenPoint): number {
    if (this.y !== other.y) {
      return this.y - other.y;
    }
    if (this.x !== other.x) {
      return this.x - other.x;
    }
    return 0;
  }
}

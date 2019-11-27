import { TokenPoint } from './token-point';

export class TokenLocation {
  public primary: TokenPoint;
  public secondary?: TokenPoint;

  /**
   * Parse the text representing a token-based location,
   * which has the form "primary-secondary", or just "primary",
   * where each of these points has the format required by
   * TokenPoint.parse (e.g. Y.X or Y.X@AxR or Y.X@A, where R=1).
   * @param text The text to parse.
   */
  public static parse(text: string): TokenLocation {
    if (!text) {
      return null;
    }
    const pair = text.split('-', 2);
    if (pair.length === 0) {
      return null;
    }

    return new TokenLocation(
      TokenPoint.parse(pair[0]),
      pair.length > 1 ? TokenPoint.parse(pair[1]) : null
    );
  }

  constructor(primary: TokenPoint, secondary: TokenPoint = null) {
    this.primary = primary;
    this.secondary = secondary;
  }

  public isRange(): boolean {
    // note that != checks for both null and undefined, whereas !== does not
    return this.secondary != null;
  }

  public toString(): string {
    return this.secondary
      ? `${this.primary.toString()}-${this.secondary.toString()}`
      : this.primary.toString();
  }

  public compareTo(other: TokenLocation): number {
    const n1 = this.primary.compareTo(other.primary);
    if (n1 !== 0) {
      return n1;
    }
    if (this.secondary && other.secondary) {
      return this.secondary.compareTo(other.secondary);
    }
    if (!this.secondary && !other.secondary) {
      return 0;
    }
    return this.secondary ? 1 : -1;
  }

  public overlaps(other: TokenLocation): boolean {
    // empty coords never overlaps
    if (!other.primary) {
      return false;
    }

    // (in the following comments A=this and B=other)
    // 1) if B is a point, cases are:
    //  1.1. A is a point: A overlaps with B (both points) if they're equal.
    //  1.2. A is a range: A (range) overlaps with B (point)
    //       when A-left is <= B-left and A-right is >= B-right.
    if (other.secondary == null) {
      return !this.secondary
        ? this.primary.integralCompareTo(other.primary) === 0
        : this.primary.compareTo(other.primary) <= 0 &&
            this.secondary.compareTo(other.primary) >= 0;
    }

    // 2) if B is a range, cases are:
    // 2.1. A is a point: A (point) overlaps with B (range) when B-left <= A and
    //  B-right >= A
    // 2.2. A is a range: A (range) overlaps with B (range)
    //  when B-right >= A-left and B-left <= A-right
    return !this.secondary
      ? other.primary.compareTo(this.primary) <= 0 &&
          other.secondary.compareTo(this.primary) >= 0
      : other.secondary.compareTo(this.primary) >= 0 &&
          other.primary.compareTo(this.secondary) <= 0;
  }
}

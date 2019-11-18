import { stringify } from 'querystring';

/**
 * Roman number converter.
 */
export class RomanNumber {
  private static _postVal = [
    1000000,
    500000,
    100000,
    50000,
    10000,
    5000,
    1000,
    500,
    100,
    50,
    10,
    5,
    1
  ];
  private static _postAlpha = [
    'm',
    'd',
    'c',
    'l',
    'x',
    'v',
    'M',
    'D',
    'C',
    'L',
    'X',
    'V',
    'I'
  ];
  private static _preVal = [
    900000,
    400000,
    90000,
    40000,
    9000,
    4000,
    900,
    400,
    90,
    40,
    9,
    4,
    1
  ];
  private static _preAlpha = [
    'cm',
    'cd',
    'xc',
    'xl',
    'ix',
    'iv',
    'CM',
    'CD',
    'XC',
    'XL',
    'IX',
    'IV',
    'I'
  ];
  private static _romanDigits = 'IVXLCDM';
  private static _romanSubdigits = ' IIXXCC';
  private static _romanValues = [1, 5, 10, 50, 100, 500, 1000];

  /**
   * Convert the specified numeric value to a Roman number.
   * @param value The value.
   * @param allowBar True to allow bar on letters. A bar on a letter
   * multiplies its value by 1000.
   * @param allowPrefix True to allow prefix notation.
   * @param ancient True to use the ancient preferred notation, i.e.
   * the preferred epigraphical notation (IIII instead of IV, VIIII instead of IX).
   */
  public static toRoman(
    value: number,
    allowBar = true,
    allowPrefix = true,
    ancient = false
  ): string {
    if (value <= 0) {
      return '';
    }
    let place = allowBar ? 0 : 6;
    const sb: string[] = [];

    while (value > 0) {
      while (value >= this._postVal[place]) {
        sb.push(this._postAlpha[place]);
        value -= this._postVal[place];
      }

      if (allowPrefix) {
        if (value >= this._preVal[place]) {
          sb.push(this._preAlpha[place]);
          value -= this._preVal[place];
        }
      }
      place++;
    }

    if (ancient) {
      let s = sb.join('');
      s = s.replace('IV', 'IIII');
      return s.replace('IX', 'VIII');
    }

    return sb.join('');
  }

  private static isLower(c: string): boolean {
    return c.toLowerCase() === c;
  }

  private static isUpper(c: string): boolean {
    return c.toUpperCase() === c;
  }

  private static isCaseEqual(c1: string, c2: string): boolean {
    return (
      (this.isLower(c1) && this.isLower(c2)) ||
      (this.isUpper(c1) && this.isUpper(c2))
    );
  }

  private static getRomanDigitValue(digit: string): number {
    const i = this._romanDigits.indexOf(digit.toUpperCase());
    if (i === -1) {
      return 0;
    }
    return this.isLower(digit)
      ? this._romanValues[i] * 1000
      : this._romanValues[i];
  }

  /**
   * Convert the specified Roman number to a numeric value.
   * @param roman: The Roman number.
   * @param allowBar: True to allow bar-on-letter notation.
   */
  public static fromRoman(roman: string, allowBar = true): number {
    if (!roman) {
      return 0;
    }
    let result = 0;
    if (!allowBar) {
      roman = roman.toUpperCase();
    }
    for (let index = 0; index < roman.length; index++) {
      // if the previous value was a sub-digit, it had to be subtracted instead
      // of added; thus, subtract it twice (once to compensate for the wrong addition,
      // and once to subtract from this value) from the current digit value
      result += this.getRomanDigitValue(roman[index]);

      if (index > 0) {
        const i = this._romanDigits.indexOf(roman[index]);
        if (
          roman[index - 1].toUpperCase() ===
            this._romanSubdigits[i].toUpperCase() &&
          this.isCaseEqual(roman[index - 1], roman[index])
        ) {
          // tslint:disable-next-line:no-bitwise
          result -= this.getRomanDigitValue(this._romanSubdigits[i]) << 1;
        }
      }
    }
    return result;
  }
}

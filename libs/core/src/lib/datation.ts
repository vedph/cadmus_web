import { RomanNumber } from './roman-number';

/**
 * Interface implemented by a single datation point in a historical date,
 * as returned from the server.
 */
export interface DatationModel {
  value: number;
  isCentury: boolean;
  isSpan: boolean;
  isApproximate: boolean;
  isDubious: boolean;
  day: number;
  month: number;
  hint: string;
}

/**
 * Options for formatting a datation.
 */
export interface DatationFormatOptions {
  aboutText: string;
  bcText: string;
  adText: string;
  dayNames: string[];
  monthNames: string[];
}

/**
 * Default options for formatting a datation.
 */
export const DATATION_FORMAT_OPTIONS: DatationFormatOptions = {
  aboutText: 'c.',
  bcText: 'BC',
  adText: 'AD',
  dayNames: [
    'sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'
  ],
  monthNames: [
    'jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'
  ]
};

/**
 * Single datation point in a historical date.
 */
export class Datation implements DatationModel {
  public value: number;
  public isCentury: boolean;
  public isSpan: boolean;
  public isApproximate: boolean;
  public isDubious: boolean;
  public day: number;
  public month: number;
  public hint: string;

  /**
   * Create a new datation, optionally setting its data.
   * @param datation The optional data to be copied into the newly created datation.
   */
  constructor(datation: DatationModel = null) {
    if (datation) {
      this.copyFrom(datation);
    }
  }

  /**
   * Sanitize the hint text representing a Datation's hint so that it does not
   * include the reserved sequence -- (which gets replaced with Unicode EM
   * space U+2014), nor the braces. This is because the double dashes are used
   * to separate two datations, and braces to mark a hint in a datation.
   * Also, the whitespaces are all flattened to simple spaces, and normalized
   * (no whitespaces at start/end and no sequence of whitespaces).
   * If the resulting sanitized string is empty, or it was null when received,
   * null is returned.
   * @param hint The hint or null/undefined.
   * @returns The sanitized hint or undefined.
   */
  public static sanitizeHint(hint: string): string {
    if (!hint || !hint.trim()) {
      return undefined;
    }

    // replace reserved characters
    hint = hint.replace('--', '\u2014');
    hint = hint.replace('{', '');
    hint = hint.replace('}', '');

    // flatten and normalize whitespaces
    const s = hint.replace(/\s+/g, ' ').trim();
    return s ? s : undefined;
  }

  private static regexEscape(text: string): string {
    // https://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
    return text.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  }

  /**
   * Get BC and AD patterns for matching.
   * @param options The datation format options.
   */
  public static getErasOptionsForRegex(options: DatationFormatOptions
    = DATATION_FORMAT_OPTIONS): string[] {
    return [
      options.bcText ? this.regexEscape(options.bcText) : 'BC',
      options.adText ? this.regexEscape(options.adText) : 'AD'
    ]
  }

  private static getParserRegex(options: DatationFormatOptions): RegExp {
    const bcad = this.getErasOptionsForRegex(options);

    return new RegExp(
      // about (1)
      '(c\\.)?\\s*' +
      // day (2)
      '(?:([0123]\\d?)\\s+)?' +
      // month (3)
      '(?:([a-zA-Z]{3,})\\s+)?' +
      // year/span (4,5)
      '(?:' +
      '(?:(\\d+)(?:\\s*/\\s*(\\d+))?)|' +
      // century (6)
      '([ivxIVX]+)' +
      ')\\s*' +
      // era (7)
      '(' + bcad[0] + '|' + bcad[1] + ')?' +
      // perhaps (8)
      '(\\s*\\?)?' +
      // hint (9)
      '(?:\\s*\\{([^}]+)\\})?', 'i');
  }

  /**
   * Parse the specified text representing a datation.
   * @param text The text to be parsed.
   * @param options The formatter options.
   * @returns The parsed datation, or undefined if invalid or empty.
   * Note that here we return undefined to mean a non-existing point.
   * We do not want a non-existing point to be represented as a null,
   * as this would be included as in the JSON code when serializing.
   */
  public static parse(text: string,
    options: DatationFormatOptions = DATATION_FORMAT_OPTIONS): Datation {
    if (!text) {
      return undefined;
    }
    const datation = new Datation();
    const datationRegex = this.getParserRegex(options);
    const m = datationRegex.exec(text);
    if (!m) {
      return undefined;
    }

    // about
    if (m[1]) {
      datation.isApproximate = true;
    }

    // day
    if (m[2]) {
      datation.day = parseInt(m[2], 10);
    }

    // month
    if (m[3]) {
      const lowerMonth = m[3].toLowerCase();
      const i = options.monthNames.findIndex(name =>
        name.toLowerCase() === lowerMonth);
      if (i > -1) {
        datation.month = i + 1;
      }
    }

    // year, span
    if (m[4]) {
      datation.value = parseInt(m[4], 10);
      if (m[5]) {
        datation.isSpan = true;
      }
    } else {
      datation.value = RomanNumber.fromRoman(m[6].toUpperCase());
      datation.isCentury = true;
    }

    // era
    if (m[7]) {
      const era = m[7].replace(' ', '').toLowerCase();
      if (era === options.bcText.toLowerCase()) {
        datation.value = -datation.value;
      }
    }

    // dubious
    if (m[8]) {
      datation.isDubious = true;
    }

    // hint
    if (m[9]) {
      datation.hint = Datation.sanitizeHint(m[9]);
    }

    return datation;
  }

  /**
   * Strip any era code from the specified datation format string.
   * @param format The format string.
   */
  public static stripFormatStringEra(format: string): string {
    if (!format) {
      return 'i';
    }

    // convert ga gp Ga Gp into simple g G
    format = format.replace(new RegExp('([gG])[ap]', 'gi'), '$1');

    // replace g/G with i/I
    format = format.replace('g', 'i');
    format = format.replace('G', 'I');

    // remove ea ep Ea Ep with preceding w/W if any
    format = format.replace(new RegExp('[wW]?[eE][ap]?', 'gi'), '');

    return format;
  }

  /**
   * Reset this datation.
   */
  public reset() {
    this.value = 0;
    this.isCentury = false;
    this.isSpan = false;
    this.isApproximate = false;
    this.day = 0;
    this.month = 0;
    this.hint = undefined;
  }

  /**
   * Copy data from the specified source datatation.
   * @param datation The source datation.
   */
  public copyFrom(datation: DatationModel) {
    this.value = datation.value;
    this.isCentury = datation.isCentury;
    this.isSpan = datation.isSpan;
    this.isApproximate = datation.isApproximate;
    this.isDubious = datation.isDubious;
    this.day = datation.day;
    this.month = datation.month;
    this.hint = datation.hint? datation.hint : undefined;
  }

  /**
   * True if this datation is undefined. A datation is undefined when
   * its value is 0. Undefined datations are used as unknown points in a range
   * for termini ante/post.
   */
  public isUndefined(): boolean {
    return !this.value;
  }

  /**
   * Get a sort value from this datation.
   */
  public getSortValue(): number {
    let result: number;

    if (this.isCentury) {
      result = this.value * 100 + (this.value < 0 ? 50 : -50);
    } else {
      result = this.value;
    }
    if (this.isSpan) {
      result += .5;
    }
    if (this.month > 0 && this.month <= 12) {
      result += this.month / 12;
    }
    if (this.day > 0 && this.day <= 31) {
      result += this.day / (12 * 31);
    }
    return result;
  }

  /**
   * Get the 2-years span end value from this datation.
   * A span year is always represented with its beginning year: e.g. -776/5
	 * is -776 with span, and 56/7 is 56 with span. This method returns the end year
	 * for a span, i.e. in the above samples -775 and 57 respectively. If this datation
	 * is not a span, the function just returns the unique year value.
   */
  public getSpanEnd(): number {
    if (this.isCentury) {
      return 0;
    }
    return this.isSpan ? this.value + 1 : this.value;
  }

  /**
   * Get the century number corresponding this datation.
   * This function returns 0 if the datation is null, or the century number,
   * less than 0 if B.C. The result is based on the century value, if
   * this is a century datation, or on the year, if this is not a century
   * datation (e.g. -5 for 480 B.C., +1 for 31 A.D.).
   */
  public getCentury(): number {
    if (this.value === 0) {
      return 0;
    }
    return this.isCentury ?
      this.value :
      Math.trunc(this.value / 100 + (this.value < 0 ? -1 : 1));
  }

  private matchTokenAt(token: string, text: string, index: number): boolean {
    if (index + token.length > text.length) {
      return false;
    }

    for (let i = 0; i < token.length; i++) {
      if (token.charAt(i) !== text.charAt(i + index)) {
        return false;
      }
    }
    return true;
  }

  private parseFormatString(format: string): string[] {
    if (!format) {
      return ['G'];
    }

    // expand macros
    const macros = [
      'ga', 'awdwMMMwvwepwpwh',
      'Ga', 'awdwMMMwvwepwpwh',
      'gp', 'awdwMMMwvweawpwh',
      'Gp', 'awdwMMMwvweawpwh',
      'g', 'awdwMMMwvwewpwh',
      'G', 'AwdwMMMwVwewPwH',
      'i', 'awdwMMMwvwpwh',
      'I', 'AwdwMMMwVwPwH'
    ];
    const sb: string[] = [];
    let fi = 0, matched: boolean;

    while (fi < format.length) {
      matched = false;
      for (let mi = 0; mi < macros.length; mi += 2) {
        if (this.matchTokenAt(macros[mi], format, fi)) {
          sb.push(macros[mi + 1]);
          fi += macros[mi].length;
          matched = true;
          break;
        }
      }
      if (!matched) {
        sb.push(format[fi]);
        fi++;
      }
    }
    format = sb.join();

    // split into tokens and literals
    const tokens = [
      'ddd', 'MMM',
      'dd', 'ea', 'ep', 'Ea', 'Ep', 'ga', 'Ga', 'gp', 'Gp', 'MM'
    ];

    fi = 0;
    const results: string[] = [];

    while (fi < format.length) {
      matched = false;
      for (let ti = 0; ti < tokens.length; ti++) {
        if (this.matchTokenAt(tokens[ti], format, fi)) {
          results.push(tokens[ti]);
          fi += tokens[ti].length;
          matched = true;
          break;
        }
      }
      if (!matched) {
        results.push(format.charAt(fi));
        fi++;
      }
    }

    return results;
  }

  /**
   * Convert this datation to a string.
   * @param format The format string, which can include any of the following:
   * v = year or century value, lowercase
   * V = year or century value, uppercase
   * c = century, lowercase
   * C = century, uppercase
   * a or A = 'about' marker when present
   * p or P = 'perhaps' marker when present
   * d = day number when present
   * dd = 2-digits (0-padded at left) day number when present
   * ddd = weekday name when present
   * M = month number when present
   * MM = 2-digits (0-padded at left) month number when present
   * MMM = month name when present
   * e = era
   * E = era, all uppercase
   * ea = era, only if ante Christum natum
   * ep = era, only if post Christum natum
   * Ea = era all uppercase, only if ante Christum natum
   * Ep = era all uppercase, only if post Christum natum
   * h or H = hint when present
   * w or W = smart whitespace (appended only when left char if any
   * is not a whitespace)
   * s or S = sort value
   * g = generic: equal to awdwMMMwvwewpwh
   * G = generic uppercase: equal to AwdwMMMwVwewPwH
   * ga = generic ante Christum: era expressed only when post Christum
   * natum. Equal to awdwMMMwvwepwpwh
   * Ga = generic uppercase ante Christum: equal to awdwMMMwvwepwpwh
   * gp = generic post Christum: era expressed only when ante Christum
   * natum. Equal to awdwMMMwvweawpwh
   * Gp = generic uppercase post Christum: equal to awdwMMMwvweawpwh
   * i = generic with implicit (=not expressed) era: equal to awdwMMMwvwpwh
   * I = generic uppercase with implicit (=not expressed) era: equal to
   * AwdwMMMwVwPwH
   * @param options The options.
   */
  public toString(format = 'G',
    options: DatationFormatOptions = DATATION_FORMAT_OPTIONS): string {
    if (this.isUndefined()) {
      return '';
    }
    if (!format) {
      format = 'G';
    }
    if (!options) {
      options = DATATION_FORMAT_OPTIONS;
    }

    const sb: string[] = [];
    const tokens = this.parseFormatString(format);

    tokens.forEach(token => {
      switch (token) {
        case 'v':
        case 'V':
          // year or century
          if (this.isCentury) {
            sb.push(token === 'v' ?
              RomanNumber.toRoman(Math.abs(this.value)).toLowerCase() :
              RomanNumber.toRoman(Math.abs(this.value)).toUpperCase());
          } else {
            const year = Math.abs(this.value);
            sb.push(year.toString());
            if (this.isSpan) {
              sb.push(`/${year + (this.value < 0 ? -1 : +1)}`);
            }
          }
          break;

        case 'c':
        case 'C':
          const century = Math.abs(this.getCentury());
          sb.push(token === 'c' ?
            RomanNumber.toRoman(century).toLowerCase() :
            RomanNumber.toRoman(century).toUpperCase());
          break;

        case 'a':
        case 'A':
          if (this.isApproximate) {
            sb.push(options.aboutText);
          }
          break;

        case 'p':
        case 'P':
          if (this.isDubious) {
            sb.push('?');
          }
          break;

        case 'd':
          if (this.day > 0) {
            sb.push(this.day.toString());
          }
          break;
        case 'dd':
          if (this.day > 0) {
            sb.push(this.day.toString().padStart(2, '0'));
          }
          break;
        case 'ddd':
          if (this.day > 0) {
            const date = new Date(this.value, this.month, this.day);
            const dow = date.getDay();
            sb.push(options.dayNames[dow]);
          }
          break;

        case 'M':
          if (this.month > 0) {
            sb.push(this.month.toString());
          }
          break;
        case 'MM':
          if (this.month > 0) {
            sb.push(this.month.toString().padStart(2, '0'));
          }
          break;
        case 'MMM':
          if (this.month > 0) {
            sb.push(options.monthNames[this.month - 1]);
          }
          break;

        case 'e':
          sb.push(this.value < 0 ? options.bcText : options.adText);
          break;
        case 'E':
          sb.push(this.value < 0 ?
            options.bcText.toUpperCase() :
            options.adText.toUpperCase());
          break;
        case 'ea':
          if (this.value < 0) {
            sb.push(options.bcText);
          }
          break;
        case 'ep':
          if (this.value > 0) {
            sb.push(options.adText);
          }
          break;

        case 'h':
        case 'H':
          if (this.hint) {
            sb.push(` {${this.hint}}`);
          }
          break;

        case 'w':
        case 'W':
          if (sb.length > 0) {
            const last = sb[sb.length - 1];
            if (!last.endsWith(' ')) {
              sb.push(' ');
            }
          }
          break;

        case 's':
        case 'S':
          sb.push(this.getSortValue().toString());
          break;

        default:
          // literal
          sb.push(token);
          break;
      }
    });
    return sb.join('').trim().replace(new RegExp('\\s+', 'g'), ' ');
  }
}

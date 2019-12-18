import {
  Datation,
  DatationFormatOptions,
  DATATION_FORMAT_OPTIONS,
  DatationModel
} from './datation';

const APPROX_DELTA = 10;

/**
 * Type of historical date.
 */
export enum HistoricalDateType {
  undefined = 0,
  point,
  range
}

/**
 * Interface implemented by a historical date, as returned from the server.
 */
export interface HistoricalDateModel {
  a: DatationModel;
  b: DatationModel;
}

/**
 * A historical date, including 0, 1, or 2 datation points.
 */
export class HistoricalDate implements HistoricalDateModel {
  public a: Datation;
  public b: Datation;

  constructor(date: HistoricalDateModel = null) {
    if (!date) {
      this.a = new Datation();
      // B=undefined for a single point
    } else {
      this.a = new Datation(date.a);
      if (date.b) {
        this.b = new Datation(date.b);
      }
    }
  }

  /**
   * Parse the specified text representing a historical datation.
   * @param text The text to be parsed.
   * @param options The datation formatter options.
   * @return The datation, or null if invalid.
   */
  public static parse(
    text: string,
    options: DatationFormatOptions = DATATION_FORMAT_OPTIONS
  ): HistoricalDate {
    if (!text) {
      return null;
    }
    const dates = text.split('--');
    let s1 = dates[0].trim();
    const s2 = dates.length > 1 ? dates[1].trim() : null;
    if (!s1) {
      return null;
    }

    const date = new HistoricalDate();
    if (dates.length > 1) {
      // if both terms are specified, integrate BC/AD indication in 1st if required
      if (s1 && s2) {
        const bcad = Datation.getErasOptionsForRegex(options);
        const tailRegexp = new RegExp(
          // era (1)
          '(' +
            bcad[0] +
            '|' +
            bcad[1] +
            ')?' +
            // dubious (2)
            '(\\s*\\?)?' +
            // hint (3)
            '(?:\\s*\\{?:([^)]+)\\})?\\s*$',
          'gi'
        );
        const m1 = tailRegexp.exec(s1);

        // if 1st has no era try integration from 2nd
        if (m1 && m1[1]) {
          // get era from 2nd (if 2nd hasn't it too, give up and AD will be assumed)
          const m2 = tailRegexp.exec(s2);
          if (m2 && m2[1]) {
            const era = m2[1] || 'p.C.';
            const sb1: string[] = [];
            if (m1.index > 0) {
              sb1.push(s1.substr(0, m1.index));
            }
            sb1.push(' ' + era);
            if (m1[2]) {
              sb1.push('?');
            }
            if (m1[3]) {
              sb1.push(` (${m1[3]})`);
            }
            s1 = sb1.join('');
          }
        }
      }
      date.setStartPoint(Datation.parse(s1, options));
      date.setEndPoint(Datation.parse(s2, options));
    } else {
      // here we have a s2, even if empty. When empty, it represents
      // an unknown point in a terminus ante/post, and as such we
      // must set B=null. When B=undefined, it's not a range but a point.
      const d = Datation.parse(s1, options);
      if (d && !d.isUndefined()) {
        date.setSinglePoint(d);
      }
    }

    return date;
  }

  public getStartPoint(): Datation {
    return this.getDateType() === HistoricalDateType.range ? this.a : undefined;
  }

  public setStartPoint(value: Datation) {
    this.a = new Datation(value);
    // it's a range, ensure max is not null
    if (!this.b) {
      this.b = new Datation();
    }
  }

  public getEndPoint(): Datation {
    return this.getDateType() === HistoricalDateType.range ? this.b : undefined;
  }

  public setEndPoint(value: Datation) {
    this.b = new Datation(value);
  }

  public getSinglePoint(): Datation {
    return this.getDateType() === HistoricalDateType.point ? this.a : undefined;
  }

  public setSinglePoint(value: Datation) {
    this.a = new Datation(value);
    // it's a point, ensure max is undefined
    this.b = undefined;
  }

  /**
   * True if this date is undefined.
   */
  public isUndefined(): boolean {
    return (
      !this.a || (this.a.isUndefined() && (!this.b || this.b.isUndefined()))
    );
  }

  /**
   * Get the type of this date.
   */
  public getDateType(): HistoricalDateType {
    if (this.isUndefined()) {
      return HistoricalDateType.undefined;
    }
    return this.b ? HistoricalDateType.range : HistoricalDateType.point;
  }

  /**
   * Validate this date.
   * @returns Error message if invalid, or null if valid.
   */
  public validate(): string {
    if (!this.a) {
      return 'Missing point A';
    }

    if (this.getDateType() === HistoricalDateType.range) {
      const av = this.a.getSortValue();
      const bv = this.b.getSortValue();
      if (av && bv && av >= bv) {
        return 'Point A is past point B';
      }
    }

    return null;
  }

  /**
   * Get the sort value for this date.
   */
  public getSortValue(): number {
    switch (this.getDateType()) {
      case HistoricalDateType.point:
        return this.a.getSortValue();

      case HistoricalDateType.range:
        if (this.a.isUndefined()) {
          return this.b.getSortValue() - APPROX_DELTA;
        }
        if (this.b.isUndefined()) {
          return this.a.getSortValue() + APPROX_DELTA;
        }
        return (this.a.getSortValue() + this.b.getSortValue()) / 2;

      default:
        return 0;
    }
  }

  /**
   * Build a textual representation of this date.
   * @param format The format string.
   * @param options The formatter options.
   */
  public toString(
    format = 'G',
    options: DatationFormatOptions = DATATION_FORMAT_OPTIONS
  ) {
    const sb: string[] = [];

    switch (this.getDateType()) {
      case HistoricalDateType.point:
        sb.push(this.a.toString(format, options));
        break;

      case HistoricalDateType.range:
        // if both terms are present and belong to same era, omit it in 1st
        if (
          !this.a.isUndefined() &&
          this.b &&
          !this.b.isUndefined() &&
          this.a.value * this.b.value > 0
        ) {
          sb.push(
            this.a.toString(Datation.stripFormatStringEra(format), options)
          );
          sb.push(' -- ');
          sb.push(this.b.toString(format, options));
          break;
        }

        if (!this.a.isUndefined()) {
          sb.push(this.a.toString(format, options) + ' ');
        }
        sb.push('--');
        if (this.b && !this.b.isUndefined()) {
          sb.push(this.b.toString(format, options));
        }
        break;
    }

    return sb.join('');
  }

  /**
   * Get the approximate year value from the specified century value.
   * @param century The century number, negative if B.C.
   */
  private centuryToYear(century: number): number {
    return century * 100 + (century < 0 ? 50 : -50);
  }

  /**
   * Convert this date into a single approximate year value.
   * For centuries, the central century year is returned (e.g. -350 for IV B.C.
   * and +350 for IV A.D.); when the date is a range with a single boundary only
   * (max or min) the corresponding year minus or plus a predefined delta value
   * (10) is returned; if it's a range with both boundaries (max and min),
   * the middle year between them is returned.
   * @param useTerminusSpan True to add or remove the predefined span from
   * a terminus ante or post.
   */
  public toYear(useTerminusSpan = true): number {
    let year = 0;

    switch (this.getDateType()) {
      case HistoricalDateType.point:
        year = Math.trunc(
          this.a.isCentury ? this.centuryToYear(this.a.value) : this.a.value
        );
        break;

      case HistoricalDateType.range:
        // min is missing: terminus ante
        if (this.a.isUndefined()) {
          year = Math.trunc(
            (this.b.isCentury
              ? this.centuryToYear(this.b.value)
              : this.b.value) - (useTerminusSpan ? APPROX_DELTA : 0)
          );
          break;
        }
        // max is missing: terminus post
        if (!this.b || this.b.isUndefined()) {
          year = Math.trunc(
            (this.a.isCentury
              ? this.centuryToYear(this.a.value)
              : this.a.value) + (useTerminusSpan ? APPROX_DELTA : 0)
          );
          break;
        }
        // both min and max
        const min = this.a.isCentury
          ? this.centuryToYear(this.a.value)
          : this.a.value;
        const max = this.b.isCentury
          ? this.centuryToYear(this.b.value)
          : this.b.value;
        year = Math.trunc((max - min) / 2 + min);
        if (year === 0) {
          year = 1;
        }
        break;
    }

    return year;
  }

  /**
   * True if any value (either in point or in range) has an about flag.
   */
  public isAbout(): boolean {
    let about = false;

    switch (this.getDateType()) {
      case HistoricalDateType.point:
        about = this.a.isApproximate;
        break;
      case HistoricalDateType.range:
        if (!this.a.isUndefined()) {
          about = this.a.isApproximate;
          break;
        }
        if (!this.b.isUndefined()) {
          about = this.b.isApproximate;
        }
        break;
    }

    return about;
  }

  /**
   * True if any value (either in point or in range) has an about flag.
   */
  public isDubious(): boolean {
    let dubious = false;

    switch (this.getDateType()) {
      case HistoricalDateType.point:
        dubious = this.a.isDubious;
        break;
      case HistoricalDateType.range:
        if (!this.a.isUndefined()) {
          dubious = this.a.isDubious;
          break;
        }
        if (!this.b.isUndefined()) {
          dubious = this.b.isDubious;
        }
        break;
    }

    return dubious;
  }
}

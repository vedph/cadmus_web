import { Injectable } from '@angular/core';

/**
 * Colors helper service.
 */
@Injectable({
  providedIn: 'root',
})
export class ColorService {
  /**
   * Get the R,G,B components of the color expressed by the specified
   * RGB string (3 or 6 digits format).
   *
   * @param rgb The RGB color string (3 or 6 digits).
   * @returns An array where [0]=R, [1]=G, [2]=B, or null if invalid
   * input string.
   */
  public getRgb(rgb: string): number[] | null {
    if (!rgb) {
      return null;
    }

    // RGB
    let m = rgb.match(/^#?([0-9a-f]{3})$/i);
    if (m && m[1]) {
      // in 3-characters format, each value is multiplied by 0x11 to give an
      // even scale from 0x00 to 0xff
      return [
        parseInt(m[1].charAt(0), 16) * 0x11,
        parseInt(m[1].charAt(1), 16) * 0x11,
        parseInt(m[1].charAt(2), 16) * 0x11,
      ];
    }
    // RRGGBB
    m = rgb.match(/^#?([0-9a-f]{6})$/i);
    if (m && m[1]) {
      return [
        parseInt(m[1].substr(0, 2), 16),
        parseInt(m[1].substr(2, 2), 16),
        parseInt(m[1].substr(4, 2), 16),
      ];
    }
    return null;
  }

  /**
   * Get black or white according to which of them has the maximum contrast
   * against the specified color.
   *
   * @param rgb The RGB color string.
   * @returns Black or white. If rgb is invalid, always black.
   */
  public getContrastColor(rgb: string): string {
    // https://stackoverflow.com/questions/3942878/how-to-decide-font-color-in-white-or-black-depending-on-background-color
    const values = this.getRgb(rgb);
    if (!values) {
      return 'black';
    }
    return values[0] * 0.299 + values[1] * 0.587 + values[2] * 0.114 > 186
      ? 'black'
      : 'white';
  }
}

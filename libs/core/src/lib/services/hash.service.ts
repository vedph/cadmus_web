import { Injectable } from '@angular/core';

// tslint:disable:no-bitwise

@Injectable({
  providedIn: 'root'
})
export class HashService {
  constructor() {}

  /**
   * Gets the MD5 of the specified text.
   * From https://github.com/killmenot/webtoolkit.md5/blob/master/md5.js .
   * @param text: text.
   * @returns MD5 hash.
   */
  public getMd5(text: string): string {
    let x = Array();
    let k: number,
      AA: number,
      BB: number,
      CC: number,
      DD: number,
      a: number,
      b: number,
      c: number,
      d: number;
    const S11 = 7,
      S12 = 12,
      S13 = 17,
      S14 = 22;
    const S21 = 5,
      S22 = 9,
      S23 = 14,
      S24 = 20;
    const S31 = 4,
      S32 = 11,
      S33 = 16,
      S34 = 23;
    const S41 = 6,
      S42 = 10,
      S43 = 15,
      S44 = 21;

    const s = this.utf8Encode(text);
    x = this.convertToWordArray(s);

    a = 0x67452301;
    b = 0xefcdab89;
    c = 0x98badcfe;
    d = 0x10325476;

    for (k = 0; k < x.length; k += 16) {
      AA = a;
      BB = b;
      CC = c;
      DD = d;
      a = this.FF(a, b, c, d, x[k + 0], S11, 0xd76aa478);
      d = this.FF(d, a, b, c, x[k + 1], S12, 0xe8c7b756);
      c = this.FF(c, d, a, b, x[k + 2], S13, 0x242070db);
      b = this.FF(b, c, d, a, x[k + 3], S14, 0xc1bdceee);
      a = this.FF(a, b, c, d, x[k + 4], S11, 0xf57c0faf);
      d = this.FF(d, a, b, c, x[k + 5], S12, 0x4787c62a);
      c = this.FF(c, d, a, b, x[k + 6], S13, 0xa8304613);
      b = this.FF(b, c, d, a, x[k + 7], S14, 0xfd469501);
      a = this.FF(a, b, c, d, x[k + 8], S11, 0x698098d8);
      d = this.FF(d, a, b, c, x[k + 9], S12, 0x8b44f7af);
      c = this.FF(c, d, a, b, x[k + 10], S13, 0xffff5bb1);
      b = this.FF(b, c, d, a, x[k + 11], S14, 0x895cd7be);
      a = this.FF(a, b, c, d, x[k + 12], S11, 0x6b901122);
      d = this.FF(d, a, b, c, x[k + 13], S12, 0xfd987193);
      c = this.FF(c, d, a, b, x[k + 14], S13, 0xa679438e);
      b = this.FF(b, c, d, a, x[k + 15], S14, 0x49b40821);
      a = this.GG(a, b, c, d, x[k + 1], S21, 0xf61e2562);
      d = this.GG(d, a, b, c, x[k + 6], S22, 0xc040b340);
      c = this.GG(c, d, a, b, x[k + 11], S23, 0x265e5a51);
      b = this.GG(b, c, d, a, x[k + 0], S24, 0xe9b6c7aa);
      a = this.GG(a, b, c, d, x[k + 5], S21, 0xd62f105d);
      d = this.GG(d, a, b, c, x[k + 10], S22, 0x2441453);
      c = this.GG(c, d, a, b, x[k + 15], S23, 0xd8a1e681);
      b = this.GG(b, c, d, a, x[k + 4], S24, 0xe7d3fbc8);
      a = this.GG(a, b, c, d, x[k + 9], S21, 0x21e1cde6);
      d = this.GG(d, a, b, c, x[k + 14], S22, 0xc33707d6);
      c = this.GG(c, d, a, b, x[k + 3], S23, 0xf4d50d87);
      b = this.GG(b, c, d, a, x[k + 8], S24, 0x455a14ed);
      a = this.GG(a, b, c, d, x[k + 13], S21, 0xa9e3e905);
      d = this.GG(d, a, b, c, x[k + 2], S22, 0xfcefa3f8);
      c = this.GG(c, d, a, b, x[k + 7], S23, 0x676f02d9);
      b = this.GG(b, c, d, a, x[k + 12], S24, 0x8d2a4c8a);
      a = this.HH(a, b, c, d, x[k + 5], S31, 0xfffa3942);
      d = this.HH(d, a, b, c, x[k + 8], S32, 0x8771f681);
      c = this.HH(c, d, a, b, x[k + 11], S33, 0x6d9d6122);
      b = this.HH(b, c, d, a, x[k + 14], S34, 0xfde5380c);
      a = this.HH(a, b, c, d, x[k + 1], S31, 0xa4beea44);
      d = this.HH(d, a, b, c, x[k + 4], S32, 0x4bdecfa9);
      c = this.HH(c, d, a, b, x[k + 7], S33, 0xf6bb4b60);
      b = this.HH(b, c, d, a, x[k + 10], S34, 0xbebfbc70);
      a = this.HH(a, b, c, d, x[k + 13], S31, 0x289b7ec6);
      d = this.HH(d, a, b, c, x[k + 0], S32, 0xeaa127fa);
      c = this.HH(c, d, a, b, x[k + 3], S33, 0xd4ef3085);
      b = this.HH(b, c, d, a, x[k + 6], S34, 0x4881d05);
      a = this.HH(a, b, c, d, x[k + 9], S31, 0xd9d4d039);
      d = this.HH(d, a, b, c, x[k + 12], S32, 0xe6db99e5);
      c = this.HH(c, d, a, b, x[k + 15], S33, 0x1fa27cf8);
      b = this.HH(b, c, d, a, x[k + 2], S34, 0xc4ac5665);
      a = this.II(a, b, c, d, x[k + 0], S41, 0xf4292244);
      d = this.II(d, a, b, c, x[k + 7], S42, 0x432aff97);
      c = this.II(c, d, a, b, x[k + 14], S43, 0xab9423a7);
      b = this.II(b, c, d, a, x[k + 5], S44, 0xfc93a039);
      a = this.II(a, b, c, d, x[k + 12], S41, 0x655b59c3);
      d = this.II(d, a, b, c, x[k + 3], S42, 0x8f0ccc92);
      c = this.II(c, d, a, b, x[k + 10], S43, 0xffeff47d);
      b = this.II(b, c, d, a, x[k + 1], S44, 0x85845dd1);
      a = this.II(a, b, c, d, x[k + 8], S41, 0x6fa87e4f);
      d = this.II(d, a, b, c, x[k + 15], S42, 0xfe2ce6e0);
      c = this.II(c, d, a, b, x[k + 6], S43, 0xa3014314);
      b = this.II(b, c, d, a, x[k + 13], S44, 0x4e0811a1);
      a = this.II(a, b, c, d, x[k + 4], S41, 0xf7537e82);
      d = this.II(d, a, b, c, x[k + 11], S42, 0xbd3af235);
      c = this.II(c, d, a, b, x[k + 2], S43, 0x2ad7d2bb);
      b = this.II(b, c, d, a, x[k + 9], S44, 0xeb86d391);
      a = this.addUnsigned(a, AA);
      b = this.addUnsigned(b, BB);
      c = this.addUnsigned(c, CC);
      d = this.addUnsigned(d, DD);
    }

    const temp =
      this.wordToHex(a) +
      this.wordToHex(b) +
      this.wordToHex(c) +
      this.wordToHex(d);
    return temp.toLowerCase();
  }

  private rotateLeft(lValue: number, iShiftBits: number): number {
    return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
  }

  private addUnsigned(lX: number, lY: number): number {
    let lX4: number, lY4: number, lX8: number, lY8: number, lResult: number;
    lX8 = lX & 0x80000000;
    lY8 = lY & 0x80000000;
    lX4 = lX & 0x40000000;
    lY4 = lY & 0x40000000;
    lResult = (lX & 0x3fffffff) + (lY & 0x3fffffff);
    if (lX4 & lY4) {
      return lResult ^ 0x80000000 ^ lX8 ^ lY8;
    }
    if (lX4 | lY4) {
      if (lResult & 0x40000000) {
        return lResult ^ 0xc0000000 ^ lX8 ^ lY8;
      } else {
        return lResult ^ 0x40000000 ^ lX8 ^ lY8;
      }
    } else {
      return lResult ^ lX8 ^ lY8;
    }
  }

  private F(x: number, y: number, z: number): number {
    return (x & y) | (~x & z);
  }

  private G(x: number, y: number, z: number): number {
    return (x & z) | (y & ~z);
  }

  private H(x: number, y: number, z: number): number {
    return x ^ y ^ z;
  }

  private I(x: number, y: number, z: number): number {
    return y ^ (x | ~z);
  }

  private FF(
    a: number,
    b: number,
    c: number,
    d: number,
    x: number,
    s: number,
    ac: number
  ): number {
    a = this.addUnsigned(
      a,
      this.addUnsigned(this.addUnsigned(this.F(b, c, d), x), ac)
    );
    return this.addUnsigned(this.rotateLeft(a, s), b);
  }

  private GG(
    a: number,
    b: number,
    c: number,
    d: number,
    x: number,
    s: number,
    ac: number
  ): number {
    a = this.addUnsigned(
      a,
      this.addUnsigned(this.addUnsigned(this.G(b, c, d), x), ac)
    );
    return this.addUnsigned(this.rotateLeft(a, s), b);
  }

  private HH(
    a: number,
    b: number,
    c: number,
    d: number,
    x: number,
    s: number,
    ac: number
  ): number {
    a = this.addUnsigned(
      a,
      this.addUnsigned(this.addUnsigned(this.H(b, c, d), x), ac)
    );
    return this.addUnsigned(this.rotateLeft(a, s), b);
  }

  private II(
    a: number,
    b: number,
    c: number,
    d: number,
    x: number,
    s: number,
    ac: number
  ): number {
    a = this.addUnsigned(
      a,
      this.addUnsigned(this.addUnsigned(this.I(b, c, d), x), ac)
    );
    return this.addUnsigned(this.rotateLeft(a, s), b);
  }

  private convertToWordArray(s: string): number[] {
    let lWordCount: number;
    const lMessageLength = s.length;
    const lNumberOfWords_temp1 = lMessageLength + 8;
    const lNumberOfWords_temp2 =
      (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
    const lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
    const lWordArray = Array(lNumberOfWords - 1);
    let lBytePosition = 0;
    let lByteCount = 0;
    while (lByteCount < lMessageLength) {
      lWordCount = (lByteCount - (lByteCount % 4)) / 4;
      lBytePosition = (lByteCount % 4) * 8;
      lWordArray[lWordCount] =
        lWordArray[lWordCount] | (s.charCodeAt(lByteCount) << lBytePosition);
      lByteCount++;
    }
    lWordCount = (lByteCount - (lByteCount % 4)) / 4;
    lBytePosition = (lByteCount % 4) * 8;
    lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
    lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
    lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
    return lWordArray;
  }

  private wordToHex(lValue: number): string {
    let WordToHexValue = '',
      WordToHexValue_temp = '',
      lByte: number,
      lCount: number;
    for (lCount = 0; lCount <= 3; lCount++) {
      lByte = (lValue >>> (lCount * 8)) & 255;
      WordToHexValue_temp = '0' + lByte.toString(16);
      WordToHexValue =
        WordToHexValue +
        WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
    }
    return WordToHexValue;
  }

  private utf8Encode(s: string): string {
    s = s.replace(/\r\n/g, '\n');
    let utftext = '';

    for (let n = 0; n < s.length; n++) {
      const c = s.charCodeAt(n);

      if (c < 128) {
        utftext += String.fromCharCode(c);
      } else if (c > 127 && c < 2048) {
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      } else {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }
    }

    return utftext;
  }
}

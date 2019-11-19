import { TestBed } from '@angular/core/testing';
import { RomanNumber } from './roman-number';

describe('Class: RomanNumber', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('0 toRoman should be empty', () => {
    const r = RomanNumber.toRoman(0);
    expect(r).toBe('');
  });
  it('1 toRoman should be I', () => {
    const r = RomanNumber.toRoman(1);
    expect(r).toBe('I');
  });
  it('2 toRoman should be II', () => {
    const r = RomanNumber.toRoman(2);
    expect(r).toBe('II');
  });
  it('3 toRoman should be III', () => {
    const r = RomanNumber.toRoman(3);
    expect(r).toBe('III');
  });
  it('4 toRoman should be IV', () => {
    const r = RomanNumber.toRoman(4);
    expect(r).toBe('IV');
  });
  it('4 toRoman (ancient) should be IV', () => {
    const r = RomanNumber.toRoman(4, false, false, true);
    expect(r).toBe('IIII');
  });
  it('1 to 10 should be converted in both directions', () => {
    for (let i = 1; i <= 10; i++) {
      const r = RomanNumber.toRoman(i);
      const n = RomanNumber.fromRoman(r);
      expect(n).toBe(i);
    }
  });
  it('11 to 20 should be converted in both directions', () => {
    for (let i = 11; i <= 20; i++) {
      const r = RomanNumber.toRoman(i);
      const n = RomanNumber.fromRoman(r);
      expect(n).toBe(i);
    }
  });
  it('21 to 30 should be converted in both directions', () => {
    for (let i = 21; i <= 30; i++) {
      const r = RomanNumber.toRoman(i);
      const n = RomanNumber.fromRoman(r);
      expect(n).toBe(i);
    }
  });
  it('31 to 40 should be converted in both directions', () => {
    for (let i = 31; i <= 40; i++) {
      const r = RomanNumber.toRoman(i);
      const n = RomanNumber.fromRoman(r);
      expect(n).toBe(i);
    }
  });
  it('41 to 50 should be converted in both directions', () => {
    for (let i = 41; i <= 50; i++) {
      const r = RomanNumber.toRoman(i);
      const n = RomanNumber.fromRoman(r);
      expect(n).toBe(i);
    }
  });
  it('51 to 100 should be converted in both directions', () => {
    for (let i = 51; i <= 100; i++) {
      const r = RomanNumber.toRoman(i);
      const n = RomanNumber.fromRoman(r);
      expect(n).toBe(i);
    }
  });
  it('101 to 1000 should be converted in both directions', () => {
    for (let i = 101; i <= 1000; i++) {
      const r = RomanNumber.toRoman(i);
      const n = RomanNumber.fromRoman(r);
      expect(n).toBe(i);
    }
  });
});

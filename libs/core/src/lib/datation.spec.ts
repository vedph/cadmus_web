import { TestBed } from '@angular/core/testing';
import { Datation } from './datation';

describe('Class: HistoricalDate', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
    });
  });

  it('default Datation should be undefined', () => {
    const d = new Datation();
    expect(d.isUndefined);
  });

  it('getCentury from 480 BC should be -5', () => {
    const d = Datation.parse('480 BC');
    const c = d.getCentury();
    expect(c).toBe(-5);
  });
  it('getCentury from 31 AD should be 1', () => {
    const d = Datation.parse('31 AD');
    const c = d.getCentury();
    expect(c).toBe(1);
  });

  it('parse empty should be undefined', () => {
    const d = Datation.parse('');
    expect(d).toBeUndefined();
  });
  it('parse whitespaces should be undefined', () => {
    const d = Datation.parse('  ');
    expect(d).toBeUndefined();
  });
  it('parse "45" should get year', () => {
    const d = Datation.parse('45');
    expect(d.value).toBe(45);
    expect(d.isCentury).toBeFalsy();
    expect(d.isSpan).toBeFalsy();
    expect(d.isApproximate).toBeFalsy();
    expect(d.isDubious).toBeFalsy();
    expect(d.day).toBeFalsy();
    expect(d.month).toBeFalsy();
    expect(d.hint).toBeFalsy();
  });
  it('parse "c.45" should get approximate year', () => {
    const d = Datation.parse('c.45');
    expect(d.value).toBe(45);
    expect(d.isCentury).toBeFalsy();
    expect(d.isSpan).toBeFalsy();
    expect(d.isApproximate).toBeTruthy();
    expect(d.isDubious).toBeFalsy();
    expect(d.day).toBeFalsy();
    expect(d.month).toBeFalsy();
    expect(d.hint).toBeFalsy();
  });
  it('parse "45?" should get dubious year', () => {
    const d = Datation.parse('45?');
    expect(d.value).toBe(45);
    expect(d.isCentury).toBeFalsy();
    expect(d.isSpan).toBeFalsy();
    expect(d.isApproximate).toBeFalsy();
    expect(d.isDubious).toBeTruthy();
    expect(d.day).toBeFalsy();
    expect(d.month).toBeFalsy();
    expect(d.hint).toBeFalsy();
  });
  it('parse "c.45?" should get approximate and dubious year', () => {
    const d = Datation.parse('c.45?');
    expect(d.value).toBe(45);
    expect(d.isCentury).toBeFalsy();
    expect(d.isSpan).toBeFalsy();
    expect(d.isApproximate).toBeTruthy();
    expect(d.isDubious).toBeTruthy();
    expect(d.day).toBeFalsy();
    expect(d.month).toBeFalsy();
    expect(d.hint).toBeFalsy();
  });
  it('parse "45 {a hint here}" should get year with hint', () => {
    const d = Datation.parse('45 {a hint here}');
    expect(d.value).toBe(45);
    expect(d.isCentury).toBeFalsy();
    expect(d.isSpan).toBeFalsy();
    expect(d.isApproximate).toBeFalsy();
    expect(d.isDubious).toBeFalsy();
    expect(d.day).toBeFalsy();
    expect(d.month).toBeFalsy();
    expect(d.hint).toBe('a hint here');
  });
  it('parse "45 BC" should get negative year', () => {
    const d = Datation.parse('45 BC');
    expect(d.value).toBe(-45);
    expect(d.isCentury).toBeFalsy();
    expect(d.isSpan).toBeFalsy();
    expect(d.isApproximate).toBeFalsy();
    expect(d.isDubious).toBeFalsy();
    expect(d.day).toBeFalsy();
    expect(d.month).toBeFalsy();
    expect(d.hint).toBeFalsy();
  });
  it('parse "45 AD" should get positive year', () => {
    const d = Datation.parse('45 AD');
    expect(d.value).toBe(45);
    expect(d.isCentury).toBeFalsy();
    expect(d.isSpan).toBeFalsy();
    expect(d.isApproximate).toBeFalsy();
    expect(d.isDubious).toBeFalsy();
    expect(d.day).toBeFalsy();
    expect(d.month).toBeFalsy();
    expect(d.hint).toBeFalsy();
  });
  it('parse "45/44 BC" should be years span', () => {
    const d = Datation.parse('45/44 BC');
    expect(d).toBeTruthy();
    expect(d.value).toBe(-45);
    expect(d.isCentury).toBeFalsy();
    expect(d.isSpan).toBeTruthy();
  });
  it('parse "132/133 AD" should be years span', () => {
    const d = Datation.parse('132/133 AD');
    expect(d).toBeTruthy();
    expect(d.value).toBe(132);
    expect(d.isCentury).toBeFalsy();
    expect(d.isSpan).toBeTruthy();
  });
  it('parse "III" should be century', () => {
    const d = Datation.parse('III');
    expect(d).toBeTruthy();
    expect(d.value).toBe(3);
    expect(d.isCentury).toBeTruthy();
  });
  it('parse "III AD" should be positive century', () => {
    const d = Datation.parse('III AD');
    expect(d).toBeTruthy();
    expect(d.value).toBe(3);
    expect(d.isCentury).toBeTruthy();
  });
  it('parse "III BC" should be negative century', () => {
    const d = Datation.parse('III BC');
    expect(d).toBeTruthy();
    expect(d.value).toBe(-3);
    expect(d.isCentury).toBeTruthy();
  });
  it('parse "may 45" should be month and year', () => {
    const d = Datation.parse('may 45');
    expect(d).toBeTruthy();
    expect(d.value).toBe(45);
    expect(d.isCentury).toBeFalsy();
    expect(d.month).toBe(5);
  });
  it('parse "30 may 45" should be day, month and year', () => {
    const d = Datation.parse('30 may 45');
    expect(d).toBeTruthy();
    expect(d.value).toBe(45);
    expect(d.isCentury).toBeFalsy();
    expect(d.month).toBe(5);
    expect(d.day).toBe(30);
  });
  it('parse "c. 2 May 23/2 BC? {hint}" should be DMY with span, approx. and dub.', () => {
    const d = Datation.parse('c. 2 May 23/2 BC? {hint}');
    expect(d).toBeTruthy();
    expect(d.value).toBe(-23);
    expect(d.isCentury).toBeFalsy();
    expect(d.isApproximate).toBeTruthy();
    expect(d.month).toBe(5);
    expect(d.day).toBe(2);
    expect(d.isDubious).toBeTruthy();
    expect(d.hint).toBe('hint');
  });

  // toString
  it('toString() from 45 should be "45 AD"', () => {
    const d = new Datation();
    d.value = 45;
    const s = d.toString();
    expect(s).toBe('45 AD');
  });
  it('toString() from century=-4 should be "IV BC"', () => {
    const d = new Datation();
    d.value = -4;
    d.isCentury = true;
    const s = d.toString();
    expect(s).toBe('IV BC');
  });
  it('toString() from century=-4, about, dubious, hint should be OK', () => {
    const d = new Datation();
    d.value = -4;
    d.isCentury = true;
    d.isApproximate = true;
    d.isDubious = true;
    d.hint = 'hint';
    const s = d.toString();
    expect(s).toBe('c. IV BC ? {hint}');
  });

  // TODO: more tests
});

/* tslint:disable:no-unused-variable */

import { TestBed } from '@angular/core/testing';
import { HistoricalDate, HistoricalDateType } from './historical-date';

describe('Class: HistoricalDate', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('new date should have undefined A and no B', () => {
    const d = new HistoricalDate();
    expect(d.a).toBeTruthy();
    expect(d.b).toBeFalsy();
    expect(d.a.isUndefined).toBeTruthy();
  });
  it('parse empty should be null', () => {
    const d = HistoricalDate.parse('');
    expect(d).toBeNull();
  });
  it('parse "23 AD" should get A=year', () => {
    const d = HistoricalDate.parse('23 AD');
    expect(d).toBeTruthy();
    expect(d.getDateType()).toBe(HistoricalDateType.point);
    const a = d.a;
    expect(a.value).toBe(23);
    expect(a.isCentury).toBeFalsy();
    expect(a.isSpan).toBeFalsy();
    expect(a.isApproximate).toBeFalsy();
    expect(a.isDubious).toBeFalsy();
    expect(a.day).toBeFalsy();
    expect(a.month).toBeFalsy();
    expect(a.hint).toBeFalsy();
  });
  it('parse "c.23 AD" should get A=approx. year', () => {
    const d = HistoricalDate.parse('c.23 AD');
    expect(d).toBeTruthy();
    expect(d.getDateType()).toBe(HistoricalDateType.point);
    const a = d.a;
    expect(a.value).toBe(23);
    expect(a.isCentury).toBeFalsy();
    expect(a.isSpan).toBeFalsy();
    expect(a.isApproximate).toBeTruthy();
    expect(a.isDubious).toBeFalsy();
    expect(a.day).toBeFalsy();
    expect(a.month).toBeFalsy();
    expect(a.hint).toBeFalsy();
  });
  it('parse "c.23 AD?" should get A=approx. and dub. year', () => {
    const d = HistoricalDate.parse('c.23 AD?');
    expect(d).toBeTruthy();
    expect(d.getDateType()).toBe(HistoricalDateType.point);
    const a = d.a;
    expect(a.value).toBe(23);
    expect(a.isCentury).toBeFalsy();
    expect(a.isSpan).toBeFalsy();
    expect(a.isApproximate).toBeTruthy();
    expect(a.isDubious).toBeTruthy();
    expect(a.day).toBeFalsy();
    expect(a.month).toBeFalsy();
    expect(a.hint).toBeFalsy();
  });
  it('parse "c.12 may 23 AD" should get A=approx. DMY', () => {
    const d = HistoricalDate.parse('c.12 may 23 AD');
    expect(d).toBeTruthy();
    expect(d.getDateType()).toBe(HistoricalDateType.point);
    const a = d.a;
    expect(a.value).toBe(23);
    expect(a.isCentury).toBeFalsy();
    expect(a.isSpan).toBeFalsy();
    expect(a.isApproximate).toBeTruthy();
    expect(a.isDubious).toBeFalsy();
    expect(a.day).toBe(12);
    expect(a.month).toBe(5);
    expect(a.hint).toBeFalsy();
  });
  it('parse "c.12 may 23 BC?" should get A=approx. and dub. negative year', () => {
    const d = HistoricalDate.parse('c.12 may 23 BC?');
    expect(d).toBeTruthy();
    expect(d.getDateType()).toBe(HistoricalDateType.point);
    const a = d.a;
    expect(a.value).toBe(-23);
    expect(a.isCentury).toBeFalsy();
    expect(a.isSpan).toBeFalsy();
    expect(a.isApproximate).toBeTruthy();
    expect(a.isDubious).toBeTruthy();
    expect(a.day).toBe(12);
    expect(a.month).toBe(5);
    expect(a.hint).toBeFalsy();
  });
  it('parse "c.12 may 23/2 BC?" should get A=approx. and dub. negative span year', () => {
    const d = HistoricalDate.parse('c.12 may 23/2 BC?');
    expect(d).toBeTruthy();
    expect(d.getDateType()).toBe(HistoricalDateType.point);
    const a = d.a;
    expect(a.value).toBe(-23);
    expect(a.isCentury).toBeFalsy();
    expect(a.isSpan).toBeTruthy();
    expect(a.isApproximate).toBeTruthy();
    expect(a.isDubious).toBeTruthy();
    expect(a.day).toBe(12);
    expect(a.month).toBe(5);
    expect(a.hint).toBeFalsy();
  });
  it('parse "25 BC {marriage of Julia and Marcellus}" should get A=year with hint', () => {
    const d = HistoricalDate.parse('25 BC {marriage of Julia and Marcellus}');
    expect(d).toBeTruthy();
    expect(d.getDateType()).toBe(HistoricalDateType.point);
    const a = d.a;
    expect(a.value).toBe(-25);
    expect(a.isCentury).toBeFalsy();
    expect(a.isSpan).toBeFalsy();
    expect(a.isApproximate).toBeFalsy();
    expect(a.isDubious).toBeFalsy();
    expect(a.day).toBeFalsy();
    expect(a.month).toBeFalsy();
    expect(a.hint).toBe('marriage of Julia and Marcellus');
  });

  it('parse "123 AD -- 135 AD" should get A=123 and B=135', () => {
    const d = HistoricalDate.parse('123 AD -- 135 AD');
    expect(d).toBeTruthy();
    expect(d.getDateType()).toBe(HistoricalDateType.range);
    const a = d.a;
    expect(a.value).toBe(123);
    expect(a.isCentury).toBeFalsy();
    expect(a.isSpan).toBeFalsy();
    expect(a.isApproximate).toBeFalsy();
    expect(a.isDubious).toBeFalsy();
    expect(a.day).toBeFalsy();
    expect(a.month).toBeFalsy();
    expect(a.hint).toBeFalsy();
    const b = d.b;
    expect(b.value).toBe(135);
    expect(b.isCentury).toBeFalsy();
    expect(b.isSpan).toBeFalsy();
    expect(b.isApproximate).toBeFalsy();
    expect(b.isDubious).toBeFalsy();
    expect(b.day).toBeFalsy();
    expect(b.month).toBeFalsy();
    expect(b.hint).toBeFalsy();
  });

  // TODO: tests
});

import { TestBed } from '@angular/core/testing';
import { MspOperation, MspOperator } from './msp-operation';
import { TextRange } from './text-range';

describe('Class: MspOperation', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  // toString - del
  it('toString del 2x3 = "@2×3="', () => {
    const op = new MspOperation();
    op.operator = MspOperator.delete;
    op.rangeA = TextRange.parse('2x3');
    expect(op.toString()).toBe('@2×3=');
  });
  it('toString del 2x3 tag = "@2×3= [tag]"', () => {
    const op = new MspOperation();
    op.operator = MspOperator.delete;
    op.rangeA = TextRange.parse('2x3');
    op.tag = 'tag';
    expect(op.toString()).toBe('@2×3= [tag]');
  });
  it('toString del 2x3 note = "@2×3= {note}"', () => {
    const op = new MspOperation();
    op.operator = MspOperator.delete;
    op.rangeA = TextRange.parse('2x3');
    op.note = 'note';
    expect(op.toString()).toBe('@2×3= {note}');
  });
  it('toString del 2x3 tag note = "@2×3= [tag] {note}"', () => {
    const op = new MspOperation();
    op.operator = MspOperator.delete;
    op.rangeA = TextRange.parse('2x3');
    op.tag = 'tag';
    op.note = 'note';
    expect(op.toString()).toBe('@2×3= [tag] {note}');
  });

  // toString - del A
  it('toString del A 2x3 = ""A"@2×3="', () => {
    const op = new MspOperation();
    op.operator = MspOperator.delete;
    op.rangeA = TextRange.parse('2x3');
    op.valueA = 'old';
    expect(op.toString()).toBe('"old"@2×3=');
  });
  it('toString del A 2x3 tag = ""A"@2×3= [tag]"', () => {
    const op = new MspOperation();
    op.operator = MspOperator.delete;
    op.rangeA = TextRange.parse('2x3');
    op.valueA = 'old';
    op.tag = 'tag';
    expect(op.toString()).toBe('"old"@2×3= [tag]');
  });
  it('toString del A 2x3 note = ""A"@2×3= {note}"', () => {
    const op = new MspOperation();
    op.operator = MspOperator.delete;
    op.rangeA = TextRange.parse('2x3');
    op.valueA = 'old';
    op.note = 'note';
    expect(op.toString()).toBe('"old"@2×3= {note}');
  });
  it('toString del A 2x3 tag note = ""A"@2×3= [tag] {note}"', () => {
    const op = new MspOperation();
    op.operator = MspOperator.delete;
    op.rangeA = TextRange.parse('2x3');
    op.valueA = 'old';
    op.tag = 'tag';
    op.note = 'note';
    expect(op.toString()).toBe('"old"@2×3= [tag] {note}');
  });

  // toString - rep
  it('toString rep 2x3 = "@2×3=B"', () => {
    const op = new MspOperation();
    op.operator = MspOperator.replace;
    op.rangeA = TextRange.parse('2x3');
    op.valueB = 'new';
    expect(op.toString()).toBe('@2×3="new"');
  });
  it('toString rep 2x3 tag = "@2×3=B [tag]"', () => {
    const op = new MspOperation();
    op.operator = MspOperator.replace;
    op.rangeA = TextRange.parse('2x3');
    op.valueB = 'new';
    op.tag = 'tag';
    expect(op.toString()).toBe('@2×3="new" [tag]');
  });
  it('toString rep 2x3 note = "@2×3=B {note}"', () => {
    const op = new MspOperation();
    op.operator = MspOperator.replace;
    op.rangeA = TextRange.parse('2x3');
    op.valueB = 'new';
    op.note = 'note';
    expect(op.toString()).toBe('@2×3="new" {note}');
  });
  it('toString rep 2x3 tag note = "@2×3=B [tag] {note}"', () => {
    const op = new MspOperation();
    op.operator = MspOperator.replace;
    op.rangeA = TextRange.parse('2x3');
    op.valueB = 'new';
    op.tag = 'tag';
    op.note = 'note';
    expect(op.toString()).toBe('@2×3="new" [tag] {note}');
  });

  // toString - rep A
  it('toString rep A 2x3 = "A@2×3=B"', () => {
    const op = new MspOperation();
    op.operator = MspOperator.replace;
    op.rangeA = TextRange.parse('2x3');
    op.valueA = 'old';
    op.valueB = 'new';
    expect(op.toString()).toBe('"old"@2×3="new"');
  });
  it('toString rep A 2x3 tag = "A@2×3=B [tag]"', () => {
    const op = new MspOperation();
    op.operator = MspOperator.replace;
    op.rangeA = TextRange.parse('2x3');
    op.valueA = 'old';
    op.valueB = 'new';
    op.tag = 'tag';
    expect(op.toString()).toBe('"old"@2×3="new" [tag]');
  });
  it('toString rep A 2x3 note = "A@2×3=B {note}"', () => {
    const op = new MspOperation();
    op.operator = MspOperator.replace;
    op.rangeA = TextRange.parse('2x3');
    op.valueA = 'old';
    op.valueB = 'new';
    op.note = 'note';
    expect(op.toString()).toBe('"old"@2×3="new" {note}');
  });
  it('toString rep A 2x3 tag note = "A@2×3=B [tag] {note}"', () => {
    const op = new MspOperation();
    op.operator = MspOperator.replace;
    op.rangeA = TextRange.parse('2x3');
    op.valueA = 'old';
    op.valueB = 'new';
    op.tag = 'tag';
    op.note = 'note';
    expect(op.toString()).toBe('"old"@2×3="new" [tag] {note}');
  });

  // toString - ins
  it('toString ins B 2x0 = "@2×0=B"', () => {
    const op = new MspOperation();
    op.operator = MspOperator.insert;
    op.rangeA = TextRange.parse('2x0');
    op.valueB = 'new';
    expect(op.toString()).toBe('@2×0="new"');
  });
  it('toString ins B 2x0 tag = "@2×0=B [tag]"', () => {
    const op = new MspOperation();
    op.operator = MspOperator.insert;
    op.rangeA = TextRange.parse('2x0');
    op.valueB = 'new';
    op.tag = 'tag';
    expect(op.toString()).toBe('@2×0="new" [tag]');
  });
  it('toString ins B 2x0 note = "@2×0=B {note}"', () => {
    const op = new MspOperation();
    op.operator = MspOperator.insert;
    op.rangeA = TextRange.parse('2x0');
    op.valueB = 'new';
    op.note = 'note';
    expect(op.toString()).toBe('@2×0="new" {note}');
  });
  it('toString ins B 2x0 tag note = "@2×0=B [tag] {note}"', () => {
    const op = new MspOperation();
    op.operator = MspOperator.insert;
    op.rangeA = TextRange.parse('2x0');
    op.valueB = 'new';
    op.tag = 'tag';
    op.note = 'note';
    expect(op.toString()).toBe('@2×0="new" [tag] {note}');
  });

  // toString - move
  it('toString mov 2x3 6x0 = "@2×3>@6×0"', () => {
    const op = new MspOperation();
    op.operator = MspOperator.move;
    op.rangeA = TextRange.parse('2x3');
    op.rangeB = TextRange.parse('6x0');
    expect(op.toString()).toBe('@2×3>@6×0');
  });
  it('toString mov 2x3 6x0 tag = "@2×3>@6×0 [tag]"', () => {
    const op = new MspOperation();
    op.operator = MspOperator.move;
    op.rangeA = TextRange.parse('2x3');
    op.rangeB = TextRange.parse('6x0');
    op.tag = 'tag';
    expect(op.toString()).toBe('@2×3>@6×0 [tag]');
  });
  it('toString mov 2x3 6x0 note = "@2×3>@6×0 {note}"', () => {
    const op = new MspOperation();
    op.operator = MspOperator.move;
    op.rangeA = TextRange.parse('2x3');
    op.rangeB = TextRange.parse('6x0');
    op.note = 'note';
    expect(op.toString()).toBe('@2×3>@6×0 {note}');
  });
  it('toString mov 2x3 6x0 tag note = "@2×3>@6×0 [tag] {note}"', () => {
    const op = new MspOperation();
    op.operator = MspOperator.move;
    op.rangeA = TextRange.parse('2x3');
    op.rangeB = TextRange.parse('6x0');
    op.tag = 'tag';
    op.note = 'note';
    expect(op.toString()).toBe('@2×3>@6×0 [tag] {note}');
  });

  // toString - move A
  it('toString mov A 2x3 6x0 = "A@2×3>@6×0"', () => {
    const op = new MspOperation();
    op.operator = MspOperator.move;
    op.rangeA = TextRange.parse('2x3');
    op.rangeB = TextRange.parse('6x0');
    op.valueA = 'old';
    expect(op.toString()).toBe('"old"@2×3>@6×0');
  });
  it('toString mov A 2x3 6x0 tag = "A@2×3>@6×0 [tag]"', () => {
    const op = new MspOperation();
    op.operator = MspOperator.move;
    op.rangeA = TextRange.parse('2x3');
    op.rangeB = TextRange.parse('6x0');
    op.valueA = 'old';
    op.tag = 'tag';
    expect(op.toString()).toBe('"old"@2×3>@6×0 [tag]');
  });
  it('toString mov A 2x3 6x0 note = "A@2×3>@6×0 {note}"', () => {
    const op = new MspOperation();
    op.operator = MspOperator.move;
    op.rangeA = TextRange.parse('2x3');
    op.rangeB = TextRange.parse('6x0');
    op.valueA = 'old';
    op.note = 'note';
    expect(op.toString()).toBe('"old"@2×3>@6×0 {note}');
  });
  it('toString mov A 2x3 6x0 tag note = "A@2×3>@6×0 [tag] {note}"', () => {
    const op = new MspOperation();
    op.operator = MspOperator.move;
    op.rangeA = TextRange.parse('2x3');
    op.rangeB = TextRange.parse('6x0');
    op.valueA = 'old';
    op.tag = 'tag';
    op.note = 'note';
    expect(op.toString()).toBe('"old"@2×3>@6×0 [tag] {note}');
  });

  // toString - swap
  it('toString swp 2x3 6x3 = "@2×3~@6×3"', () => {
    const op = new MspOperation();
    op.operator = MspOperator.swap;
    op.rangeA = TextRange.parse('2x3');
    op.rangeB = TextRange.parse('6x3');
    expect(op.toString()).toBe('@2×3~@6×3');
  });
  it('toString swp 2x3 6x3 tag = "@2×3~@6×3 [tag]"', () => {
    const op = new MspOperation();
    op.operator = MspOperator.swap;
    op.rangeA = TextRange.parse('2x3');
    op.rangeB = TextRange.parse('6x3');
    op.tag = 'tag';
    expect(op.toString()).toBe('@2×3~@6×3 [tag]');
  });
  it('toString swp 2x3 6x3 note = "@2×3~@6×3 {note}"', () => {
    const op = new MspOperation();
    op.operator = MspOperator.swap;
    op.rangeA = TextRange.parse('2x3');
    op.rangeB = TextRange.parse('6x3');
    op.note = 'note';
    expect(op.toString()).toBe('@2×3~@6×3 {note}');
  });
  it('toString swp 2x3 6x3 tag note = "@2×3~@6×3 [tag] {note}"', () => {
    const op = new MspOperation();
    op.operator = MspOperator.swap;
    op.rangeA = TextRange.parse('2x3');
    op.rangeB = TextRange.parse('6x3');
    op.tag = 'tag';
    op.note = 'note';
    expect(op.toString()).toBe('@2×3~@6×3 [tag] {note}');
  });

  // toString - swap AB
  it('toString swp AB 2x3 6x3 = "A@2×3~B@6×3"', () => {
    const op = new MspOperation();
    op.operator = MspOperator.swap;
    op.rangeA = TextRange.parse('2x3');
    op.rangeB = TextRange.parse('6x3');
    op.valueA = 'old';
    op.valueB = 'new';
    expect(op.toString()).toBe('"old"@2×3~"new"@6×3');
  });
  it('toString swp AB 2x3 6x3 tag = "A@2×3~B@6×3 [tag]"', () => {
    const op = new MspOperation();
    op.operator = MspOperator.swap;
    op.rangeA = TextRange.parse('2x3');
    op.rangeB = TextRange.parse('6x3');
    op.valueA = 'old';
    op.valueB = 'new';
    op.tag = 'tag';
    expect(op.toString()).toBe('"old"@2×3~"new"@6×3 [tag]');
  });
  it('toString swp AB 2x3 6x3 note = "A@2×3~B@6×3 {note}"', () => {
    const op = new MspOperation();
    op.operator = MspOperator.swap;
    op.rangeA = TextRange.parse('2x3');
    op.rangeB = TextRange.parse('6x3');
    op.valueA = 'old';
    op.valueB = 'new';
    op.note = 'note';
    expect(op.toString()).toBe('"old"@2×3~"new"@6×3 {note}');
  });
  it('toString swp AB 2x3 6x3 tag note = "A@2×3~B@6×3 [tag] {note}"', () => {
    const op = new MspOperation();
    op.operator = MspOperator.swap;
    op.rangeA = TextRange.parse('2x3');
    op.rangeB = TextRange.parse('6x3');
    op.valueA = 'old';
    op.valueB = 'new';
    op.tag = 'tag';
    op.note = 'note';
    expect(op.toString()).toBe('"old"@2×3~"new"@6×3 [tag] {note}');
  });

  // parse
  it('parse null should be null', () => {
    const op = MspOperation.parse(null);
    expect(op).toBeNull();
  });
  it('parse empty should be null', () => {
    const op = MspOperation.parse('');
    expect(op).toBeNull();
  });
  it('parse whitespaces should be null', () => {
    const op = MspOperation.parse('  \n  ');
    expect(op).toBeNull();
  });

  // parse del
  it('parse "@2x1=" should be del', () => {
    const op = MspOperation.parse('@2x1=');
    expect(op).toBeTruthy();
    expect(op.operator).toBe(MspOperator.delete);
    expect(op.rangeA.toString()).toBe('2');
    expect(op.rangeB).toBeFalsy();
    expect(op.valueA).toBeFalsy();
    expect(op.valueB).toBeFalsy();
    expect(op.tag).toBeFalsy();
    expect(op.note).toBeFalsy();
  });
  it('parse "@2x1= [tag]" should be del tag', () => {
    const op = MspOperation.parse('@2x1= [tag]');
    expect(op).toBeTruthy();
    expect(op.operator).toBe(MspOperator.delete);
    expect(op.rangeA.toString()).toBe('2');
    expect(op.rangeB).toBeFalsy();
    expect(op.valueA).toBeFalsy();
    expect(op.valueB).toBeFalsy();
    expect(op.tag).toBe('tag');
    expect(op.note).toBeFalsy();
  });
  it('parse "@2x1= {note}" should be del note', () => {
    const op = MspOperation.parse('@2x1= {note}');
    expect(op).toBeTruthy();
    expect(op.operator).toBe(MspOperator.delete);
    expect(op.rangeA.toString()).toBe('2');
    expect(op.rangeB).toBeFalsy();
    expect(op.valueA).toBeFalsy();
    expect(op.valueB).toBeFalsy();
    expect(op.tag).toBeFalsy();
    expect(op.note).toBe('note');
  });
  it('parse "@2x1= [tag] {note}" should be del tag note', () => {
    const op = MspOperation.parse('@2x1= [tag] {note}');
    expect(op).toBeTruthy();
    expect(op.operator).toBe(MspOperator.delete);
    expect(op.rangeA.toString()).toBe('2');
    expect(op.rangeB).toBeFalsy();
    expect(op.valueA).toBeFalsy();
    expect(op.valueB).toBeFalsy();
    expect(op.tag).toBe('tag');
    expect(op.note).toBe('note');
  });

  // parse del B=""
  it('parse "@2x1=""" should be del', () => {
    const op = MspOperation.parse('@2x1=""');
    expect(op).toBeTruthy();
    expect(op.operator).toBe(MspOperator.delete);
    expect(op.rangeA.toString()).toBe('2');
    expect(op.rangeB).toBeFalsy();
    expect(op.valueA).toBeFalsy();
    expect(op.valueB).toBeFalsy();
    expect(op.tag).toBeFalsy();
    expect(op.note).toBeFalsy();
  });
  it('parse "@2x1="" [tag]" should be del tag', () => {
    const op = MspOperation.parse('@2x1="" [tag]');
    expect(op).toBeTruthy();
    expect(op.operator).toBe(MspOperator.delete);
    expect(op.rangeA.toString()).toBe('2');
    expect(op.rangeB).toBeFalsy();
    expect(op.valueA).toBeFalsy();
    expect(op.valueB).toBeFalsy();
    expect(op.tag).toBe('tag');
    expect(op.note).toBeFalsy();
  });
  it('parse "@2x1="" {note}" should be del note', () => {
    const op = MspOperation.parse('@2x1="" {note}');
    expect(op).toBeTruthy();
    expect(op.operator).toBe(MspOperator.delete);
    expect(op.rangeA.toString()).toBe('2');
    expect(op.rangeB).toBeFalsy();
    expect(op.valueA).toBeFalsy();
    expect(op.valueB).toBeFalsy();
    expect(op.tag).toBeFalsy();
    expect(op.note).toBe('note');
  });
  it('parse "@2x1="" [tag] {note}" should be del tag note', () => {
    const op = MspOperation.parse('@2x1="" [tag] {note}');
    expect(op).toBeTruthy();
    expect(op.operator).toBe(MspOperator.delete);
    expect(op.rangeA.toString()).toBe('2');
    expect(op.rangeB).toBeFalsy();
    expect(op.valueA).toBeFalsy();
    expect(op.valueB).toBeFalsy();
    expect(op.tag).toBe('tag');
    expect(op.note).toBe('note');
  });

  // parse del A
  it('parse "A@2x1=" should be del', () => {
    const op = MspOperation.parse('"a"@2x1=');
    expect(op).toBeTruthy();
    expect(op.operator).toBe(MspOperator.delete);
    expect(op.rangeA.toString()).toBe('2');
    expect(op.rangeB).toBeFalsy();
    expect(op.valueA).toBe('a');
    expect(op.valueB).toBeFalsy();
    expect(op.tag).toBeFalsy();
    expect(op.note).toBeFalsy();
  });
  it('parse "A@2x1= [tag]" should be del tag', () => {
    const op = MspOperation.parse('"a"@2x1= [tag]');
    expect(op).toBeTruthy();
    expect(op.operator).toBe(MspOperator.delete);
    expect(op.rangeA.toString()).toBe('2');
    expect(op.rangeB).toBeFalsy();
    expect(op.valueA).toBe('a');
    expect(op.valueB).toBeFalsy();
    expect(op.tag).toBe('tag');
    expect(op.note).toBeFalsy();
  });
  it('parse "A@2x1= {note}" should be del note', () => {
    const op = MspOperation.parse('"a"@2x1= {note}');
    expect(op).toBeTruthy();
    expect(op.operator).toBe(MspOperator.delete);
    expect(op.rangeA.toString()).toBe('2');
    expect(op.rangeB).toBeFalsy();
    expect(op.valueA).toBe('a');
    expect(op.valueB).toBeFalsy();
    expect(op.tag).toBeFalsy();
    expect(op.note).toBe('note');
  });
  it('parse "A@2x1= [tag] {note}" should be del tag note', () => {
    const op = MspOperation.parse('"a"@2x1=');
    expect(op).toBeTruthy();
    expect(op.operator).toBe(MspOperator.delete);
    expect(op.rangeA.toString()).toBe('2');
    expect(op.rangeB).toBeFalsy();
    expect(op.valueA).toBe('a');
    expect(op.valueB).toBeFalsy();
    expect(op.tag).toBe('tag');
    expect(op.note).toBe('note');
  });

  // parse ins
  it('parse "@2x0="s"" should be ins', () => {
    const op = MspOperation.parse('@2x0="s"');
    expect(op).toBeTruthy();
    expect(op.operator).toBe(MspOperator.insert);
    expect(op.rangeA.toString()).toBe('2×0');
    expect(op.rangeB).toBeFalsy();
    expect(op.valueA).toBeFalsy();
    expect(op.valueB).toBe('s');
    expect(op.tag).toBeFalsy();
    expect(op.note).toBeFalsy();
  });
  it('parse "@2x0="s" [tag]" should be ins tag', () => {
    const op = MspOperation.parse('@2x0="s" [tag]');
    expect(op).toBeTruthy();
    expect(op.operator).toBe(MspOperator.insert);
    expect(op.rangeA.toString()).toBe('2×0');
    expect(op.rangeB).toBeFalsy();
    expect(op.valueA).toBeFalsy();
    expect(op.valueB).toBe('s');
    expect(op.tag).toBe('tag');
    expect(op.note).toBeFalsy();
  });
  it('parse "@2x0="s" {note}" should be ins note', () => {
    const op = MspOperation.parse('@2x0="s" {note}');
    expect(op).toBeTruthy();
    expect(op.operator).toBe(MspOperator.insert);
    expect(op.rangeA.toString()).toBe('2×0');
    expect(op.rangeB).toBeFalsy();
    expect(op.valueA).toBeFalsy();
    expect(op.valueB).toBe('s');
    expect(op.tag).toBeFalsy();
    expect(op.note).toBe('note');
  });
  it('parse "@2x0="s" [tag] {note}" should be ins tag note', () => {
    const op = MspOperation.parse('@2x0="s"');
    expect(op).toBeTruthy();
    expect(op.operator).toBe(MspOperator.insert);
    expect(op.rangeA.toString()).toBe('2×0');
    expect(op.rangeB).toBeFalsy();
    expect(op.valueA).toBeFalsy();
    expect(op.valueB).toBe('s');
    expect(op.tag).toBe('tag');
    expect(op.note).toBe('note');
  });

  // parse rep
  it('parse "@2x1="b"" should be rep', () => {
    const op = MspOperation.parse('@2x1="b"');
    expect(op).toBeTruthy();
    expect(op.operator).toBe(MspOperator.replace);
    expect(op.rangeA.toString()).toBe('2');
    expect(op.rangeB).toBeFalsy();
    expect(op.valueA).toBeFalsy();
    expect(op.valueB).toBe('b');
    expect(op.tag).toBeFalsy();
    expect(op.note).toBeFalsy();
  });
  it('parse "@2x1="b" [tag]" should be rep tag', () => {
    const op = MspOperation.parse('@2x1="b" [tag]');
    expect(op).toBeTruthy();
    expect(op.operator).toBe(MspOperator.replace);
    expect(op.rangeA.toString()).toBe('2');
    expect(op.rangeB).toBeFalsy();
    expect(op.valueA).toBeFalsy();
    expect(op.valueB).toBe('b');
    expect(op.tag).toBe('tag');
    expect(op.note).toBeFalsy();
  });
  it('parse "@2x1="b" {note}" should be rep note', () => {
    const op = MspOperation.parse('@2x1="b" {note}');
    expect(op).toBeTruthy();
    expect(op.operator).toBe(MspOperator.replace);
    expect(op.rangeA.toString()).toBe('2');
    expect(op.rangeB).toBeFalsy();
    expect(op.valueA).toBeFalsy();
    expect(op.valueB).toBe('b');
    expect(op.tag).toBeFalsy();
    expect(op.note).toBe('note');
  });
  it('parse "@2x1="b" [tag] {note}" should be rep tag note', () => {
    const op = MspOperation.parse('@2x1="b" [tag] {note}');
    expect(op).toBeTruthy();
    expect(op.operator).toBe(MspOperator.replace);
    expect(op.rangeA.toString()).toBe('2');
    expect(op.rangeB).toBeFalsy();
    expect(op.valueA).toBeFalsy();
    expect(op.valueB).toBe('b');
    expect(op.tag).toBe('tag');
    expect(op.note).toBe('note');
  });

  // parse rep A
  it('parse "A@2x1="b"" should be rep', () => {
    const op = MspOperation.parse('"a"@2x1="b"');
    expect(op).toBeTruthy();
    expect(op.operator).toBe(MspOperator.replace);
    expect(op.rangeA.toString()).toBe('2');
    expect(op.rangeB).toBeFalsy();
    expect(op.valueA).toBe('a');
    expect(op.valueB).toBe('b');
    expect(op.tag).toBeFalsy();
    expect(op.note).toBeFalsy();
  });
  it('parse "A@2x1="b" [tag]" should be rep tag', () => {
    const op = MspOperation.parse('"a"@2x1="b" [tag]');
    expect(op).toBeTruthy();
    expect(op.operator).toBe(MspOperator.replace);
    expect(op.rangeA.toString()).toBe('2');
    expect(op.rangeB).toBeFalsy();
    expect(op.valueA).toBe('a');
    expect(op.valueB).toBe('b');
    expect(op.tag).toBe('tag');
    expect(op.note).toBeFalsy();
  });
  it('parse "A@2x1="b" {note}" should be rep note', () => {
    const op = MspOperation.parse('"a"@2x1="b" {note}');
    expect(op).toBeTruthy();
    expect(op.operator).toBe(MspOperator.replace);
    expect(op.rangeA.toString()).toBe('2');
    expect(op.rangeB).toBeFalsy();
    expect(op.valueA).toBe('a');
    expect(op.valueB).toBe('b');
    expect(op.tag).toBeFalsy();
    expect(op.note).toBe('note');
  });
  it('parse "A@2x1="b" [tag] {note}" should be rep tag note', () => {
    const op = MspOperation.parse('"a"@2x1="b" [tag] {note}');
    expect(op).toBeTruthy();
    expect(op.operator).toBe(MspOperator.replace);
    expect(op.rangeA.toString()).toBe('2');
    expect(op.rangeB).toBeFalsy();
    expect(op.valueA).toBe('a');
    expect(op.valueB).toBe('b');
    expect(op.tag).toBe('tag');
    expect(op.note).toBe('note');
  });

  // parse mov
  it('parse "@2x1>@4" should be mov', () => {
    const op = MspOperation.parse('@2x1>@4');
    expect(op).toBeTruthy();
    expect(op.operator).toBe(MspOperator.move);
    expect(op.rangeA.toString()).toBe('2');
    expect(op.rangeB.toString()).toBe('4×0');
    expect(op.valueA).toBeFalsy();
    expect(op.valueB).toBeFalsy();
    expect(op.tag).toBeFalsy();
    expect(op.note).toBeFalsy();
  });
  it('parse "@2x1>@4 [tag]" should be mov tag', () => {
    const op = MspOperation.parse('@2x1>@4 [tag]');
    expect(op).toBeTruthy();
    expect(op.operator).toBe(MspOperator.move);
    expect(op.rangeA.toString()).toBe('2');
    expect(op.rangeB.toString()).toBe('4×0');
    expect(op.valueA).toBeFalsy();
    expect(op.valueB).toBeFalsy();
    expect(op.tag).toBe('tag');
    expect(op.note).toBeFalsy();
  });
  it('parse "@2x1>@4 {note}" should be mov note', () => {
    const op = MspOperation.parse('@2x1>@4 {note}');
    expect(op).toBeTruthy();
    expect(op.operator).toBe(MspOperator.move);
    expect(op.rangeA.toString()).toBe('2');
    expect(op.rangeB.toString()).toBe('4×0');
    expect(op.valueA).toBeFalsy();
    expect(op.valueB).toBeFalsy();
    expect(op.tag).toBeFalsy();
    expect(op.note).toBe('note');
  });
  it('parse "@2x1>@4 [tag] {note}" should be mov tag note', () => {
    const op = MspOperation.parse('@2x1>@4');
    expect(op).toBeTruthy();
    expect(op.operator).toBe(MspOperator.move);
    expect(op.rangeA.toString()).toBe('2');
    expect(op.rangeB.toString()).toBe('4×0');
    expect(op.valueA).toBeFalsy();
    expect(op.valueB).toBeFalsy();
    expect(op.tag).toBe('tag');
    expect(op.note).toBe('note');
  });

  // parse mov A
  it('parse "A@2x1>@4" should be mov', () => {
    const op = MspOperation.parse('"a"@2x1>@4');
    expect(op).toBeTruthy();
    expect(op.operator).toBe(MspOperator.move);
    expect(op.rangeA.toString()).toBe('2');
    expect(op.rangeB.toString()).toBe('4×0');
    expect(op.valueA).toBe('a');
    expect(op.valueB).toBeFalsy();
    expect(op.tag).toBeFalsy();
    expect(op.note).toBeFalsy();
  });
  it('parse "A@2x1>@4 [tag]" should be mov tag', () => {
    const op = MspOperation.parse('"a"@2x1>@4 [tag]');
    expect(op).toBeTruthy();
    expect(op.operator).toBe(MspOperator.move);
    expect(op.rangeA.toString()).toBe('2');
    expect(op.rangeB.toString()).toBe('4×0');
    expect(op.valueA).toBe('a');
    expect(op.valueB).toBeFalsy();
    expect(op.tag).toBe('tag');
    expect(op.note).toBeFalsy();
  });
  it('parse "A@2x1>@4 {note}" should be mov note', () => {
    const op = MspOperation.parse('"a"@2x1>@4 {note}');
    expect(op).toBeTruthy();
    expect(op.operator).toBe(MspOperator.move);
    expect(op.rangeA.toString()).toBe('2');
    expect(op.rangeB.toString()).toBe('4×0');
    expect(op.valueA).toBe('a');
    expect(op.valueB).toBeFalsy();
    expect(op.tag).toBeFalsy();
    expect(op.note).toBe('note');
  });
  it('parse "A@2x1>@4 [tag] {note}" should be mov tag note', () => {
    const op = MspOperation.parse('"a"@2x1>@4');
    expect(op).toBeTruthy();
    expect(op.operator).toBe(MspOperator.move);
    expect(op.rangeA.toString()).toBe('2');
    expect(op.rangeB.toString()).toBe('4×0');
    expect(op.valueA).toBe('a');
    expect(op.valueB).toBeFalsy();
    expect(op.tag).toBe('tag');
    expect(op.note).toBe('note');
  });

  // parse swp
  it('parse "@2x1~@4x1" should be swp', () => {
    const op = MspOperation.parse('@2x1~@4x1');
    expect(op).toBeTruthy();
    expect(op.operator).toBe(MspOperator.swap);
    expect(op.rangeA.toString()).toBe('2');
    expect(op.rangeB.toString()).toBe('4');
    expect(op.valueA).toBeFalsy();
    expect(op.valueB).toBeFalsy();
    expect(op.tag).toBeFalsy();
    expect(op.note).toBeFalsy();
  });
  it('parse "@2x1~@4x1 [tag]" should be swp tag', () => {
    const op = MspOperation.parse('@2x1~@4x1 [tag]');
    expect(op).toBeTruthy();
    expect(op.operator).toBe(MspOperator.swap);
    expect(op.rangeA.toString()).toBe('2');
    expect(op.rangeB.toString()).toBe('4');
    expect(op.valueA).toBeFalsy();
    expect(op.valueB).toBeFalsy();
    expect(op.tag).toBe('tag');
    expect(op.note).toBeFalsy();
  });
  it('parse "@2x1~@4x1 {note}" should be swp note', () => {
    const op = MspOperation.parse('@2x1~@4x1 {note}');
    expect(op).toBeTruthy();
    expect(op.operator).toBe(MspOperator.swap);
    expect(op.rangeA.toString()).toBe('2');
    expect(op.rangeB.toString()).toBe('4');
    expect(op.valueA).toBeFalsy();
    expect(op.valueB).toBeFalsy();
    expect(op.tag).toBeFalsy();
    expect(op.note).toBe('note');
  });
  it('parse "@2x1~@4x1 [tag] {note}" should be swp tag note', () => {
    const op = MspOperation.parse('@2x1~@4x1 [tag] {note}');
    expect(op).toBeTruthy();
    expect(op.operator).toBe(MspOperator.swap);
    expect(op.rangeA.toString()).toBe('2');
    expect(op.rangeB.toString()).toBe('4');
    expect(op.valueA).toBeFalsy();
    expect(op.valueB).toBeFalsy();
    expect(op.tag).toBe('tag');
    expect(op.note).toBe('note');
  });

  // parse swp AB
  it('parse "A@2x1~B@4x1" should be swp', () => {
    const op = MspOperation.parse('"a"@2x1~"b"@4x1');
    expect(op).toBeTruthy();
    expect(op.operator).toBe(MspOperator.swap);
    expect(op.rangeA.toString()).toBe('2');
    expect(op.rangeB.toString()).toBe('4');
    expect(op.valueA).toBe('a');
    expect(op.valueB).toBe('b');
    expect(op.tag).toBeFalsy();
    expect(op.note).toBeFalsy();
  });
  it('parse "A@2x1~B@4x1 [tag]" should be swp tag', () => {
    const op = MspOperation.parse('"a"@2x1~"b"@4x1 [tag]');
    expect(op).toBeTruthy();
    expect(op.operator).toBe(MspOperator.swap);
    expect(op.rangeA.toString()).toBe('2');
    expect(op.rangeB.toString()).toBe('4');
    expect(op.valueA).toBe('a');
    expect(op.valueB).toBe('b');
    expect(op.tag).toBe('tag');
    expect(op.note).toBeFalsy();
  });
  it('parse "A@2x1~B@4x1 {note}" should be swp note', () => {
    const op = MspOperation.parse('"a"@2x1~"b"@4x1 {note}');
    expect(op).toBeTruthy();
    expect(op.operator).toBe(MspOperator.swap);
    expect(op.rangeA.toString()).toBe('2');
    expect(op.rangeB.toString()).toBe('4');
    expect(op.valueA).toBe('a');
    expect(op.valueB).toBe('b');
    expect(op.tag).toBeFalsy();
    expect(op.note).toBe('note');
  });
  it('parse "A@2x1~B@4x1 [tag] {note}" should be swp tag note', () => {
    const op = MspOperation.parse('"a"@2x1~"b"@4x1 [tag] {note}');
    expect(op).toBeTruthy();
    expect(op.operator).toBe(MspOperator.swap);
    expect(op.rangeA.toString()).toBe('2');
    expect(op.rangeB.toString()).toBe('4');
    expect(op.valueA).toBe('a');
    expect(op.valueB).toBe('b');
    expect(op.tag).toBe('tag');
    expect(op.note).toBe('note');
  });
});

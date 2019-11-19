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
    op.valueA = "old";
    expect(op.toString()).toBe('"old"@2×3=');
  });
  it('toString del A 2x3 tag = ""A"@2×3= [tag]"', () => {
    const op = new MspOperation();
    op.operator = MspOperator.delete;
    op.rangeA = TextRange.parse('2x3');
    op.valueA = "old";
    op.tag = 'tag';
    expect(op.toString()).toBe('"old"@2×3= [tag]');
  });
  it('toString del A 2x3 note = ""A"@2×3= {note}"', () => {
    const op = new MspOperation();
    op.operator = MspOperator.delete;
    op.rangeA = TextRange.parse('2x3');
    op.valueA = "old";
    op.note = 'note';
    expect(op.toString()).toBe('"old"@2×3= {note}');
  });
  it('toString del A 2x3 tag note = ""A"@2×3= [tag] {note}"', () => {
    const op = new MspOperation();
    op.operator = MspOperator.delete;
    op.rangeA = TextRange.parse('2x3');
    op.valueA = "old";
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
    expect(op.toString()).toBe('"old"A@2×3="new" [tag]');
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

  // TODO: other tests
});

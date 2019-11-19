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
  it('toString rep tag 2x3 = "@2×3=B [tag]"', () => {
    const op = new MspOperation();
    op.operator = MspOperator.replace;
    op.rangeA = TextRange.parse('2x3');
    op.valueB = 'new';
    op.tag = 'tag';
    expect(op.toString()).toBe('@2×3="new" [tag]');
  });
  it('toString rep note 2x3 = "@2×3=B {note}"', () => {
    const op = new MspOperation();
    op.operator = MspOperator.replace;
    op.rangeA = TextRange.parse('2x3');
    op.valueB = 'new';
    op.note = 'note';
    expect(op.toString()).toBe('@2×3="new" {note}');
  });
  it('toString rep tag note 2x3 = "@2×3=B [tag] {note}"', () => {
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
  it('toString rep A tag 2x3 = "A@2×3=B [tag]"', () => {
    const op = new MspOperation();
    op.operator = MspOperator.replace;
    op.rangeA = TextRange.parse('2x3');
    op.valueA = 'old';
    op.valueB = 'new';
    op.tag = 'tag';
    expect(op.toString()).toBe('"old"A@2×3="new" [tag]');
  });
  it('toString rep A note 2x3 = "A@2×3=B {note}"', () => {
    const op = new MspOperation();
    op.operator = MspOperator.replace;
    op.rangeA = TextRange.parse('2x3');
    op.valueA = 'old';
    op.valueB = 'new';
    op.note = 'note';
    expect(op.toString()).toBe('"old"@2×3="new" {note}');
  });
  it('toString rep A tag note 2x3 = "A@2×3=B [tag] {note}"', () => {
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
  it('toString ins B tag 2x0 = "@2×0=B [tag]"', () => {
    const op = new MspOperation();
    op.operator = MspOperator.insert;
    op.rangeA = TextRange.parse('2x0');
    op.valueB = 'new';
    op.tag = 'tag';
    expect(op.toString()).toBe('@2×0="new" [tag]');
  });
  it('toString ins B note 2x0 = "@2×0=B {note}"', () => {
    const op = new MspOperation();
    op.operator = MspOperator.insert;
    op.rangeA = TextRange.parse('2x0');
    op.valueB = 'new';
    op.note = 'note';
    expect(op.toString()).toBe('@2×0="new" {note}');
  });
  it('toString ins B tag note 2x0 = "@2×0=B [tag] {note}"', () => {
    const op = new MspOperation();
    op.operator = MspOperator.insert;
    op.rangeA = TextRange.parse('2x0');
    op.valueB = 'new';
    expect(op.toString()).toBe('@2×0="new" [tag] {note}');
  });

  // TODO: other tests
});

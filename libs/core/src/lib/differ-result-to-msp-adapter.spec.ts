import { TestBed } from '@angular/core/testing';
import { diff_match_patch } from 'diff-match-patch';
import { DifferResultToMspAdapter } from './differ-result-to-msp-adapter';
import { MspOperator } from '..';

describe('Class: DifferResultToMspAdapter', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('equal should provide no msp', () => {
    const differ = new diff_match_patch();
    const adapter = new DifferResultToMspAdapter();
    const ops = adapter.adapt(differ.diff_main('abc', 'abc'));
    expect(ops.length).toBe(0);
  });

  it('del initial should provide del', () => {
    const differ = new diff_match_patch();
    const adapter = new DifferResultToMspAdapter();
    const ops = adapter.adapt(differ.diff_main('ischola', 'schola'));
    expect(ops.length).toBe(1);
    // del
    const del = ops[0];
    expect(del.operator).toBe(MspOperator.delete);
    expect(del.rangeA.toString()).toBe('1');
    expect(del.valueA).toBe('i');
  });

  it('del internal should provide del', () => {
    const differ = new diff_match_patch();
    const adapter = new DifferResultToMspAdapter();
    const ops = adapter.adapt(differ.diff_main('ahenus', 'aenus'));
    expect(ops.length).toBe(1);
    // del
    const del = ops[0];
    expect(del.operator).toBe(MspOperator.delete);
    expect(del.rangeA.toString()).toBe('2');
    expect(del.valueA).toBe('h');
  });

  it('del final should provide del', () => {
    const differ = new diff_match_patch();
    const adapter = new DifferResultToMspAdapter();
    const ops = adapter.adapt(differ.diff_main('hocc', 'hoc'));
    expect(ops.length).toBe(1);
    // del
    const del = ops[0];
    expect(del.operator).toBe(MspOperator.delete);
    expect(del.rangeA.toString()).toBe('4');
    expect(del.valueA).toBe('c');
  });

  it('del multiple should provide 3 del\'s', () => {
    const differ = new diff_match_patch();
    const adapter = new DifferResultToMspAdapter();
    const ops = adapter.adapt(differ.diff_main('XabYcdZ', 'abcd'));
    expect(ops.length).toBe(3);
    // X
    let del = ops[0];
    expect(del.operator).toBe(MspOperator.delete);
    expect(del.rangeA.toString()).toBe('1');
    expect(del.valueA).toBe('X');
    // Y
    del = ops[1];
    expect(del.operator).toBe(MspOperator.delete);
    expect(del.rangeA.toString()).toBe('4');
    expect(del.valueA).toBe('Y');
    // Z
    del = ops[2];
    expect(del.operator).toBe(MspOperator.delete);
    expect(del.rangeA.toString()).toBe('7');
    expect(del.valueA).toBe('Z');
  });

  it('ins initial should provide ins', () => {
    const differ = new diff_match_patch();
    const adapter = new DifferResultToMspAdapter();
    const ops = adapter.adapt(differ.diff_main('eros', 'heros'));
    expect(ops.length).toBe(1);
    // ins
    const ins = ops[0];
    expect(ins.operator).toBe(MspOperator.delete);
    expect(ins.rangeA.toString()).toBe('1×0');
    expect(ins.valueA).toBe('h');
  });

  // TODO: other tests
});

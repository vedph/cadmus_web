import { TestBed } from '@angular/core/testing';
import { diff_match_patch } from 'diff-match-patch';
import { DifferResultToMspAdapter } from './differ-result-to-msp-adapter';
import { MspOperator } from './msp-operation';

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

  it("del multiple should provide 3 del's", () => {
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
    expect(ins.operator).toBe(MspOperator.insert);
    expect(ins.rangeA.toString()).toBe('1×0');
    expect(ins.valueB).toBe('h');
  });

  it('ins internal should provide ins', () => {
    const differ = new diff_match_patch();
    const adapter = new DifferResultToMspAdapter();
    const ops = adapter.adapt(differ.diff_main('meses', 'menses'));
    expect(ops.length).toBe(1);
    // ins
    const ins = ops[0];
    expect(ins.operator).toBe(MspOperator.insert);
    expect(ins.rangeA.toString()).toBe('3×0');
    expect(ins.valueB).toBe('n');
  });

  it('ins final should provide ins', () => {
    const differ = new diff_match_patch();
    const adapter = new DifferResultToMspAdapter();
    const ops = adapter.adapt(differ.diff_main('viru', 'virum'));
    expect(ops.length).toBe(1);
    // ins
    const ins = ops[0];
    expect(ins.operator).toBe(MspOperator.insert);
    expect(ins.rangeA.toString()).toBe('5×0');
    expect(ins.valueB).toBe('m');
  });

  it("ins multiple should provide 3 ins's", () => {
    const differ = new diff_match_patch();
    const adapter = new DifferResultToMspAdapter();
    const ops = adapter.adapt(differ.diff_main('abcd', 'XabYcdZ'));
    expect(ops.length).toBe(3);
    // X
    let ins = ops[0];
    expect(ins.operator).toBe(MspOperator.insert);
    expect(ins.rangeA.toString()).toBe('1×0');
    expect(ins.valueB).toBe('X');
    // Y
    ins = ops[1];
    expect(ins.operator).toBe(MspOperator.insert);
    expect(ins.rangeA.toString()).toBe('3×0');
    expect(ins.valueB).toBe('Y');
    // Z
    ins = ops[2];
    expect(ins.operator).toBe(MspOperator.insert);
    expect(ins.rangeA.toString()).toBe('5×0');
    expect(ins.valueB).toBe('Z');
  });

  it('rep initial should provide rep', () => {
    const differ = new diff_match_patch();
    const adapter = new DifferResultToMspAdapter();
    const ops = adapter.adapt(differ.diff_main('bixit', 'vixit'));
    expect(ops.length).toBe(1);
    // rep
    const rep = ops[0];
    expect(rep.operator).toBe(MspOperator.replace);
    expect(rep.rangeA.toString()).toBe('1');
    expect(rep.valueA).toBe('b');
    expect(rep.valueB).toBe('v');
  });

  it('rep internal should provide rep', () => {
    const differ = new diff_match_patch();
    const adapter = new DifferResultToMspAdapter();
    const ops = adapter.adapt(differ.diff_main('gaudis', 'gaudes'));
    expect(ops.length).toBe(1);
    // rep
    const rep = ops[0];
    expect(rep.operator).toBe(MspOperator.replace);
    expect(rep.rangeA.toString()).toBe('5');
    expect(rep.valueA).toBe('i');
    expect(rep.valueB).toBe('e');
  });

  it('rep final should provide rep', () => {
    const differ = new diff_match_patch();
    const adapter = new DifferResultToMspAdapter();
    const ops = adapter.adapt(differ.diff_main('victo', 'victu'));
    expect(ops.length).toBe(1);
    // rep
    const rep = ops[0];
    expect(rep.operator).toBe(MspOperator.replace);
    expect(rep.rangeA.toString()).toBe('5');
    expect(rep.valueA).toBe('o');
    expect(rep.valueB).toBe('u');
  });

  it('rep with shorter should provide rep', () => {
    const differ = new diff_match_patch();
    const adapter = new DifferResultToMspAdapter();
    const ops = adapter.adapt(differ.diff_main('vicsit', 'vixit'));
    expect(ops.length).toBe(1);
    // rep
    const rep = ops[0];
    expect(rep.operator).toBe(MspOperator.replace);
    expect(rep.rangeA.toString()).toBe('3×2');
    expect(rep.valueA).toBe('cs');
    expect(rep.valueB).toBe('x');
  });

  it("rep multiple should provide 3 rep's", () => {
    const differ = new diff_match_patch();
    const adapter = new DifferResultToMspAdapter();
    const ops = adapter.adapt(differ.diff_main('abcde', 'XbYdZ'));
    expect(ops.length).toBe(3);
    // X
    let rep = ops[0];
    expect(rep.operator).toBe(MspOperator.replace);
    expect(rep.rangeA.toString()).toBe('1');
    expect(rep.valueA).toBe('a');
    expect(rep.valueB).toBe('X');
    // X
    rep = ops[1];
    expect(rep.operator).toBe(MspOperator.replace);
    expect(rep.rangeA.toString()).toBe('3');
    expect(rep.valueA).toBe('c');
    expect(rep.valueB).toBe('Y');
    // Z
    rep = ops[2];
    expect(rep.operator).toBe(MspOperator.replace);
    expect(rep.rangeA.toString()).toBe('5');
    expect(rep.valueA).toBe('e');
    expect(rep.valueB).toBe('Z');
  });

  it('ins rep del final should provide ins rep del', () => {
    const differ = new diff_match_patch();
    const adapter = new DifferResultToMspAdapter();
    const ops = adapter.adapt(differ.diff_main('bxdf', 'AbCd'));
    expect(ops.length).toBe(3);
    // ins
    const ins = ops[0];
    expect(ins.operator).toBe(MspOperator.insert);
    expect(ins.rangeA.toString()).toBe('1×0');
    expect(ins.valueB).toBe('A');
    // rep
    const rep = ops[1];
    expect(rep.operator).toBe(MspOperator.replace);
    expect(rep.rangeA.toString()).toBe('2');
    expect(rep.valueA).toBe('x');
    expect(rep.valueB).toBe('C');
    // del
    const del = ops[2];
    expect(del.operator).toBe(MspOperator.delete);
    expect(del.rangeA.toString()).toBe('4');
    expect(del.valueA).toBe('f');
  });

  it('mov from start should provide mov', () => {
    const differ = new diff_match_patch();
    const adapter = new DifferResultToMspAdapter();
    const ops = adapter.adapt(differ.diff_main('Xab', 'abX'));
    expect(ops.length).toBe(1);
    // mov
    const mov = ops[0];
    expect(mov.operator).toBe(MspOperator.move);
    expect(mov.rangeA.toString()).toBe('1');
    expect(mov.rangeB.toString()).toBe('4×0');
    expect(mov.valueA).toBe('X');
  });

  it('mov from inner should provide mov', () => {
    const differ = new diff_match_patch();
    const adapter = new DifferResultToMspAdapter();
    const ops = adapter.adapt(differ.diff_main('aXbc', 'abcX'));
    expect(ops.length).toBe(1);
    // mov
    const mov = ops[0];
    expect(mov.operator).toBe(MspOperator.move);
    expect(mov.rangeA.toString()).toBe('2');
    expect(mov.rangeB.toString()).toBe('5×0');
    expect(mov.valueA).toBe('X');
  });

  it('mov from end should provide mov', () => {
    const differ = new diff_match_patch();
    const adapter = new DifferResultToMspAdapter();
    const ops = adapter.adapt(differ.diff_main('abX', 'Xab'));
    expect(ops.length).toBe(1);
    // mov
    const mov = ops[0];
    expect(mov.operator).toBe(MspOperator.move);
    expect(mov.rangeA.toString()).toBe('3');
    expect(mov.rangeB.toString()).toBe('1×0');
    expect(mov.valueA).toBe('X');
  });
});

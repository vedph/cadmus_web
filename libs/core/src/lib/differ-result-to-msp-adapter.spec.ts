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

  it('del at start should provide del', () => {
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

  // TODO: other tests
});

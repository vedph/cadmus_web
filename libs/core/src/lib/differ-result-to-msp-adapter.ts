// library: https://www.npmjs.com/package/diff-match-patch
// types: https://www.npmjs.com/package/@types/diff-match-patch

import { MspOperation, MspOperator } from './msp-operation';
import { Diff, DIFF_DELETE, DIFF_INSERT, DIFF_EQUAL } from 'diff-match-patch';
import { TextRange } from './text-range';

class DiffAndMsp {
  diff: Diff;
  msp: MspOperation;
}
const DIFF_OP = 0;
const DIFF_TXT = 1;

/**
 * Misspelling adapter for Google diff-match-patch library.
 */
export class DifferResultToMspAdapter {
  public isMovDisabled: boolean;

  private mapDiffsWithReplacements(diffs: Diff[], output: DiffAndMsp[]) {
    let start = 1;

    for (let i = 0; i < diffs.length; i++) {
      if (
        diffs[i][DIFF_OP] === DIFF_DELETE &&
        i + 1 < diffs.length &&
        diffs[i + 1][DIFF_OP] === DIFF_INSERT
      ) {
        const msp = new MspOperation();
        msp.operator = MspOperator.replace;
        msp.rangeA = new TextRange(start, diffs[i][DIFF_TXT].length);
        msp.valueA = diffs[i][DIFF_TXT];
        msp.valueB = diffs[i + 1][DIFF_TXT];

        output.push({
          diff: diffs[i],
          msp: msp
        });
        start += diffs[i][DIFF_TXT].length;
        i++;
      } else {
        output.push({
          diff: diffs[i],
          msp: null
        });
        if (
          diffs[i][DIFF_OP] === DIFF_DELETE ||
          diffs[i][DIFF_OP] === DIFF_EQUAL
        ) {
          start += diffs[i][DIFF_TXT].length;
        }
      }
    }
  }

  private detectMoves(mspDiffs: DiffAndMsp[]) {
    // first look for INS..DEL
    for (let i = 0; i < mspDiffs.length; i++) {
      // for each INS:
      if (mspDiffs[i].msp && mspDiffs[i].msp.operator === MspOperator.insert) {
        const ins = mspDiffs[i].msp;

        // find a DEL with the same value
        let nextDel: DiffAndMsp = null;
        for (let j = i + 1; j < mspDiffs.length; j++) {
          if (
            mspDiffs[j].msp &&
            mspDiffs[j].msp.operator === MspOperator.delete &&
            mspDiffs[j].msp.valueA === ins.valueB
          ) {
            nextDel = mspDiffs[j];
            break;
          }
        }

        // if found, assume a MOV from DEL to INS
        if (nextDel) {
          const nextDelIndex = mspDiffs.indexOf(nextDel);
          const del = mspDiffs[nextDelIndex].msp;

          const mov = new MspOperation();
          mov.operator = MspOperator.move;
          mov.rangeA = del.rangeA;
          mov.rangeB = ins.rangeA;
          mov.valueA = del.valueA;

          mspDiffs[nextDelIndex] = {
            diff: mspDiffs[nextDelIndex].diff,
            msp: mov
          };
          mspDiffs.splice(i, 1);
          i--;
        }
      }
    }

    // then look for DEL..INS
    for (let i = 0; i < mspDiffs.length; i++) {
      // for each DEL:
      if (mspDiffs[i].msp && mspDiffs[i].msp.operator === MspOperator.delete) {
        // find an INS with the same value
        const del = mspDiffs[i].msp;
        let nextIns: DiffAndMsp = null;
        for (let j = i + 1; j < mspDiffs.length; j++) {
          if (
            mspDiffs[j].msp &&
            mspDiffs[j].msp.operator === MspOperator.insert &&
            mspDiffs[j].msp.valueB === del.valueA
          ) {
            nextIns = mspDiffs[j];
            break;
          }
        }

        // if found, assume a MOV from DEL to INS
        if (nextIns) {
          const ins = nextIns.msp;
          const nextInsIndex = mspDiffs.indexOf(nextIns);

          const mov = new MspOperation();
          mov.operator = MspOperator.move;
          mov.rangeA = del.rangeA;
          mov.rangeB = ins.rangeA;
          mov.valueA = del.valueA;

          mspDiffs[i] = {
            diff: mspDiffs[i].diff,
            msp: mov
          };
          mspDiffs.splice(nextInsIndex, 1);
        }
      }
    }
  }

  /**
   * Adapt the diff-match-patch diffing result to a set of misspelling
   * operations.
   *
   * @param result The diffing result.
   * @returns An array of misspelling operations.
   */
  public adapt(result: Diff[]): MspOperation[] {
    if (!result) {
      return [];
    }
    const mspDiffs: DiffAndMsp[] = [];

    this.mapDiffsWithReplacements(result, mspDiffs);

    let index = 0;
    for (let i = 0; i < mspDiffs.length; i++) {
      if (mspDiffs[i].msp) {
        index += mspDiffs[i].msp.rangeA.length;
        continue;
      }

      const md = mspDiffs[i];
      switch (md.diff[DIFF_OP]) {
        case DIFF_EQUAL:
          index += md.diff[DIFF_TXT].length;
          break;

        case DIFF_DELETE:
          const del = new MspOperation();
          del.operator = MspOperator.delete;
          del.rangeA = new TextRange(index + 1, md.diff[DIFF_TXT].length);
          del.valueA = md.diff[DIFF_TXT];
          mspDiffs[i] = {
            diff: md.diff,
            msp: del
          };
          index += md.diff[DIFF_TXT].length;
          break;

        case DIFF_INSERT:
          const ins = new MspOperation();
          ins.operator = MspOperator.insert;
          ins.rangeA = new TextRange(index + 1, 0);
          ins.valueB = md.diff[DIFF_TXT];
          mspDiffs[i] = {
            diff: md.diff,
            msp: ins
          };
          break;
      }
    }

    if (!this.isMovDisabled) {
      this.detectMoves(mspDiffs);
    }

    return mspDiffs.filter(md => md.msp).map(md => md.msp);
  }
}

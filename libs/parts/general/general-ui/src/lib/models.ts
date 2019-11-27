import { Part } from '@cadmus/core';

/**
 * Note part.
 */
export interface NotePart extends Part {
  text: string;
  tag: string;
}

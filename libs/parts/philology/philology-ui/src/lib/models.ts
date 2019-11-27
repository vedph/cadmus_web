import { Fragment } from '@cadmus/core';

/**
 * The orthography layer fragment server model.
 */
export interface OrthographyFragment extends Fragment {
  standard: string;
  operations: string[];
}

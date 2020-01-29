import { Fragment } from '@cadmus/core';

/**
 * Type of lemma's variant in ApparatusFragment.
 */
export enum LemmaVariantType {
  // variant should replace lemma
  replacement = 0,

  // variant should be added before lemma
  additionBefore,

  // variant should be added after lemma
  additionAfter,

  // any note to the text
  note
}

/**
 * The apparatus layer fragment server model.
 */
export interface ApparatusFragment extends Fragment {
  type: LemmaVariantType;
  value?: string;
  isAccepted?: boolean;
  authors: string[];
  note?: string;
}

export const APPARATUS_FRAGMENT_TYPEID = 'fr.net.fusisoft.apparatus';

export const APPARATUS_FRAGMENT_SCHEMA = {
  definitions: {},
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id:
    'www.fusisoft.net/cadmus/fragments/philology/' +
    APPARATUS_FRAGMENT_TYPEID +
    '.json',
  type: 'object',
  title: 'ApparatusFragment',
  required: ['location', 'type', 'authors'],
  properties: {
    location: {
      $id: '#/properties/location',
      type: 'string'
    },
    baseText: {
      $id: '#/properties/baseText',
      type: 'string'
    },
    type: {
      type: 'string'
    },
    value: {
      type: 'string'
    },
    isAccepted: {
      type: 'boolean'
    },
    authors: {
      type: 'array',
      items: {
        type: 'string'
      }
    },
    note: {
      type: ['string', 'null']
    }
  }
};

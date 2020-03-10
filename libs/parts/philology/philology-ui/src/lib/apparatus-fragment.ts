import { Fragment } from '@cadmus/core';

/**
 * Type of apparatus entry in an apparatus fragment.
 */
export enum ApparatusEntryType {
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
 * An optionally annotated value used in an apparatus entry.
 */
export interface ApparatusAnnotatedValue {
  value: string;
  note?: string;
}

/**
 * A single entry in an apparatus fragment.
 */
export interface ApparatusEntry {
  type: ApparatusEntryType;
  tag?: string;
  value?: string;
  normValue?: string;
  isAccepted?: boolean;
  groupId?: string;
  witnesses?: ApparatusAnnotatedValue[];
  authors?: ApparatusAnnotatedValue[];
  note?: string;
}

/**
 * The apparatus layer fragment server model.
 */
export interface ApparatusFragment extends Fragment {
  tag?: string;
  entries: ApparatusEntry[];
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
  required: ['location', 'entries'],
  properties: {
    location: {
      $id: '#/properties/location',
      type: 'string'
    },
    baseText: {
      $id: '#/properties/baseText',
      type: 'string'
    },
    tag: {
      $id: '#/properties/tag',
      type: 'string'
    },
    entries: {
      $id: '#/properties/entries',
      type: 'array',
      items: {
        $id: '#/properties/entries/items',
        type: 'object',
        required: ['type'],
        properties: {
          type: {
            $id: '#/properties/entries/items/properties/type',
            type: 'integer'
          },
          tag: {
            $id: '#/properties/entries/items/properties/tag',
            type: ['string', 'null']
          },
          value: {
            $id: '#/properties/entries/items/properties/value',
            type: ['string', 'null']
          },
          normValue: {
            $id: '#/properties/entries/items/properties/normValue',
            type: ['string', 'null']
          },
          isAccepted: {
            $id: '#/properties/entries/items/properties/isAccepted',
            type: 'boolean'
          },
          groupId: {
            $id: '#/properties/entries/items/properties/groupId',
            type: ['string', 'null']
          },
          witnesses: {
            $id: '#/properties/entries/items/properties/witnesses',
            type: 'array',
            items: {
              $id: '#/properties/entries/items/properties/witnesses/items',
              type: 'object',
              required: ['value'],
              properties: {
                value: {
                  $id:
                    '#/properties/entries/items/properties/witnesses/items/properties/value',
                  type: 'string'
                },
                note: {
                  $id:
                    '#/properties/entries/items/properties/witnesses/items/properties/note',
                  type: ['string', 'null']
                }
              }
            }
          },
          authors: {
            $id: '#/properties/entries/items/properties/authors',
            type: 'array',
            items: {
              $id: '#/properties/entries/items/properties/authors/items',
              type: 'object',
              required: ['value'],
              properties: {
                value: {
                  $id:
                    '#/properties/entries/items/properties/authors/items/properties/value',
                  type: 'string'
                },
                note: {
                  $id:
                    '#/properties/entries/items/properties/authors/items/properties/note',
                  type: ['string', 'null']
                }
              }
            }
          },
          note: {
            $id: '#/properties/entries/items/properties/note',
            type: ['string', 'null']
          }
        }
      }
    }
  }
};

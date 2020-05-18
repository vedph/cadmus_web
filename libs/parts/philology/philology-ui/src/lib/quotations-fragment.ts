import { Fragment } from '@cadmus/core';

/**
 * A single quotation entry in a QuotationsFragment.
 */
export interface QuotationEntry {
  author: string;
  work: string;
  citation: string;
  citationUri?: string;
  variant?: string;
  tag?: string;
  note?: string;
}

/**
 * The Quotations layer fragment server model.
 */
export interface QuotationsFragment extends Fragment {
  entries: QuotationEntry[];
}

export const QUOTATIONS_FRAGMENT_TYPEID = 'fr.net.fusisoft.quotations';

export const QUOTATIONS_FRAGMENT_SCHEMA = {
  definitions: {},
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id:
    'www.fusisoft.net/cadmus/fragments/philology/' +
    QUOTATIONS_FRAGMENT_TYPEID +
    '.json',
  type: 'object',
  title: 'QuotationsFragment',
  required: ['location', 'entries'],
  properties: {
    location: {
      $id: '#/properties/location',
      type: 'string',
    },
    baseText: {
      $id: '#/properties/baseText',
      type: 'string',
    },
    entries: {
      type: 'array',
      items: {
        anyOf: [
          {
            type: 'object',
            required: ['author', 'work', 'citation'],
            properties: {
              author: {
                type: 'string',
              },
              work: {
                type: 'string',
              },
              citation: {
                type: 'string',
              },
              citationUri: {
                type: 'string',
              },
              variant: {
                type: 'string',
              },
              tag: {
                type: 'string',
              },
              note: {
                type: 'string',
              },
            },
          },
        ],
      },
    },
  },
};

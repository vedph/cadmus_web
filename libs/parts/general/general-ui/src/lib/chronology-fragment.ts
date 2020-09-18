import { Fragment, HistoricalDate } from '@cadmus/core';

/**
 * The chronology layer fragment server model.
 */
export interface ChronologyFragment extends Fragment {
  date: HistoricalDate;
  label?: string;
  tag?: string;
  eventId?: string;
}

export const CHRONOLOGY_FRAGMENT_TYPEID = 'fr.it.vedph.chronology';

export const CHRONOLOGY_FRAGMENT_SCHEMA = {
  definitions: {},
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id:
    'www.fusisoft.net/cadmus/fragments/general/' +
    CHRONOLOGY_FRAGMENT_TYPEID +
    '.json',
  type: 'object',
  title: 'ChronologyFragment',
  required: ['location', 'date'],
  properties: {
    location: {
      $id: '#/properties/location',
      type: 'string'
    },
    baseText: {
      $id: '#/properties/baseText',
      type: 'string'
    },
    date: {
      type: 'object',
      required: ['a'],
      properties: {
        a: {
          type: 'object',
          required: ['value'],
          properties: {
            value: {
              type: 'integer'
            },
            isCentury: {
              type: 'boolean'
            },
            isSpan: {
              type: 'boolean'
            },
            isApproximate: {
              type: 'boolean'
            },
            isDubious: {
              type: 'boolean'
            },
            day: {
              type: 'integer'
            },
            month: {
              type: 'integer'
            },
            hint: {
              type: ['string', 'null']
            }
          }
        },
        b: {
          type: 'object',
          required: ['value'],
          properties: {
            value: {
              type: 'integer'
            },
            isCentury: {
              type: 'boolean'
            },
            isSpan: {
              type: 'boolean'
            },
            isApproximate: {
              type: 'boolean'
            },
            isDubious: {
              type: 'boolean'
            },
            day: {
              type: 'integer'
            },
            month: {
              type: 'integer'
            },
            hint: {
              type: ['string', 'null']
            }
          }
        }
      },
      label: {
        type: 'string'
      },
      tag: {
        type: 'string'
      },
      eventId: {
        type: 'string'
      }
    }
  }
};

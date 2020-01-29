import { Part, HistoricalDate } from '@cadmus/core';

/**
 * The HistoricalDate part model.
 */
export interface HistoricalDatePart extends Part {
  date: HistoricalDate;
}

/**
 * The type ID used to identify the HistoricalDatePart type.
 */
export const HISTORICAL_DATE_PART_TYPEID = 'net.fusisoft.historical-date';

/**
 * JSON schema for the HistoricalDate part. This is used in the editor demo.
 * You can use the JSON schema tool at https://jsonschema.net/.
 */
export const HISTORICAL_DATE_PART_SCHEMA = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id:
    'www.fusisoft.net/cadmus/parts/general/' +
    HISTORICAL_DATE_PART_TYPEID +
    '.json',
  type: 'object',
  title: 'HistoricalDatePart',
  required: [
    'id',
    'itemId',
    'typeId',
    'timeCreated',
    'creatorId',
    'timeModified',
    'userId',
    'date'
  ],
  properties: {
    timeCreated: {
      type: 'string',
      pattern: '^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}.\\d+Z$'
    },
    creatorId: {
      type: 'string'
    },
    timeModified: {
      type: 'string',
      pattern: '^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}.\\d+Z$'
    },
    userId: {
      type: 'string'
    },
    id: {
      type: 'string',
      pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
    },
    itemId: {
      type: 'string',
      pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
    },
    typeId: {
      type: 'string',
      pattern: '^[a-z][-0-9a-z._]*$'
    },
    roleId: {
      type: ['string', 'null'],
      pattern: '^([a-z][-0-9a-z._]*)?$'
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
      }
    }
  }
};

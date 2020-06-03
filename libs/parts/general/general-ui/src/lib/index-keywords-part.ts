import { Part } from '@cadmus/core';

/**
 * Index keyword.
 */
export interface IndexKeyword {
  indexId?: string;
  language?: string;
  value: string;
  note?: string;
  tag?: string;
}

/**
 * Index keywords part.
 */
export interface IndexKeywordsPart extends Part {
  keywords: IndexKeyword[];
}

/**
 * The type ID used to identify the IndexKeywordsPart type.
 */
export const INDEX_KEYWORDS_PART_TYPEID = 'net.fusisoft.index-keywords';

/**
 * JSON schema for the index keywords part. This is used in the editor demo.
 * You can use the JSON schema tool at https://jsonschema.net/.
 */
export const INDEX_KEYWORDS_PART_SCHEMA = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id:
    'www.fusisoft.net/cadmus/parts/general/' +
    INDEX_KEYWORDS_PART_TYPEID +
    '.json',
  type: 'object',
  title: 'IndexKeywordsPart',
  required: [
    'id',
    'itemId',
    'typeId',
    'timeCreated',
    'creatorId',
    'timeModified',
    'userId',
    'keywords'
  ],
  properties: {
    timeCreated: {
      type: 'string',
      pattern: '^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}.\\d+Z$',
    },
    creatorId: {
      type: 'string',
    },
    timeModified: {
      type: 'string',
      pattern: '^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}.\\d+Z$',
    },
    userId: {
      type: 'string',
    },
    id: {
      type: 'string',
      pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
    },
    itemId: {
      type: 'string',
      pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
    },
    typeId: {
      type: 'string',
      pattern: '^[a-z][-0-9a-z._]*$',
    },
    roleId: {
      type: ['string', 'null'],
      pattern: '^([a-z][-0-9a-z._]*)?$',
    },
    keywords: {
      type: 'array',
      items: {
        type: 'object',
        required: ['indexId', 'language', 'value'],
        properties: {
          indexId: {
            type: 'string',
          },
          language: {
            type: 'string',
          },
          value: {
            type: 'string',
          },
          note: {
            type: 'string',
          },
          tag: {
            type: 'string',
          },
        },
      },
    },
  },
};

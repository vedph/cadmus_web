import { Part } from '@cadmus/core';

export interface Keyword {
  language: string;
  value: string;
}

/**
 * The Keywords part model.
 */
export interface KeywordsPart extends Part {
  keywords: Keyword[];
}

/**
 * The type ID used to identify the KeywordsPart type.
 */
export const KEYWORDS_PART_TYPEID = 'net.fusisoft.keywords';

/**
 * JSON schema for the Keywords part. This is used in the editor demo.
 * You can use the JSON schema tool at https://jsonschema.net/.
 */
export const KEYWORDS_PART_SCHEMA = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id: 'www.fusisoft.net/cadmus/parts/general/keywords.json',
  type: 'object',
  title: 'KeywordsPart',
  required: ['id', 'itemId', 'timeModified', 'typeId', 'userId', 'keywords'],
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
      type: 'string'
      // pattern: '^([a-z][-0-9a-z._]*)?$'
    },
    keywords: {
      type: 'array',
      items: {
        type: 'object',
        required: ['language', 'value'],
        properties: {
          language: {
            type: 'string'
          },
          value: {
            type: 'string'
          }
        }
      }
    }
  }
};

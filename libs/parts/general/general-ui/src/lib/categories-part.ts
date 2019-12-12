import { Part } from '@cadmus/core';

/**
 * The Categories part model.
 */
export interface CategoriesPart extends Part {
  categories: string[];
}

/**
 * The type ID used to identify the CategoriesPart type.
 */
export const CATEGORIES_PART_TYPEID = 'net.fusisoft.categories';

/**
 * JSON schema for the Categories part. This is used in the editor demo.
 * You can use the JSON schema tool at https://jsonschema.net/.
 */
export const CATEGORIES_PART_SCHEMA = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id: 'www.fusisoft.net/cadmus/parts/general/categories.json',
  type: 'object',
  title: 'CategoriesPart',
  required: ['id', 'itemId', 'timeModified', 'typeId', 'userId', 'categories'],
  properties: {
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
    categories: {
      type: 'array',
      items: {
        type: 'string'
      }
    }
  }
};

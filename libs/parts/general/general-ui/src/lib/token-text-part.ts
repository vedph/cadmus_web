import { Part } from '@cadmus/core';

/**
 * A single line in a TokenTextPart.
 */
export interface TokenTextLine {
  y: number;
  text: string;
}

/**
 * Token-based text part.
 */
export interface TokenTextPart extends Part {
  citation?: string;
  lines: TokenTextLine[];
}

/**
 * The type ID used to identify the TokenTextPart type.
 */
export const TOKEN_TEXT_PART_TYPEID = 'net.fusisoft.token-text';

/**
 * JSON schema for the TookenTextPart. This is used in the editor demo.
 * You can use the JSON schema tool at https://jsonschema.net/.
 */
export const TOKEN_TEXT_PART_SCHEMA = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id:
    'www.fusisoft.net/cadmus/parts/general/' + TOKEN_TEXT_PART_TYPEID + '.json',
  type: 'object',
  title: 'TokenTextPart',
  required: [
    'id',
    'itemId',
    'typeId',
    'timeCreated',
    'creatorId',
    'timeModified',
    'userId',
    'categories',
    'lines'
  ],
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
      type: ['string', 'null'],
      pattern: '^([a-z][-0-9a-z._]*)?$'
    },
    citation: {
      type: ['string', 'null']
    },
    lines: {
      $id: '#/properties/lines',
      type: 'array',
      title: 'The Lines Schema',
      items: {
        $id: '#/properties/lines/items',
        type: 'object',
        required: ['y', 'text'],
        properties: {
          y: {
            $id: '#/properties/lines/items/properties/y',
            type: 'integer'
          },
          text: {
            $id: '#/properties/lines/items/properties/text',
            type: 'string'
          }
        }
      }
    }
  }
};

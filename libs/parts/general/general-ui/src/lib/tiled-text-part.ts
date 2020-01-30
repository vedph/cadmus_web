import { Part } from '@cadmus/core';

/**
 * The name of the text tile part data representing its text.
 */
export const TEXT_TILE_TEXT_DATA_NAME = "text";

/**
 * A tile in a tiled text row.
 */
export interface TextTile {
  x: number;
  data: { [key: string]: any };
}

/**
 * A row in the tiled text part.
 */
export interface TextTileRow {
  y: number;
  tiles: TextTile[];
  data: { [key: string]: any };
}

/**
 * The tiled text part model.
 */
export interface TiledTextPart extends Part {
  citation?: string;
  rows: TextTileRow[];
}

/**
 * The type ID used to identify the TiledTextPart type.
 */
export const TILEDTEXTPART_TYPEID = 'net.fusisoft.tiled-text';

/**
 * JSON schema for the tiled text part. This is used in the editor demo.
 * You can use the JSON schema tool at https://jsonschema.net/.
 */
export const TILEDTEXTPART_SCHEMA = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id:
    'www.fusisoft.net/cadmus/parts/general/' + TILEDTEXTPART_TYPEID + '.json',
  type: 'object',
  title: 'TiledTextPart',
  required: ['id', 'itemId', 'timeModified', 'typeId', 'userId', 'rows'],
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
    rows: {
      type: 'array',
      items: {
        type: 'object',
        required: ['y', 'tiles'],
        properties: {
          y: {
            type: 'integer',
            minimum: 1
          },
          tiles: {
            type: 'array',
            items: {
              type: 'object',
              required: ['x', 'data'],
              properties: {
                x: {
                  type: 'integer',
                  minimum: 1
                },
                data: {
                  type: 'object',
                  patternProperties: {
                    '^.*$': {
                      anyOf: [
                        {
                          type: 'string'
                        },
                        {
                          type: 'number'
                        },
                        {
                          type: 'integer'
                        },
                        {
                          type: 'boolean'
                        },
                        {
                          type: 'null'
                        }
                      ]
                    }
                  }
                }
              }
            }
          }
        },
        data: {
          type: 'object',
          patternProperties: {
            '^.*$': {
              anyOf: [
                {
                  type: 'string'
                },
                {
                  type: 'number'
                },
                {
                  type: 'integer'
                },
                {
                  type: 'boolean'
                },
                {
                  type: 'null'
                }
              ]
            }
          }
        }
      }
    }
  }
};

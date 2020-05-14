import { Part } from '@cadmus/core';
import { Keyword } from './keywords-part';

export interface BibAuthor {
  firstName?: string;
  lastName: string;
  roleId?: string;
}

export interface BibEntry {
  typeId: string;
  authors?: BibAuthor[];
  title: string;
  language: string;
  container?: string;
  contributors?: BibAuthor[];
  edition?: number;
  number?: number;
  publisher?: string;
  yearPub?: number;
  placePub?: string;
  location?: string;
  accessDate?: Date;
  firstPage?: number;
  lastPage?: number;
  keywords?: Keyword[];
  note?: string;
}

/**
 * The bibliography part model.
 */
export interface BibliographyPart extends Part {
  entries: BibEntry[];
}

/**
 * The type ID used to identify the BibliographyPart type.
 */
export const BIBLIOGRAPHY_PART_TYPEID = 'net.fusisoft.bibliography';

/**
 * JSON schema for the Bibliography part. This is used in the editor demo.
 * You can use the JSON schema tool at https://jsonschema.net/.
 */
export const BIBLIOGRAPHY_PART_SCHEMA = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id:
    'www.fusisoft.net/cadmus/parts/general/' +
    BIBLIOGRAPHY_PART_TYPEID +
    '.json',
  type: 'object',
  title: 'BibliographyPart',
  required: ['id', 'itemId', 'timeModified', 'typeId', 'userId', 'entries'],
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
    entries: {
      type: 'array',
      items: {
        anyOf: [
          {
            type: 'object',
            required: ['typeId', 'title', 'language'],
            properties: {
              typeId: {
                type: 'string',
                pattern: '^[a-z][-0-9a-z._]*$'
              },
              authors: {
                type: 'array',
                items: {
                  anyOf: [
                    {
                      type: 'object',
                      required: ['lastName'],
                      properties: {
                        firstName: {
                          type: 'string'
                        },
                        lastName: {
                          type: 'string'
                        },
                        roleId: {
                          type: 'string'
                        }
                      }
                    }
                  ]
                }
              },
              title: {
                type: 'string'
              },
              language: {
                type: 'string'
              },
              container: {
                type: 'string'
              },
              contributors: {
                type: 'array',
                items: {
                  anyOf: [
                    {
                      type: 'object',
                      required: ['lastName'],
                      properties: {
                        firstName: {
                          type: 'string'
                        },
                        lastName: {
                          type: 'string'
                        },
                        roleId: {
                          type: 'string'
                        }
                      }
                    }
                  ]
                }
              },
              edition: {
                type: 'integer'
              },
              number: {
                type: 'string'
              },
              publisher: {
                type: 'string'
              },
              yearPub: {
                type: 'integer'
              },
              placePub: {
                type: 'string'
              },
              location: {
                type: 'string'
              },
              accessDate: {
                type: 'string',
                pattern: '^\\d{4}-\\d{2}-\\d{2}(?:T\\d{2}:\\d{2}:\\d{2}.\\d+Z)$'
              },
              firstPage: {
                title: 'The firstPage schema'
              },
              lastPage: {
                type: 'integer'
              },
              keywords: {
                type: 'array',
                items: {
                  anyOf: [
                    {
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
                  ]
                }
              },
              note: {
                type: 'string'
              }
            }
          }
        ]
      }
    }
  }
};

import { Part } from '@cadmus/core';

/**
 * Note part.
 */
export interface NotePart extends Part {
  text: string;
  tag: string;
}

/**
 * JSON schema for the note part. This is used in the editor demo.
 * Generated with Typescript JSON schema generator VSCode extension
 * and then manually edited. You can also consider the JSON schema
 * tool at https://jsonschema.net/.
 */
export const NOTE_PART_SCHEMA = `
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$ref": "#/definitions/NotePart",
  "definitions": {
    "NotePart": {
      "type": "object",
      "properties": {
        "timeModified": {
          "type": "object",
          "additionalProperties": false
        },
        "userId": {
          "type": "string"
        },
        "id": {
          "type": "string",
          "pattern": "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$"
        },
        "itemId": {
          "type": "string",
          "pattern": "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$"
        },
        "typeId": {
          "type": "string",
          "pattern": "^[0-9a-z][0-9a-z\\-._]*$"
        },
        "roleId": {
          "type": "string",
          "pattern": "^[0-9a-z][0-9a-z\\-._]*$"
        },
        "text": {
          "type": "string"
        },
        "tag": {
          "type": "string"
        }
      },
      "required": [
        "id",
        "itemId",
        "text",
        "timeModified",
        "typeId",
        "userId"
      ],
      "additionalProperties": false
    }
  }
}
`;

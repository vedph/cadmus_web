import { Fragment } from '@cadmus/core';

/**
 * The comment layer fragment server model.
 */
export interface CommentFragment extends Fragment {
  tag: string;
  text: string;
}

export const COMMENT_FRAGMENT_TYPEID = 'fr.net.fusisoft.comment';

export const COMMENT_FRAGMENT_SCHEMA = {
  definitions: {},
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id: 'http://example.com/root.json',
  type: 'object',
  title: 'CommentFragment',
  required: ['text'],
  properties: {
    location: {
      $id: '#/properties/location',
      type: 'string'
    },
    baseText: {
      $id: '#/properties/baseText',
      type: 'string'
    },
    text: {
      type: 'string'
    },
    tag: {
      type: 'string'
    }
  }
};

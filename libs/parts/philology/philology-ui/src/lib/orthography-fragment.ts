import { Fragment } from '@cadmus/core';

/**
 * The orthography layer fragment server model.
 */
export interface OrthographyFragment extends Fragment {
  standard: string;
  operations?: string[];
}

export const ORTHOGRAPHY_FRAGMENT_TYPEID = 'fr.net.fusisoft.orthography';

export const ORTHOGRAPHY_FRAGMENT_SCHEMA = {
  definitions: {},
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id:
    'www.fusisoft.net/cadmus/fragments/philology/' +
    ORTHOGRAPHY_FRAGMENT_TYPEID +
    '.json',
  type: 'object',
  title: 'OrthographyFragment',
  required: ['location', 'standard'],
  properties: {
    location: {
      $id: '#/properties/location',
      type: 'string'
    },
    baseText: {
      $id: '#/properties/baseText',
      type: 'string'
    },
    standard: {
      $id: '#/properties/standard',
      type: 'string'
    },
    operations: {
      $id: '#/properties/operations',
      type: 'array',
      items: {
        $id: '#/properties/operations/items',
        type: 'string',
        pattern:
          '(?:"([^"]+)")?\\@(\\d+)(?:[x×](\\d+))?\\s*([=>~])\\s*(?:"([^"]*)")?(?:\\@(\\d+)(?:[x×](\\d+))?)?(?:\\s*\\[([^\\]{]+)\\])?(?:\\s*\\{([^}]+)})?'
      }
    }
  }
};

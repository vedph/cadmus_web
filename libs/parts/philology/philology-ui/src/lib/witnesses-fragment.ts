import { Fragment } from '@cadmus/core';

/**
 * A witness entry in WitnessesFragment.
 */
export interface Witness {
  id: string;
  citation: string;
  text: string;
  note?: string;
}

/**
 * The Witnesses layer fragment server model.
 */
export interface WitnessesFragment extends Fragment {
  witnesses: Witness[];
}

export const WITNESSES_FRAGMENT_TYPEID = 'fr.net.fusisoft.witnesses';

export const WITNESSES_FRAGMENT_SCHEMA = {
  definitions: {},
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id:
    'www.fusisoft.net/cadmus/fragments/philology/' +
    WITNESSES_FRAGMENT_TYPEID +
    '.json',
  type: 'object',
  title: 'WitnessesFragment',
  required: ['location', 'witnesses'],
  properties: {
    location: {
      $id: '#/properties/location',
      type: 'string'
    },
    baseText: {
      $id: '#/properties/baseText',
      type: 'string'
    },
    witnesses: {
      type: 'array',
      items: {
        type: 'object',
        required: ['id', 'citation', 'text'],
        properties: {
          id: {
            type: 'string'
          },
          citation: {
            type: 'string'
          },
          text: {
            type: 'string'
          },
          note: {
            type: ['string', 'null']
          }
        }
      }
    }
  }
};

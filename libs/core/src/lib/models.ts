/**
 * Interface implemented by versioned storage objects.
 */
export interface HasVersion {
  timeModified: Date;
  userId: string;
}

/**
 * Item's properties, excluding its parts.
 */
export interface Item extends HasVersion {
  id: string;
  title: string;
  description: string;
  facetId: string;
  sortKey: string;
  flags: number;
}

/**
 * Part. This is the minimal set of properties present in all the
 * parts. Each part then adds its own properties, extending this interface.
 */
export interface Part extends HasVersion {
  id: string;
  itemId: string;
  typeId: string;
  roleId: string;
}

/**
 * Text layer fragment. This is the minimal set of properties present in all the
 * fragments. Each fragment then adds its own properties, extending this
 * interface.
 * Every fragment has a location, and can be enriched with the corresponding
 * base text when used in views.
 */
export interface Fragment {
  location: string;
  baseText?: string;
}

/**
 * Token-based text layer part. This represents a special type of part,
 * whose only content is a collection of fragments.
 */
export interface TokenTextLayerPart extends Part {
  fragments: Fragment[];
}

/**
 * A text line in a base text part.
 */
export interface TextLine {
  y: number;
  tokens: string[];
}

/**
 * Token-based text coordinates.
 */
export interface TextCoords {
  y: number;
  x: number;
  at?: number;
  run?: number;
}

/**
 * A single entry in a thesaurus.
 */
export interface ThesaurusEntry {
  id: string;
  value: string;
}

/**
 * A set of thesaurus entries.
 */
export interface Thesaurus {
  id: string;
  language: string;
  entries: ThesaurusEntry[];
}

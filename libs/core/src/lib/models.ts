/**
 * Interface implemented by versioned storage objects.
 */
export interface HasVersion {
  timeCreated: Date;
  creatorId: string;
  timeModified: Date;
  userId: string;
}

/**
 * A page of data.
 */
export interface DataPage<T> {
  pageNumber: number;
  pageSize: number;
  pageCount: number;
  total: number;
  items: T[];
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
  parts?: Part[];
}

/**
 * Filter for items.
 */
export interface ItemFilter {
  pageNumber: number;
  pageSize: number;
  title?: string;
  description?: string;
  facetId?: string;
  flags?: number;
  minModified?: Date;
  maxModified?: Date;
  userId?: string;
}

/**
 * Essential information about an item.
 */
export interface ItemInfo extends HasVersion {
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
 * Text layer part. This represents a special type of part,
 * whose only content is a collection of fragments.
 */
export interface TextLayerPart extends Part {
  fragments: Fragment[];
}

/**
 * A text line in a base text part.
 */
export interface TokenTextLayerLine {
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

/**
 * A set of thesauri which get passed to an editor component.
 * In the set, each thesaurus is identified by an arbitrarily
 * defined key, which is unique only within the context of the editor
 * consuming the set, and refers to frontend only.
 */
export interface ThesauriSet {
  [key: string]: Thesaurus;
}

/**
 * Part definition in a facet.
 */
export interface PartDefinition {
  typeId: string;
  roleId: string;
  name: string;
  description: string;
  isRequired: boolean;
  colorKey: string;
  groupKey: string;
  sortKey: string;
  editorKey: string;
}

/**
 * Fragment definition in a facet.
 */
/**
 * Facet definition.
 */
export interface FacetDefinition {
  id: string;
  label: string;
  description: string;
  partDefinitions: PartDefinition[];
}

/**
 * Flag definition.
 */
export interface FlagDefinition {
  id: number;
  label: string;
  description: string;
  colorKey: string;
}

/**
 * A group of parts. Usually the item's parts are grouped according
 * to their metadata, and presented in this way.
 */
export interface PartGroup {
  key: string;
  label: string;
  parts: Part[];
}

/**
 * Essential information about a user.
 */
export interface UserInfo {
  userName: string;
  firstName: string;
  lastName: string;
}

/**
 * Login credentials.
 */
export interface LoginCredentials {
  name: string;
  password: string;
}

/**
 * Login result.
 */
export interface LoginResult {
  token: string;
  expiration: Date;
}

export interface ExistResult {
  entry: string;
  isExisting: boolean;
}

export interface RegistrationModel {
  email: string;
  name: string;
  firstName: string;
  lastName: string;
  password: string;
}

/**
 * Authenticated user data.
 */
export interface User {
  userName: string;
  email: string;
  roles: string[];
  emailConfirmed?: boolean;
  firstName: string;
  lastName: string;
  lockoutEnabled?: boolean;
  lockoutEnd?: Date;
}

/**
 * User filter parameters.
 */
export interface UserFilter {
  pageNumber: number;
  pageSize: number;
  name?: string;
}

/**
 * Password change data.
 */
export interface PasswordChange {
  email: string;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

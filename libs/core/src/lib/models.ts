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
 * A wrapper for a value or an optional error message.
 */
export interface ErrorWrapper<T> {
  value?: T;
  error?: string;
}

/**
 * Item's properties, excluding its parts.
 */
export interface Item extends HasVersion {
  id: string;
  title: string;
  description: string;
  facetId: string;
  groupId: string;
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
  groupId?: string;
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
  groupId: string;
  sortKey: string;
  flags: number;
  payload?: any;
}

/**
 * Information about a data pin; returned by pins search.
 */
export interface DataPinInfo {
  itemId: string;
  partId: string;
  roleId: string;
  partTypeId: string;
  name: string;
  value: string;
}

/**
 * Part type and role IDs.
 */
export interface PartTypeIds {
  typeId: string;
  roleId: string;
}

/**
 * Part. This is the minimal set of properties present in all the
 * parts. Each part then adds its own properties, extending this interface.
 */
export interface Part extends HasVersion, PartTypeIds {
  id: string;
  itemId: string;
  thesaurusScope?: string;
}

/**
 * Essential information about a layer part.
 */
export interface LayerPartInfo extends HasVersion, PartTypeIds {
  id: string;
  itemId: string;
  fragmentCount: number;
  isAbsent: boolean;
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
 * Layer reconciliation hint for a single fragment.
 */
export interface LayerHint {
  location: string;
  editOperation: string;
  patchOperation?: string;
  impactLevel: number;
  description?: string;
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
 * Filter for thesauri.
 */
export interface ThesaurusFilter {
  pageNumber: number;
  pageSize: number;
  id?: string;
  isAlias?: boolean;
  language?: string;
}

/**
 * Part definition in a facet.
 */
export interface PartDefinition extends PartTypeIds {
  name: string;
  description: string;
  isRequired: boolean;
  colorKey: string;
  groupKey: string;
  sortKey: string;
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
  colorKey: string;
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
 * The group key for a part type. This is used in EditorKeys objects
 * to map a specific part ID with all its fragment IDs into group key(s).
 * The part ID is used alone with normal parts; for layer parts, it is
 * used in conjunction with 1 or more fragment type IDs, each mapped to
 * a corresponding editor key.
 */
export interface PartGroupKey {
  part: string;
  fragments?: { [key: string]: string };
}

/**
 * Part type IDs to editor keys mappings. This contains a set of component
 * type IDs (parts and parts + fragments) mapped to editor keys, which are
 * used to build their routes in the UI.
 */
export interface PartEditorKeys {
  [key: string]: PartGroupKey;
}

/**
 * An index lookup definition, used in dynamic lookup to provide the set
 * of parameters required for a data pins based search.
 */
export interface IndexLookupDefinition {
  typeId?: string;
  roleId?: string;
  name: string;
}

/**
 * A dictionary of index lookup definitions.
 */
export interface IndexLookupDefinitions {
  [key: string]: IndexLookupDefinition;
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

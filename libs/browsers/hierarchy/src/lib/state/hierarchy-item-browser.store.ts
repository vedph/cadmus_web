import { StoreConfig, EntityStore, EntityState } from '@datorama/akita';
import { ItemInfo, Thesaurus } from '@cadmus/core';
import { Injectable } from '@angular/core';

export const HIERARCHY_ITEM_BROWSER_TYPEID =
  'net.fusisoft.item-browser.hierarchy';

export interface HierarchyItemBrowserPayload {
  y: number;
  x: number;
  childCount: number;
}

/**
 * Generic tree node.
 */
export interface TreeNode {
  /**
   * This property tells whether the node is a "left" pager (-1),
   * a "right" pager (+1), or an item node (falsy).
   */
  pager?: number;
}

/**
 * A pager node, used to add paging controls inside a tree.
 */
export interface PagerTreeNode extends TreeNode {
  pageNumber: number;
  pageCount: number;
  total: number;
}

/**
 * An item node, representing the item in a tree.
 */
export interface ItemTreeNode extends TreeNode {
  id: string;
  label: string;
  parent: ItemTreeNode;
  children?: TreeNode[];
  facetId: string;
  flags: number;
  description: string;
  payload: HierarchyItemBrowserPayload;
}

export interface HierarchyItemBrowserState
  extends EntityState<ItemInfo, string> {
  root: ItemTreeNode | null;
  tags?: Thesaurus;
  loading?: boolean;
  error?: string;
}

const initialState: HierarchyItemBrowserState = {
  root: null,
  tags: null,
  loading: false,
  error: null
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: HIERARCHY_ITEM_BROWSER_TYPEID })
export class HierarchyItemBrowserStore extends EntityStore<
  HierarchyItemBrowserState
> {
  constructor() {
    super(initialState);
  }

  /**
   * Set the root node.
   *
   * @param value The root node.
   */
  public setRoot(value: ItemTreeNode | null): void {
    this.update({ root: value });
  }

  /**
   * Set the tags thesaurus.
   *
   * @param value The thesaurus.
   */
  public setTags(value: Thesaurus | null): void {
    this.update({ tags: value });
  }
}

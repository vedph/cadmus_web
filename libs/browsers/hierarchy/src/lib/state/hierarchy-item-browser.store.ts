import { StoreConfig, EntityStore, EntityState } from '@datorama/akita';
import { ItemInfo, Thesaurus } from '@cadmus/core';
import { Injectable } from '@angular/core';

export const HIERARCHY_ITEM_BROWSER_TYPEID =
  'net.fusisoft.item-browser.mongo.hierarchy';

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
   * The 0-based depth level.
   */
  level: number;
  /**
   * The parent item node.
   */
  parent: ItemTreeNode;
  /**
   * The number of the page this node belongs to.
   */
  pageNumber: number;
  /**
   * This property tells whether the node is a "prev" pager (-1),
   * a "next" pager (+1), or an item node (falsy).
   */
  pager?: number;
  loading?: boolean;
}

/**
 * A pager node, used to add paging controls inside a tree.
 */
export interface PagerTreeNode extends TreeNode {
  pageCount: number;
  total: number;
}

/**
 * An item node, representing the item in a tree.
 */
export interface ItemTreeNode extends TreeNode {
  id: string;
  label: string;
  children?: TreeNode[];
  facetId: string;
  flags: number;
  description: string;
  payload: HierarchyItemBrowserPayload;
}

export interface HierarchyItemBrowserState
  extends EntityState<ItemInfo, string> {
  nodes: TreeNode[];
  tags?: Thesaurus;
  loading?: boolean;
  error?: string;
}

const initialState: HierarchyItemBrowserState = {
  nodes: [],
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
   * Set the nodes.
   *
   * @param value The nodes.
   */
  public setNodes(value: TreeNode[]): void {
    this.update({ nodes: value });
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

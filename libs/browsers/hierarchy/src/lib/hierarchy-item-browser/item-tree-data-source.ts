import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, merge } from 'rxjs';
import {
  TreeNode,
  ItemTreeNode,
  PagerTreeNode,
  HIERARCHY_ITEM_BROWSER_TYPEID
} from '../state/hierarchy-item-browser.store';
import { FlatTreeControl } from '@angular/cdk/tree';
import { CollectionViewer, SelectionChange } from '@angular/cdk/collections';
import { map } from 'rxjs/operators';
import { ItemInfo, DataPage } from '@cadmus/core';
import { ItemBrowserService } from '@cadmus/api';

// Angular dynamic tree official sample:
// https://stackblitz.com/angular/bqnqjjvgjym

@Injectable()
export class ItemTreeDataSource {
  private _tag: string;
  private _pageSize: number;

  /**
   * The observable with the visible nodes array.
   */
  public data$: BehaviorSubject<TreeNode[]>;
  /**
   * Observable with a flag which is true when the tree root node(s)
   * are loading.
   */
  public rootLoading$: BehaviorSubject<boolean>;

  /**
   * The tree nodes array representing this source's data.
   */
  public get data(): TreeNode[] {
    return this.data$.value;
  }
  public set data(value: TreeNode[]) {
    this._treeControl.dataNodes = value;
    this.data$.next(value);
  }

  /**
   * The tag filter. Changing this property resets the tree.
   */
  public get tag(): string | null {
    return this._tag;
  }
  public set tag(value: string | null) {
    if (this._tag === value) {
      return;
    }
    this._tag = value;
    this.reset();
  }

  /**
   * The level page size. Changing this property resets the tree.
   */
  public get pageSize(): number {
    return this._pageSize;
  }
  public set pageSize(value: number) {
    if (this._pageSize === value) {
      return;
    }
    this._pageSize = value;
    this.reset();
  }

  constructor(
    private _treeControl: FlatTreeControl<TreeNode>,
    private _itemBrowserService: ItemBrowserService
  ) {
    this._tag = null;
    this.data$ = new BehaviorSubject<TreeNode[]>([]);
    this.rootLoading$ = new BehaviorSubject<boolean>(false);
    this._pageSize = 20;
  }

  /**
   * Reset the tree by removing all the nodes and reloading the root
   * node(s).
   */
  public reset() {
    this.rootLoading$.next(true);
    this._itemBrowserService
      .getItems(HIERARCHY_ITEM_BROWSER_TYPEID, 1, 0, {
        tag: this.tag,
        parentId: null
      })
      .subscribe(
        page => {
          this.rootLoading$.next(false);
          this.data = this.pageToNodes(page, null);
        },
        error => {
          console.error('Error loading root node(s): ' + error);
          this.rootLoading$.next(false);
        }
      );
  }

  /**
   * Convert the specified item info into an item tree node.
   *
   * @param item The item info.
   * @param pageNumber The number of the page the item belongs to.
   * @param parent The parent node.
   */
  private itemToNode(
    item: ItemInfo,
    pageNumber: number,
    parent: ItemTreeNode
  ): ItemTreeNode {
    return {
      level: parent ? parent.level + 1 : 0,
      pageNumber: pageNumber,
      id: item.id,
      label: item.title,
      facetId: item.facetId,
      flags: item.flags,
      description: item.description,
      payload: item.payload
    };
  }

  /**
   * Convert the specified page of items info into an array of tree
   * nodes.
   *
   * @param page The items info page.
   * @param parentNode The parent node.
   */
  private pageToNodes(
    page: DataPage<ItemInfo>,
    parentNode: ItemTreeNode
  ): TreeNode[] {
    // empty
    if (!page.total) {
      return [];
    }

    // N pages
    if (page.pageCount > 1) {
      const pageLevel = parentNode ? parentNode.level + 1 : 0;
      const nodes = [];

      // 'prev' pager
      nodes.push({
        level: pageLevel,
        parent: parentNode,
        pager: -1,
        pageNumber: page.pageNumber,
        pageCount: page.pageCount,
        total: page.total
      } as PagerTreeNode);

      // items
      nodes.push(
        page.items.map(i => {
          return this.itemToNode(i, page.pageNumber, parentNode);
        })
      );

      // 'next' pager
      nodes.push({
        level: pageLevel,
        parent: parentNode,
        pager: 1,
        pageNumber: page.pageNumber,
        pageCount: page.pageCount,
        total: page.total
      } as PagerTreeNode);
    } else {
      // just 1 page
      return page.items.map(i => {
        return this.itemToNode(i, page.pageNumber, parentNode);
      });
    }
  }

  /**
   * Get the boundary indexes for the children nodes at the specified
   * level in the data array.
   *
   * @param level The children level.
   * @returns Object with start (inclusive) and end (exclusive), or
   * null if no child at the specified level found.
   */
  private getChildrenBounds(
    level: number
  ): { start: number; end: number } | null {
    let start = 0;
    while (start < this.data.length && this.data[start].level !== level) {
      start++;
    }
    if (start === this.data.length) {
      return null;
    }
    let end = start + 1;
    while (end < this.data.length && this.data[end].level === level) {
      end++;
    }
    return {
      start,
      end
    };
  }

  private loadChildNodes(
    tag: string,
    pageNumber: number,
    pageSize: number,
    parentNode: ItemTreeNode
  ): Observable<TreeNode[]> {
    const nodes$ = this._itemBrowserService
      .getItems(HIERARCHY_ITEM_BROWSER_TYPEID, pageNumber, pageSize, {
        tag: tag,
        parentId: parentNode.id
      })
      .pipe(
        map(page => {
          return this.pageToNodes(page, parentNode);
        })
      );
    return nodes$;
  }

  /**
   * Toggle the node by expanding or collapsing it.
   *
   * @param node The node.
   * @param expand True to expand, false to collapse.
   */
  public toggleNode(node: TreeNode, expand: boolean) {
    if (node.pager) {
      // should not happen
      return;
    }

    // the node to toggle should exist, else nope
    const index = this.data.indexOf(node);
    if (index === -1) {
      return;
    }
    const itemNode = node as ItemTreeNode;

    // collapse: remove children if any
    if (!expand) {
      const bounds = this.getChildrenBounds(node.level + 1);
      if (!bounds) {
        return;
      }
      this.data.splice(bounds.start, bounds.end - bounds.start);
      // notify the change
      this.data$.next(this.data);
      return;
    }

    // expand: load children
    node.loading = true;

    this.loadChildNodes(this._tag, 1, this._pageSize, itemNode).subscribe(
      (nodes: TreeNode[]) => {
        // insert children nodes after their parent
        nodes = nodes || [];
        if (nodes.length) {
          this.data.splice(index + 1, 0, ...nodes);
          // notify the change
          this.data$.next(this.data);
        }
        node.loading = false;
      },
      error => {
        console.error('Error loading items page: ' + error);
        node.loading = false;
      }
    );
  }

  private getParentNode(node: TreeNode) {
    if (!node.level) {
      return null;
    }
    let i = this.data.indexOf(node);
    const parentLevel = node.level - 1;
    while (i > -1 && this.data[i].level !== parentLevel) {
      i--;
    }
    return i === -1 ? null : this.data[i];
  }

  /**
   * Apply the function of the specified pager node, switching to the page
   * defined by it.
   *
   * @param node The pager node.
   */
  public applyPager(node: PagerTreeNode) {
    // check for page boundaries
    if (
      (node.pager === -1 && node.pageNumber < 2) ||
      (node.pager === 1 && node.pageNumber + 1 >= node.pageCount)
    ) {
      return;
    }
    const reqPageNumber =
      node.pager === -1 ? node.pageNumber - 1 : node.pageNumber + 1;

    // expand: load children
    const parent = this.getParentNode(node);
    parent.loading = true;

    this.loadChildNodes(
      this._tag,
      reqPageNumber,
      this._pageSize,
      parent as ItemTreeNode
    ).subscribe(
      (nodes: TreeNode[]) => {
        // insert children nodes after their parent
        this.data.splice(this.data.indexOf(parent) + 1, 0, ...nodes);
        // notify the change
        this.data$.next(this.data);
        node.loading = false;
      },
      error => {
        console.error('Error loading items page: ' + error);
        node.loading = false;
      }
    );
  }

  /**
   * Handle expand/collapse behaviors.
   *
   * @param change The change.
   */
  public handleTreeControl(change: SelectionChange<TreeNode>) {
    if (change.added) {
      change.added.forEach(node => this.toggleNode(node, true));
    }
    if (change.removed) {
      change.removed.reverse().forEach(node => this.toggleNode(node, false));
    }
  }

  public connect(collectionViewer: CollectionViewer): Observable<TreeNode[]> {
    this._treeControl.expansionModel.changed.subscribe(change => {
      if (
        (change as SelectionChange<TreeNode>).added ||
        (change as SelectionChange<TreeNode>).removed
      ) {
        this.handleTreeControl(change as SelectionChange<TreeNode>);
      }
    });

    return merge(collectionViewer.viewChange, this.data$).pipe(
      map(() => this.data)
    );
  }
}

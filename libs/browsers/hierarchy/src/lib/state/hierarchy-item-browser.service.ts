import { Injectable } from '@angular/core';
import { ItemBrowserService, ThesaurusService } from '@cadmus/api';
import {
  HierarchyItemBrowserStore,
  HIERARCHY_ITEM_BROWSER_TYPEID,
  ItemTreeNode,
  HierarchyItemBrowserPayload,
  TreeNode,
  PagerTreeNode
} from './hierarchy-item-browser.store';
import { forkJoin, Observable } from 'rxjs';
import { DataPage, ItemInfo } from '@cadmus/core';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class HierarchyItemBrowserService {
  constructor(
    private _store: HierarchyItemBrowserStore,
    private _itemBrowserService: ItemBrowserService,
    private _thesaurusService: ThesaurusService
  ) {}

  private createRootNode(page: DataPage<ItemInfo>): ItemTreeNode {
    if (!page.total) {
      return null;
    }
    const item = page.items[0];

    return {
      id: item.id,
      label: item.title,
      parent: null,
      children: null,
      facetId: item.facetId,
      flags: item.flags,
      description: item.description,
      payload: item.payload as HierarchyItemBrowserPayload
    };
  }

  private createNode(item: ItemInfo, parent: ItemTreeNode): ItemTreeNode {
    return {
      id: item.id,
      label: item.title,
      parent: parent,
      children: null,
      facetId: item.facetId,
      flags: item.flags,
      description: item.description,
      payload: item.payload
    };
  }

  private getRootNode(node: ItemTreeNode): ItemTreeNode | null {
    if (!node.parent) {
      return node;
    }
    let n = node.parent;
    while (n && n.parent) {
      n = n.parent;
    }
    return n;
  }

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
      const nodes = [];
      // 'left' pager
      nodes.push({
        pager: -1,
        pageNumber: page.pageNumber,
        pageCount: page.pageCount,
        total: page.total
      } as PagerTreeNode);

      // items
      nodes.push(
        page.items.map(i => {
          return this.createNode(i, parentNode);
        })
      );

      // 'right' pager
      nodes.push({
        pager: 1,
        pageNumber: page.pageNumber,
        pageCount: page.pageCount,
        total: page.total
      } as PagerTreeNode);
    } else {
      // just 1 page
      return page.items.map(i => {
        return this.createNode(i, parentNode);
      });
    }
  }

  /**
   * Load the root node of the hierarchy and the tags thesaurus if any.
   * The root node is requested to the server via a 1-item-sized page
   * with a null parent item ID and the specified tag.
   *
   * @param tag The optional tag to be matched in items hierarchy parts.
   * @param tagThesaurusId The optional tags thesaurus ID.
   */
  public load(tag: string, tagThesaurusId: string) {
    this._store.setLoading(true);

    const page$ = this._itemBrowserService.getItems(
      HIERARCHY_ITEM_BROWSER_TYPEID,
      1,
      1,
      {
        tag: tag,
        parentId: null
      }
    );

    // load both thesaurus and root node if required
    if (tagThesaurusId) {
      forkJoin({
        tags: this._thesaurusService.getThesaurus(tagThesaurusId, true),
        page: page$
      }).subscribe(
        result => {
          this._store.setLoading(false);
          this._store.setRoot(this.createRootNode(result.page));
          this._store.setTags(result.tags.entries.length ? result.tags : null);
        },
        error => {
          console.error(error);
          this._store.setLoading(false);
          this._store.setError('Error loading root item');
        }
      );
    } else {
      // else just load the root node
      page$.subscribe(
        result => {
          this._store.setLoading(false);
          this._store.setError(null);
          this._store.setRoot(this.createRootNode(result));
        },
        error => {
          console.error(error);
          this._store.setLoading(false);
          this._store.setError('Error loading root item');
        }
      );
    }
  }

  private copyChildrenWithReplace(
    source: TreeNode,
    target: ItemTreeNode,
    sourceParent: ItemTreeNode,
    newChildren: TreeNode[]
  ) {
    // pager nodes have no children
    if (!source || source.pager) {
      return;
    }

    const itemSource = source as ItemTreeNode;
    target.children = [];

    // replace children if required
    if (itemSource === sourceParent) {
      for (let i = 0; i < newChildren.length; i++) {
        const newChild = newChildren[i];
        if (!newChild.pager) {
          const newItemChild = newChild as ItemTreeNode;
          newItemChild.parent = target;
        }
        target.children.push(newChild);
      }
      return;
    }
    // nope if no children
    if (!itemSource.children || itemSource.children.length === 0) {
      return;
    }
    // for each source-child
    for (let i = 0; i < itemSource.children.length; i++) {
      const oldChild = itemSource.children[i];
      // clone and add it to target
      const newChild = Object.assign({}, oldChild);
      if (!newChild.pager) {
        const newItemChild = newChild as ItemTreeNode;
        newItemChild.parent = target;
      }
      target.children.push(newChild);

      // copy its children if not a pager
      if (!newChild.pager) {
        this.copyChildrenWithReplace(
          oldChild,
          newChild as ItemTreeNode,
          sourceParent,
          newChildren
        );
      }
    }
  }

  /**
   * Set children nodes for the specified parent node, creating a new tree
   * and returning it. This is required to replace the whole root node in
   * the store.
   *
   * @param parent The parent node whose children must be set.
   * @param children The children nodes to be set.
   */
  private setChildrenInNewTree(
    parent: ItemTreeNode,
    children: TreeNode[]
  ): ItemTreeNode {
    const oldRoot = this.getRootNode(parent);
    const newRoot = Object.assign({}, oldRoot);
    this.copyChildrenWithReplace(oldRoot, newRoot, parent, children);
    return newRoot;
  }

  /**
   * Load the page of nodes which are children of the specified node.
   *
   * @param tag The optional tag to be matched in items hierarchy parts.
   * @param parentId The ID of the parent item.
   * @param pageNumber The page number.
   * @param pageSize The page size.
   * @param parentNode The parent node.
   * @returns The observable being used to load the nodes. This will
   * be used to populate the store, but callers can subscribe to it
   * to further process the returned nodes.
   */
  public loadChildNodes(
    tag: string,
    pageNumber: number,
    pageSize: number,
    parentNode: ItemTreeNode
  ): Observable<TreeNode[]> {
    console.log('loadChildNodes for: ' + parentNode.label)
    this._store.setLoading(true);

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

    nodes$.subscribe(
      nodes => {
        this._store.setLoading(false);

        let newRoot: ItemTreeNode;
        // empty
        if (!nodes.length) {
          newRoot = this.setChildrenInNewTree(parentNode, []);
        } else {
          newRoot = this.setChildrenInNewTree(parentNode, nodes);
        }
        this._store.setRoot(newRoot);
      },
      error => {
        console.error(error);
        this._store.setLoading(false);
        this._store.setError('Error loading items page');
      }
    );
    return nodes$;
  }
}

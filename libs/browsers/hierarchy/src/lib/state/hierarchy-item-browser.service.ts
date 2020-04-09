import { Injectable } from '@angular/core';
import { ItemBrowserService, ThesaurusService } from '@cadmus/api';
import {
  HierarchyItemBrowserStore,
  HIERARCHY_ITEM_BROWSER_TYPEID,
  ItemTreeNode,
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
      parent: parent,
      children: null,
      facetId: item.facetId,
      flags: item.flags,
      description: item.description,
      payload: item.payload
    };
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
          return this.itemToNode(i, page.pageNumber, parentNode);
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
        return this.itemToNode(i, page.pageNumber, parentNode);
      });
    }
  }

  /**
   * Load the root node(s) of the hierarchy and the tags thesaurus if any.
   * The root node(s) is requested to the server via a 0-item-sized page
   * with a null parent item ID and the specified tag.
   *
   * @param tag The optional tag to be matched in items hierarchy parts.
   * @param tagThesaurusId The optional tags thesaurus ID.
   */
  public load(tag: string, tagThesaurusId: string) {
    this._store.setLoading(true);
/*
    const page$ = this._itemBrowserService.getItems(
      HIERARCHY_ITEM_BROWSER_TYPEID,
      1,
      0,
      {
        tag: tag,
        parentId: null
      }
    );

    // load both thesaurus and root nodes if required
    if (tagThesaurusId) {
      forkJoin({
        tags: this._thesaurusService.getThesaurus(tagThesaurusId, true),
        page: page$
      }).subscribe(
        result => {
          this._store.setLoading(false);
          this._store.setNodes(
            result.page.items.map(item => this.itemToNode(item, null))
          );
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
        page => {
          this._store.setLoading(false);
          this._store.setError(null);
          this._store.setNodes(
            page.items.map(item => this.itemToNode(item, null))
          );
        },
        error => {
          console.error(error);
          this._store.setLoading(false);
          this._store.setError('Error loading root item');
        }
      );
    }
    */
  }

  private replaceChildren(
    nodes: TreeNode[],
    parentNode: ItemTreeNode,
    newChildren: TreeNode[]
  ): TreeNode[] {
    const childLevel = parentNode.level + 1;
    let start = 0;
    while (start < nodes.length && nodes[start].level !== childLevel) {
      start++;
    }
    if (start === nodes.length) {
      return nodes;
    }
    let end = start + 1;
    while (end < nodes.length && nodes[end].level === childLevel) {
      end++;
    }
    const copy = nodes.slice();
    copy.splice(start, end - start, ...newChildren);
    return copy;
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
    console.log('loadChildNodes for: ' + parentNode.label);
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
        const newNodes = this.replaceChildren(
          this._store.getValue().nodes,
          parentNode,
          nodes
        );
        this._store.setNodes(newNodes);
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

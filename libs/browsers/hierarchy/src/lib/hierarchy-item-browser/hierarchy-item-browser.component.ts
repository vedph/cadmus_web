import { Component, OnInit } from '@angular/core';
import {
  ItemTreeNode,
  TreeNode,
  PagerTreeNode
} from '../state/hierarchy-item-browser.store';
import { HierarchyItemBrowserService } from '../state/hierarchy-item-browser.service';
import { Observable } from 'rxjs';
import { Thesaurus } from '@cadmus/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ItemTreeDataSource } from './item-tree-data-source';
import { ItemBrowserService } from '@cadmus/api';
import { Router } from '@angular/router';
import { HierarchyItemBrowserQuery } from '../state/hierarchy-item-browser.query';

const TAGS_THESAURUS_ID = 'hierarchy-item-browser-tags';

/**
 * Hierarchical items browser.
 * Thesaurus (optional): hierarchy-item-browser-tags.
 */
@Component({
  selector: 'cadmus-hierarchy-item-browser',
  templateUrl: './hierarchy-item-browser.component.html',
  styleUrls: ['./hierarchy-item-browser.component.css']
})
export class HierarchyItemBrowserComponent implements OnInit {
  public nodes$: Observable<TreeNode[]>;
  public tags$: Observable<Thesaurus>;
  public loading: boolean;
  public treeControl: FlatTreeControl<TreeNode>;
  public treeDataSource: ItemTreeDataSource;

  public tag: FormControl;
  public filters: FormGroup;

  constructor(
    formBuider: FormBuilder,
    private _router: Router,
    private _itemBrowserService: ItemBrowserService,
    private _storeService: HierarchyItemBrowserService,
    private _storeQuery: HierarchyItemBrowserQuery
  ) {
    this.loading = false;

    // form
    this.tag = formBuider.control(null);
    this.filters = formBuider.group({
      tag: this.tag
    });

    // tree control with its children loader function
    this.treeControl = new FlatTreeControl<TreeNode>(
      node => node?.level || 0,
      node => node && !node.pager
    );

    this.treeDataSource = new ItemTreeDataSource(
      this.treeControl,
      this._itemBrowserService
    );

    this.tags$ = this._storeQuery.selectTags();
  }

  ngOnInit(): void {
    this._storeService.loadTags(TAGS_THESAURUS_ID);

    // retrieve the nodes from the store, or just start with root node(s)
    const storedNodes = this._storeQuery.getValue().nodes;
    if (storedNodes?.length > 0) {
      this.treeDataSource.data = JSON.parse(JSON.stringify(storedNodes));
    } else {
      this.treeDataSource.reset();
    }

    // when tag changes, change it in the data source
    this.tag.valueChanges.subscribe(_ => {
      this.treeDataSource.tag = this.tag.value ? this.tag.value : null;
    });
  }

  public getData(): TreeNode[] {
    return this.treeDataSource.data;
  }

  public onTreeNodeClick(node: TreeNode) {
    if (!node.pager) {
      const itemNode = node as ItemTreeNode;
      this._router.navigate(['/items', itemNode.id]);
    }
  }

  public onPagerNodeClick(node: TreeNode) {
    this.treeDataSource.applyPager(node as PagerTreeNode);
  }

  public hasChildren = (index: number, node: TreeNode) => {
    if (!node || node.pager) {
      return false;
    }
    return true;
    // const itemNode = node as ItemTreeNode;
    // return itemNode.children && itemNode.children.length > 0;
  };

  public isPrevPager = (index: number, node: TreeNode) => {
    return node && node.pager === -1;
  };

  public isNextPager = (index: number, node: TreeNode) => {
    return node && node.pager === 1;
  };
}

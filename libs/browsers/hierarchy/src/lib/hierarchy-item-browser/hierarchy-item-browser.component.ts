import { Component, OnInit } from '@angular/core';
import { ItemTreeNode, TreeNode } from '../state/hierarchy-item-browser.store';
import { HierarchyItemBrowserService } from '../state/hierarchy-item-browser.service';
import { Observable } from 'rxjs';
import { Thesaurus } from '@cadmus/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ItemTreeDataSource } from './item-tree-data-source';
import { ItemBrowserService } from '@cadmus/api';

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

  public currentNode: TreeNode;

  constructor(
    formBuider: FormBuilder,
    private _itemBrowserService: ItemBrowserService,
    private _storeService: HierarchyItemBrowserService
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
      node => node && !node.pager && !(node as ItemTreeNode).children
    );

    this.treeDataSource = new ItemTreeDataSource(
      this.treeControl,
      this._itemBrowserService
    );

    // TODO query tags from store
  }

  ngOnInit(): void {
    // by default, load the root node(s) for a null tag
    // this._storeService.load(null, TAGS_THESAURUS_ID);
    this.treeDataSource.reset();

    // when tag changes, change it in the data source
    this.tag.valueChanges.subscribe(_ => {
      this.currentNode = null;
      this.treeDataSource.tag = this.tag.value ? this.tag.value : null;
    });
  }

  public onTreeNodeClick(node: TreeNode) {
    this.currentNode = node;
    if (node.pager) {
      // TODO: prev/next page
    } else {
      // TODO: navigate to item editor
    }
  }

  public hasChildren = (index: number, node: TreeNode) => {
    if (!node || node.pager) {
      return false;
    }
    return true;
    // const itemNode = node as ItemTreeNode;
    // return itemNode.children && itemNode.children.length > 0;
  };
}

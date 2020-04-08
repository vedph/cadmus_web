import { Component, OnInit } from '@angular/core';
import { ItemTreeNode, TreeNode } from '../state/hierarchy-item-browser.store';
import { HierarchyItemBrowserService } from '../state/hierarchy-item-browser.service';
import { HierarchyItemBrowserQuery } from '../state/hierarchy-item-browser.query';
import { Observable } from 'rxjs';
import { Thesaurus } from '@cadmus/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

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
  public root$: Observable<ItemTreeNode>;
  public tags$: Observable<Thesaurus>;
  public treeControl: NestedTreeControl<TreeNode>;
  public treeDataSource: MatTreeNestedDataSource<TreeNode>;

  public tag: FormControl;
  public filters: FormGroup;

  constructor(
    formBuider: FormBuilder,
    storeQuery: HierarchyItemBrowserQuery,
    private _storeService: HierarchyItemBrowserService
  ) {
    // form
    this.tag = formBuider.control(null);
    this.filters = formBuider.group({
      tag: this.tag
    });

    // tree control with its children loader function
    this.treeControl = new NestedTreeControl<TreeNode>((node: TreeNode) => {
      // if the parent node is a pager, do nothing
      if (node.pager) {
        return;
      }
      // if the item node already has children, just return them
      const itemNode = node as ItemTreeNode;
      if (itemNode.children) {
        return itemNode.children;
      }
      // else load them into the store and return the observable
      // used for loading, so that the UI is happy, too
      return this._storeService.loadChildNodes(this.tag.value, 1, 20, itemNode);
    });

    this.treeDataSource = new MatTreeNestedDataSource();

    this.root$ = storeQuery.selectRoot();
    this.tags$ = storeQuery.selectTags();
  }

  ngOnInit(): void {
    // by default, load the root node for a null tag
    this._storeService.load(null, TAGS_THESAURUS_ID);

    // when tag changes, reload all
    this.tag.valueChanges.subscribe(_ => {
      const tagFilter = this.tag.value ? this.tag.value : null;
      this._storeService.load(tagFilter, TAGS_THESAURUS_ID);
    });
  }

  public onTreeNodeClick(node: TreeNode) {
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
    const itemNode = node as ItemTreeNode;
    return itemNode.children && itemNode.children.length > 0;
  };
}

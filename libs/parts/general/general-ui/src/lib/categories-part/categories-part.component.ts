import { Component, OnInit } from '@angular/core';
import { CategoriesPart, CATEGORIES_PART_TYPEID } from '../categories-part';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ModelEditorComponentBase } from '@cadmus/ui';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { of } from 'rxjs';
import { AuthService } from '@cadmus/api';
import { sep } from 'path';

interface TreeNode {
  id: string;
  label: string;
  children?: TreeNode[];
  clickable?: boolean;
}

interface Pair<T> {
  value: T;
  id: string;
}

/**
 * Categories component editor.
 * Thesaurus: "categories".
 */
@Component({
  selector: 'cadmus-categories-part',
  templateUrl: './categories-part.component.html',
  styleUrls: ['./categories-part.component.css']
})
export class CategoriesPartComponent
  extends ModelEditorComponentBase<CategoriesPart>
  implements OnInit {
  // form
  public categories: FormControl;
  // available categories tree
  public root: TreeNode;
  public treeControl: NestedTreeControl<TreeNode>;
  public treeDataSource: MatTreeNestedDataSource<TreeNode>;

  constructor(authService: AuthService, formBuilder: FormBuilder) {
    super(authService);
    // tree
    this.treeControl = new NestedTreeControl<TreeNode>((n: TreeNode) => {
      return of(n.children);
    });
    this.treeDataSource = new MatTreeNestedDataSource();
    // form
    this.categories = formBuilder.control([], Validators.required);
    this.form = formBuilder.group({
      categories: this.categories
    });
  }

  ngOnInit() {
    this.initEditor();
  }

  protected onModelSet(model: CategoriesPart) {
    if (!model) {
      this.categories.reset();
      return;
    }
    const cc = Object.assign([], model.categories);
    cc.sort();
    this.categories.setValue(cc);
  }

  protected getModelFromForm(): CategoriesPart {
    let part = this.getModelFromJson();
    if (!part) {
      part = {
        itemId: null,
        id: null,
        typeId: CATEGORIES_PART_TYPEID,
        roleId: null,
        timeCreated: new Date(),
        creatorId: null,
        timeModified: new Date(),
        userId: null,
        categories: []
      };
    }
    part.categories = [...this.categories.value];
    return part;
  }

  public hasChildren = (index: number, node: TreeNode) => {
    return node && node.children && node.children.length > 0;
  };

  private addNode(pair: Pair<string>, separator: string, root: TreeNode) {
    const components = pair.value.split(separator);

    // walk the tree up to the last existing component
    let i = 0;
    let node = root;
    const idParts: string[] = [];

    // for each component:
    while (i < components.length) {
      idParts.push(components[i]);

      // stop walking when the node has no more children
      if (!node.children) {
        break;
      }
      // find target among children
      const targetId = idParts.join(separator);
      const existing = node.children.find(c => {
        return c.id === targetId;
      });
      if (existing) {
        node = existing;
        i++;
      } else {
        break;
      }
    }
    // node is now the last existing component, use it as the ancestor
    // for all the remaining components (starting from i)
    while (i < components.length) {
      if (!node.children) {
        node.children = [];
      }
      const isLast = i + 1 === components.length;
      const child: TreeNode = {
        label: isLast ? pair.id : components[i],
        id: isLast ? pair.value : idParts.join(separator),
        children: []
      };
      node.children.push(child);
      node = child;
      i++;
    }
  }

  /**
   * Build a tree model from a list of name=value pairs,
   * where each value can include one or more components separated by
   * the specified separator.
   * @param rootValue string The root node label value.
   * @param pairs IPair<string>[] The list of pairs to add.
   * @param separator string The separator string to use for values.
   */
  public buildTreeModel(
    rootValue: string,
    pairs: Pair<string>[],
    separator = '.'
  ): TreeNode {
    const root: TreeNode = {
      id: '@root',
      label: rootValue || '-'
    };
    if (!pairs) {
      return root;
    }
    pairs.forEach(p => {
      this.addNode(p, separator, root);
    });
    return root;
  }

  protected onThesauriSet() {
    const key = 'categories';
    if (this.thesauri && this.thesauri[key]) {
      const categoriesThes = this.thesauri[key];
      this.root = this.buildTreeModel(
        key,
        categoriesThes.entries.map(e => {
          return {
            id: e.value,
            value: e.id
          };
        })
      );
    } else {
      this.root = {
        id: '@root',
        label: '-',
        children: []
      };
    }
    this.treeDataSource.data = this.root.children;
  }

  public onTreeNodeClick(node: TreeNode) {
    if (
      (node.children && node.children.length > 0) ||
      this.categories.value.some((id: string) => id === node.id)
    ) {
      return;
    }
    const cc = Object.assign([], this.categories.value);
    cc.push(node.id.toString());
    cc.sort();
    this.categories.markAsDirty();
    this.categories.setValue(cc);
  }

  public removeCategory(category: string) {
    const i = this.categories.value.findIndex((c: string) => {
      return c === category;
    });
    if (i > -1) {
      const cc = Object.assign([], this.categories.value);
      cc.splice(i, 1);
      this.categories.markAsDirty();
      this.categories.setValue(cc);
    }
  }
}

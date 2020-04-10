import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { HierarchyItemBrowserComponent } from './hierarchy-item-browser.component';
import { HierarchyItemBrowserService } from '../state/hierarchy-item-browser.service';
import { TreeNode } from '../state/hierarchy-item-browser.store';
import { Observable } from 'rxjs';

/**
 * Guard used to store the current tree before leaving the browser, so that
 * the next time the user comes back to the browser he will find it restored.
 */
@Injectable({
  providedIn: 'root'
})
export class HierarchyItemBrowserCanDeactivateGuard
  implements CanDeactivate<HierarchyItemBrowserComponent> {
  constructor(private _storeService: HierarchyItemBrowserService) {}

  public canDeactivate(
    component: HierarchyItemBrowserComponent
  ): boolean | Observable<boolean> {
    if (!component) {
      return true;
    }
    // store nodes before leaving
    const data: TreeNode[] = component.getData();
    this._storeService.setNodes(
      data?.length > 0 ? data : null
    );
    return true;
  }
}

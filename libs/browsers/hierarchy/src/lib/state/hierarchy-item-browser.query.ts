import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import {
  HierarchyItemBrowserState,
  HierarchyItemBrowserStore
} from './hierarchy-item-browser.store';
import { Observable } from 'rxjs';
import { Thesaurus } from '@cadmus/core';

@Injectable({ providedIn: 'root' })
export class HierarchyItemBrowserQuery extends QueryEntity<
  HierarchyItemBrowserState
> {
  constructor(protected store: HierarchyItemBrowserStore) {
    super(store);
  }

  public selectTags(): Observable<Thesaurus> {
    return this.select(state => state.tags);
  }
}

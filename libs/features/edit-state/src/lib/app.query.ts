import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { AppState, AppStore } from './app.store';
import { Observable } from 'rxjs';
import { FacetDefinition, FlagDefinition, Thesaurus } from '@cadmus/core';

@Injectable({ providedIn: 'root' })
export class AppQuery extends Query<AppState> {
  constructor(protected store: AppStore) {
    super(store);
  }

  public selectFacets(): Observable<FacetDefinition[]> {
    return this.select(state => state.facets);
  }

  public selectFlags(): Observable<FlagDefinition[]> {
    return this.select(state => state.flags);
  }

  public selectTypeThesaurus(): Observable<Thesaurus> {
    return this.select(state => state.typeThesaurus);
  }

  public selectItemBrowserThesaurus(): Observable<Thesaurus> {
    return this.select(state => state.itemBrowserThesaurus);
  }
}

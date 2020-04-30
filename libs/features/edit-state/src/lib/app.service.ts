import { Injectable } from '@angular/core';
import { AppStore } from './app.store';
import { FacetService, FlagService, ThesaurusService } from '@cadmus/api';
import { forkJoin } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AppService {
  constructor(
    private _store: AppStore,
    private _facetService: FacetService,
    private _flagService: FlagService,
    private _thesaurusService: ThesaurusService
  ) {}

  public load() {
    this._store.setLoading(true);

    const facets$ = this._facetService.getFacets();
    const flags$ = this._flagService.getFlags();
    const thesauri$ = this._thesaurusService.getThesauriSet(
      ['model-types@en', 'item-browsers@en']
    );

    forkJoin({
      facets: facets$,
      flags: flags$,
      thesauri: thesauri$
    }).subscribe(
      result => {
        this._store.setLoading(false);
        this._store.setError(null);

        this._store.update({
          facets: result.facets,
          flags: result.flags,
          typeThesaurus: result.thesauri['model-types'],
          itemBrowserThesaurus: result.thesauri['item-browsers']
        });
      },
      error => {
        console.error(error);
        this._store.setLoading(false);
        this._store.setError('Error loading app state');
      }
    );
  }
}

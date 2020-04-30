import { StoreConfig, EntityStore, EntityState } from '@datorama/akita';
import { Thesaurus } from '@cadmus/core';
import { Injectable } from '@angular/core';

export interface ThesauriState extends EntityState<Thesaurus, string> {
}

const initialState = {
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'thesauri' })
export class ThesauriStore extends EntityStore<ThesauriState> {
  constructor() {
    super(initialState);
  }
}

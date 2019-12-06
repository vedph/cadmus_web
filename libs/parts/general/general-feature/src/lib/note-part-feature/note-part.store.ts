import { StoreConfig, Store } from '@datorama/akita';
import { ThesauriSet } from '@cadmus/core';
import { Injectable } from '@angular/core';
import { NotePart } from '@cadmus/parts/general/general-ui';

export interface NotePartState {
  part?: NotePart;
  thesauri?: ThesauriSet;
  // this is implemented in Akita stores, but you must add the keys
  // https://github.com/datorama/akita/issues/61
  loading?: boolean;
  error?: string;
}

export const initialState: NotePartState = {
  part: null,
  thesauri: null,
  loading: false,
  error: null
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'net.fusisoft.note' })
export class NotePartStore extends Store<NotePartState> {
  constructor() {
    super(initialState);
  }
}

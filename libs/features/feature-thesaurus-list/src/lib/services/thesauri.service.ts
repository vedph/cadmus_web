import { Injectable } from '@angular/core';
import { ThesauriStore } from '../state/thesauri.store';
import { ItemService } from '@cadmus/api';

@Injectable({ providedIn: 'root' })
export class ThesauriListService {
  constructor(
    private _store: ThesauriStore,
    private _service: ItemService
  ) {}

  public delete(id: string) {
    this._store.setLoading(true);
    this._service.deleteItem(id).subscribe(
      _ => {
        this._store.remove(id);
        this._store.setLoading(false);
      },
      error => {
        console.error(error);
        this._store.setLoading(false);
      }
    );
  }
}

import { Injectable } from '@angular/core';
import { UtilService } from '@cadmus/core';
import { EditPartQueryBase } from '@cadmus/features/edit-state';
import { EditTokenTextPartStore } from './edit-token-text-part.store';

@Injectable({ providedIn: 'root' })
export class EditTokenTextPartQuery extends EditPartQueryBase {
  constructor(
    store: EditTokenTextPartStore,
    utilService: UtilService
  ) {
    super(store, utilService);
  }
}

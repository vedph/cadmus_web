import { Injectable } from '@angular/core';
import { UtilService } from '@cadmus/core';
import { EditPartQueryBase } from '@cadmus/features/edit-state';
import { EditHistoricalDatePartStore } from './edit-historical-date-part.store';

@Injectable({ providedIn: 'root' })
export class EditHistoricalDatePartQuery extends EditPartQueryBase {
  constructor(store: EditHistoricalDatePartStore, utilService: UtilService) {
    super(store, utilService);
  }
}

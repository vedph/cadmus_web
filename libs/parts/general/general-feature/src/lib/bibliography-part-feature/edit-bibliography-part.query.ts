import { Injectable } from '@angular/core';
import { UtilService } from '@cadmus/core';
import { EditPartQueryBase } from '@cadmus/features/edit-state';
import { EditBibliographyPartStore } from './edit-bibliography-part.store';

@Injectable({ providedIn: 'root' })
export class EditBibliographyPartQuery extends EditPartQueryBase {
  constructor(store: EditBibliographyPartStore, utilService: UtilService) {
    super(store, utilService);
  }
}

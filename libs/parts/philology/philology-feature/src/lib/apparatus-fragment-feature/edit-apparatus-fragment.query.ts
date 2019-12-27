import { Injectable } from '@angular/core';
import { EditFragmentQueryBase } from '@cadmus/features/edit-state';
import { EditApparatusFragmentStore } from './edit-apparatus-fragment.store';

@Injectable({ providedIn: 'root' })
export class EditApparatusFragmentQuery extends EditFragmentQueryBase {
  constructor(
    protected store: EditApparatusFragmentStore
  ) {
    super(store);
  }
}

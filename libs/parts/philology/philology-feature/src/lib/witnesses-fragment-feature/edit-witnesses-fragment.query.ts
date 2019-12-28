import { Injectable } from '@angular/core';
import { EditFragmentQueryBase } from '@cadmus/features/edit-state';
import { EditWitnessesFragmentStore } from './edit-witnesses-fragment.store';

@Injectable({ providedIn: 'root' })
export class EditWitnessesFragmentQuery extends EditFragmentQueryBase {
  constructor(
    protected store: EditWitnessesFragmentStore
  ) {
    super(store);
  }
}

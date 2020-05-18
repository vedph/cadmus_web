import { Injectable } from '@angular/core';
import { EditFragmentQueryBase } from '@cadmus/features/edit-state';
import { EditQuotationsFragmentStore } from './edit-quotations-fragment.store';

@Injectable({ providedIn: 'root' })
export class EditQuotationsFragmentQuery extends EditFragmentQueryBase {
  constructor(
    protected store: EditQuotationsFragmentStore
  ) {
    super(store);
  }
}

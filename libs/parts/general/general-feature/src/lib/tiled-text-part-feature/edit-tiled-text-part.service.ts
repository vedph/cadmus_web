import { Injectable } from '@angular/core';
import { ItemService, ThesaurusService } from '@cadmus/api';
import { EditTiledTextPartStore } from './edit-tiled-text-part.store';
import { EditPartServiceBase } from '@cadmus/features/edit-state';

@Injectable({ providedIn: 'root' })
export class EditTiledTextPartService extends EditPartServiceBase {
  constructor(
    editPartStore: EditTiledTextPartStore,
    itemService: ItemService,
    thesaurusService: ThesaurusService
  ) {
    super(itemService, thesaurusService);
    this.store = editPartStore;
  }

  /**
   * Load the part, a base text part, from its item's ID.
   * This relies on the convention that every base text part should have
   * a "base-text" role ID.
   *
   * @param itemId The item's ID.
   * @param thesauriIds The optional thesauri IDs.
   */
  public loadBaseTextPart(itemId: string, thesauriIds: string[] | null = null) {
    // get the base text part ID from the item's ID
    this.itemService
      .getPartFromTypeAndRole(itemId, null, 'base-text')
      .subscribe(
        part => {
          this.load(part.id, thesauriIds);
        },
        error => {
          this.store.setError(
            'Error retrieving base text part of item ' + itemId
          );
        }
      );
  }
}

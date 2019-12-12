import { Observable } from 'rxjs';
import { ThesauriSet } from '@cadmus/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EditItemQuery, EditItemService, EditPartServiceBase, EditPartQueryBase } from '..';

export abstract class EditPartFeatureBase {
  public json$: Observable<string>;
  public thesauri$: Observable<ThesauriSet>;

  public itemId: string;
  public partId: string;
  public roleId: string;

  constructor(
    protected router: Router,
    route: ActivatedRoute,
    private _editPartQuery: EditPartQueryBase,
    private _editPartService: EditPartServiceBase,
    private _editItemQuery: EditItemQuery,
    private _editItemService: EditItemService
  ) {
    this.itemId = route.snapshot.params['iid'];
    this.partId = route.snapshot.params['pid'];
    if (this.partId === 'new') {
      this.partId = null;
    }
    this.roleId = route.snapshot.queryParams['rid'];
  }

  private ensureItemLoaded(id: string) {
    if (!this._editItemQuery.hasItem(id)) {
      this._editItemService.load(id);
    }
  }

  protected initEditor(thesauriIds: string[]) {
    this.json$ = this._editPartQuery.selectJson(
      this.itemId,
      this.partId,
      this.roleId
    );
    this.thesauri$ = this._editPartQuery.selectThesauri();
    // load item if required
    this.ensureItemLoaded(this.itemId);
    // load part
    if (this.partId) {
      this._editPartService.load(this.partId, thesauriIds);
    }
  }

  public save(json: string) {
    this._editPartService.save(json);
  }

  public close() {
    this.router.navigate(['items', this.itemId]);
  }
}

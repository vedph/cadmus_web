import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  ErrorService,
  ItemFilter,
  ItemInfo,
  DataPage,
  Item,
  Part,
  PartDefinition,
  PartGroup,
  LayerPartInfo,
  LayerHint,
  EnvService
} from '@cadmus/core';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

export interface RolePartId {
  roleId: string;
  partId: string;
}

@Injectable({ providedIn: 'root' })
export class ItemService {
  constructor(
    private _http: HttpClient,
    private _error: ErrorService,
    private _env: EnvService
  ) {}

  /**
   * Get a page of items matching the specified filters.
   *
   * @param filter The items filter.
   * @returns Observable with paged result.
   */
  public getItems(filter: ItemFilter): Observable<DataPage<ItemInfo>> {
    let httpParams = new HttpParams();
    httpParams = httpParams.set('pageNumber', filter.pageNumber.toString());
    httpParams = httpParams.set('pageSize', filter.pageSize.toString());
    if (filter.title) {
      httpParams = httpParams.set('title', filter.title);
    }
    if (filter.description) {
      httpParams = httpParams.set('description', filter.description);
    }
    if (filter.facetId) {
      httpParams = httpParams.set('facetId', filter.facetId);
    }
    if (filter.flags) {
      httpParams = httpParams.set('flags', filter.flags.toString());
    }
    if (filter.userId) {
      httpParams = httpParams.set('userId', filter.userId);
    }
    if (filter.minModified) {
      httpParams = httpParams.set(
        'minModified',
        filter.minModified.toISOString()
      );
    }
    if (filter.maxModified) {
      httpParams = httpParams.set(
        'maxModified',
        filter.maxModified.toISOString()
      );
    }

    return this._http
      .get<DataPage<ItemInfo>>(
        `${this._env.apiUrl}${this._env.databaseId}/items`,
        {
          params: httpParams
        }
      )
      .pipe(
        retry(3),
        catchError(this._error.handleError)
      );
  }

  /**
   * Get a page of items matching the specified filters.
   * @param filter Items filter.
   * @param parts True to get also item's parts.
   * @returns Observable with paged result.
   */
  public getItem(id: string, parts: boolean): Observable<Item> {
    let url = `${this._env.apiUrl}${this._env.databaseId}/item/${id}`;
    if (parts) {
      url += '?parts=true';
    }
    return this._http.get<Item>(url).pipe(retry(3));
  }

  /**
   * Delete the item with the specified ID.
   * @param id The item's ID.
   * @returns Observable with result.
   */
  public deleteItem(id: string): Observable<Object> {
    const url = `${this._env.apiUrl}${this._env.databaseId}/item/${id}`;
    return this._http.delete(url).pipe(catchError(this._error.handleError));
  }

  /**
   * Add or update the specified item.
   * @param item The item.
   * @returns Observable with result.
   */
  public addItem(item: Item): Observable<Item> {
    const url = `${this._env.apiUrl}${this._env.databaseId}/items`;
    return this._http
      .post<Item>(url, item)
      .pipe(catchError(this._error.handleError));
  }

  /**
   * Get the item's part with the specified ID.
   * @param id The part ID.
   * @returns Observable with result.
   */
  public getPart(id: string): Observable<Part> {
    const url = `${this._env.apiUrl}${this._env.databaseId}/part/${id}`;
    return this._http.get<Part>(url).pipe(
      retry(3),
      catchError(this._error.handleError)
    );
  }

  /**
   * From the item with the specified ID, get the first (and normally unique)
   * part matching the specified type and/or role.
   * @param itemId The item ID.
   * @param type The part type or "any".
   * @param role The part role or "default".
   * @returns Observable with result.
   */
  public getPartFromTypeAndRole(
    itemId: string,
    type: string,
    role = 'default'
  ): Observable<Part> {
    if (!type) {
      type = 'any';
    }
    if (!role) {
      role = 'default';
    }
    const url =
      `${this._env.apiUrl}${this._env.databaseId}/` +
      `item/${itemId}/part/${type}/${role}`;
    return this._http.get<Part>(url).pipe(
      retry(3),
      catchError(this._error.handleError)
    );
  }

  /**
   * Get the base text (if any) of the item with the specified ID.
   * @param itemId The item's ID.
   * @returns An observable of an object with a "text" property.
   */
  public getBaseTextPart(
    itemId: string
  ): Observable<{ part: Part; text: string }> {
    const url =
      `${this._env.apiUrl}${this._env.databaseId}/` + `item/${itemId}/base-text`;
    return this._http.get<{ part: Part; text: string }>(url).pipe(
      retry(3),
      catchError(this._error.handleError)
    );
  }

  /**
   * Get the information about all the layer parts in the item with
   * the specified ID. If parameter "absent" is true, the layer parts are added
   * also from the item's facet, even if absent from the database. This produces
   * the full list of all the possible layer parts which could be connected
   * to the given item.
   * Remember that you can have multiple parts of the same type in an item,
   * provided that you specify different roles for them.
   * This happens for the layer part: it is a unique type, but it differs
   * according to its role. Thus, the role here identifies the layer, and
   * in fact it is equal to the layer fragment type ID.
   * Should you need to have several layers of the same type (e.g. 2 comment
   * layers), you can add a layer-specific role to the fragment type ID,
   * by appending it preceded by a colon. For instance, the fragment type ID
   * "fr.net.fusisoft.comment:scholarly" has the ID proper followed by ":"
   * and its role ("scholarly").
   * Thus, the role IDs (=layer type) for layer parts may just be equal
   * to the fragment type ID (e.g. "fr.net.fusisoft.comment"), or include
   * this + colon + role ID proper (e.g."fr.net.fusisoft.comment:scholarly").
   * @param itemId The item's ID.
   * @returns Observable with array of RolePartId's.
   */
  public getItemLayerInfo(
    itemId: string,
    absent: boolean
  ): Observable<LayerPartInfo[]> {
    let url =
      `${this._env.apiUrl}${this._env.databaseId}/` + `item/${itemId}/layers`;
    if (absent) {
      url += '?absent=true';
    }
    return this._http.get<LayerPartInfo[]>(url).pipe(
      retry(3),
      catchError(this._error.handleError)
    );
  }

  /**
   * Get the data pins of the part with the specified ID.
   * @param id The part ID.
   * @returns Observable with array of IDataPin's.
   */
  public getPartPins(id: string): Observable<RolePartId[]> {
    const url = `${this._env.apiUrl}${this._env.databaseId}/` + `part/${id}/pins`;
    return this._http.get<RolePartId[]>(url).pipe(
      retry(3),
      catchError(this._error.handleError)
    );
  }

  /**
   * Get the layer part break chance, a number indicating whether the layer part
   * with the specified ID might potentially be broken because of changes in its
   * base text.
   * @param id The layer part's ID.
   * @returns An object with a chance property equal to 0=not broken, 1=potentially
   * broken, or 2=surely broken.
   */
  public getLayerPartBreakChance(id: string): Observable<{ chance: number }> {
    const url =
      `${this._env.apiUrl}${this._env.databaseId}/` + `part/${id}/break-chance`;
    return this._http.get<{ chance: number }>(url).pipe(
      retry(3),
      catchError(this._error.handleError)
    );
  }

  /**
   * Get the layer part reconciliation hints, one for each fragment.
   * @param id The layer part's ID.
   * @returns A list of layer hints, one per fragment.
   */
  public getLayerPartHints(id: string): Observable<LayerHint[]> {
    const url =
      `${this._env.apiUrl}${this._env.databaseId}/` + `part/${id}/layer-hints`;
    return this._http.get<LayerHint[]>(url).pipe(
      retry(3),
      catchError(this._error.handleError)
    );
  }

  /**
   * Apply a set of patches to the specified layer part.
   *
   * @param id The layer part ID.
   * @param patches The array of patch instructions.
   */
  public applyLayerPatches(id: string, patches: string[]): Observable<Part> {
    const url =
      `${this._env.apiUrl}${this._env.databaseId}/` + `part/${id}/layer-patches`;
    return this._http
      .post<Part>(url, { patches: patches })
      .pipe(catchError(this._error.handleError));
  }

  /**
   * Delete the part with the specified ID.
   * @param id The part's ID.
   * @returns Observable with result.
   */
  public deletePart(id: string): Observable<Object> {
    const url = `${this._env.apiUrl}${this._env.databaseId}/part/${id}`;
    return this._http.delete(url).pipe(catchError(this._error.handleError));
  }

  /**
   * Add or update the specified part.
   * @param item Part The part.
   * @returns The part observable.
   */
  public addPart(part: Part): Observable<Part> {
    const url = `${this._env.apiUrl}${this._env.databaseId}/parts`;
    return this._http
      .post<Part>(url, { raw: JSON.stringify(part) })
      .pipe(catchError(this._error.handleError));
  }

  /**
   * Add or update the specified part.
   * @param item Part The part.
   * @returns Observable with result.
   */
  public addPartJson(json: string): Observable<Object> {
    const url = `${this._env.apiUrl}${this._env.databaseId}/parts`;
    return this._http
      .post(url, { raw: json })
      .pipe(catchError(this._error.handleError));
  }

  /**
   * Set the flags value for all the specified items.
   *
   * @param ids The item IDs.
   * @param flags The flags value to be set.
   */
  public setItemFlags(ids: string[], flags: number): Observable<any> {
    const url = `${this._env.apiUrl}${this._env.databaseId}/items/flags`;
    return this._http
      .post<any>(url, { ids, flags })
      .pipe(catchError(this._error.handleError));
  }

  /**
   * Set the group ID value for all the specified items.
   *
   * @param ids The item IDs.
   * @param groupId The group ID value to be set.
   */
  public setItemGroupId(ids: string[], groupId: string): Observable<any> {
    const url = `${this._env.apiUrl}${this._env.databaseId}/items/groupid`;
    return this._http
      .post<any>(url, { ids, groupId })
      .pipe(catchError(this._error.handleError));
  }

  /**
   * Set the thesaurus scope for all the specified parts.
   *
   * @param ids The part IDs.
   * @param scope The scope to be set.
   */
  public setPartThesaurusScope(ids: string[], scope: string): Observable<any> {
    const url = `${this._env.apiUrl}${this._env.databaseId}/parts/thesscope`;
    return this._http
      .post<any>(url, { ids, scope })
      .pipe(catchError(this._error.handleError));
  }

  /**
   * Group the specified item's parts according to the specified part
   * definitions. This is used to list item's parts in editing it.
   * Each part is grouped under a specific group according to its groupKey,
   * and the parts of each group are sorted according to their sortyKey.
   *
   * @param parts The parts to group.
   * @param partDefs The part definitions to use for grouping.
   * @return The groups.
   */
  public groupParts(parts: Part[], partDefs: PartDefinition[]): PartGroup[] {
    // group the part definitions by their groupKey sorting by sortKey
    const groupedDefs = this.groupBy(
      partDefs.slice().sort((a, b) => {
        return a.sortKey.localeCompare(b.sortKey);
      }),
      'groupKey'
    );

    const groups: PartGroup[] = [];

    // each group of definitions is a property of groupedDefs, whose value
    // is an array of PartDefinition's: now scan each group
    for (const key in groupedDefs) {
      if (!groupedDefs.hasOwnProperty(key)) {
        continue;
      }
      // create a new parts group to be filled
      const group: PartGroup = {
        key: key,
        label: key, // TODO get label from key
        parts: []
      };

      // for each PartDefinition in the group
      groupedDefs[key].forEach((def: PartDefinition) => {
        // get all the item's parts belonging to this parts group
        const filteredParts: Part[] = parts
          .filter(p => {
            return (
              p.typeId === def.typeId && (!p.roleId || p.roleId === def.roleId)
            );
          })
          .sort((a, b) => {
            return (a.roleId || '').localeCompare(b.roleId || '');
          });

        // add each of these parts to the group's parts
        filteredParts.forEach((p: Part) => {
          group.parts.push(p);
        });
      });
      // add the group unless it's empty
      if (group.parts.length > 0) {
        groups.push(group);
      }
    }
    return groups;
  }

  /**
   * Vanilla groupBy function.
   * See https://gomakethings.com/a-vanilla-js-equivalent-of-lodashs-groupby-method.
   *
   * @param array The array.
   * @param criteria The grouping criteria (either a function receiving the
   * item and returning a key, or a property name).
   * @returns Grouped array.
   */
  private groupBy(array: any[], criteria: any): any[] {
    return array.reduce((obj, item) => {
      // Check if the criteria is a function to run on the item or a property of it
      const key =
        typeof criteria === 'function' ? criteria(item) : item[criteria];

      // If the key doesn't exist yet, create it
      if (!obj.hasOwnProperty(key)) {
        obj[key] = [];
      }

      // Push the value to the object
      obj[key].push(item);

      // Return the object to the next item in the loop
      return obj;
    }, {});
  }
}

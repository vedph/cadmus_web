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
  PartGroup
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
    @Inject('apiEndpoint') private _apiEndpoint: string,
    @Inject('databaseId') private _databaseId: string
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
        `${this._apiEndpoint}${this._databaseId}/items`,
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
   * @param filter IItemFilter Items filter.
   * @param parts boolean True to get also item's parts.
   * @returns Observable<IPagedResult<IItemInfo>> Observable with paged result.
   */
  public getItem(id: string, parts: boolean): Observable<Item> {
    let url = `${this._apiEndpoint}${this._databaseId}/item/${id}`;
    if (parts) {
      url += '?parts=true';
    }
    return this._http.get<Item>(url).pipe(retry(3));
  }

  /**
   * Delete the item with the specified ID.
   * @param string id The item's ID.
   * @returns Observable<Object> Observable with result.
   */
  public deleteItem(id: string): Observable<Object> {
    const url = `${this._apiEndpoint}${this._databaseId}/item/${id}`;
    return this._http.delete(url).pipe(catchError(this._error.handleError));
  }

  /**
   * Add or update the specified item.
   * @param item IItem The item.
   * @returns Observable<Response> Observable with result.
   */
  public addItem(item: Item): Observable<Item> {
    const url = `${this._apiEndpoint}${this._databaseId}/items`;
    return this._http
      .post<Item>(url, item)
      .pipe(catchError(this._error.handleError));
  }

  /**
   * Get the item's part with the specified ID.
   * @param id string The part ID.
   * @returns Observable<IPart> Observable with result.
   */
  public getPart(id: string): Observable<Part> {
    const url = `${this._apiEndpoint}${this._databaseId}/part/${id}`;
    return this._http.get<Part>(url).pipe(
      retry(3),
      catchError(this._error.handleError)
    );
  }

  /**
   * From the item with the specified ID, get the part matching the specified type
   * and role.
   * @param itemId string The item ID.
   * @param type string The part type.
   * @param role string The part role.
   * @returns Observable<IPart> Observable with result.
   */
  public getPartFromTypeAndRole(
    itemId: string,
    type: string,
    role = 'default'
  ): Observable<Part> {
    const url =
      `${this._apiEndpoint}${this._databaseId}/` +
      `item/${itemId}/part/${type}/${role}`;
    return this._http.get<Part>(url).pipe(
      retry(3),
      catchError(this._error.handleError)
    );
  }

  /**
   * Gets a list of layer parts IDs and role IDs for the specified item.
   * Note that the role IDs for layer parts may just be equal to the fragment
   * type ID (e.g. "fr.net.fusisoft.comment"), or include this + dot + role ID
   * proper (e.g."fr.net.fusisoft.comment:scholarly").
   * @param itemId string The item's ID.
   * @returns Observable<IRolePartId[]> Observable with array of IRolePartId's.
   */
  public getItemLayerPartIds(itemId: string): Observable<RolePartId[]> {
    const url =
      `${this._apiEndpoint}${this._databaseId}/` + `item/${itemId}/layers`;
    return this._http.get<RolePartId[]>(url).pipe(
      retry(3),
      catchError(this._error.handleError)
    );
  }

  /**
   * Gets the data pins of the part with the specified ID.
   * @param id string The part ID.
   * @returns Observable<IDataPin[]> Observable with array of IDataPin's.
   */
  public getPartPins(id: string): Observable<RolePartId[]> {
    const url = `${this._apiEndpoint}${this._databaseId}/` + `part/${id}/pins`;
    return this._http.get<RolePartId[]>(url).pipe(
      retry(3),
      catchError(this._error.handleError)
    );
  }

  /**
   * Delete the part with the specified ID.
   * @param string id The part's ID.
   * @returns Observable<Object> Observable with result.
   */
  public deletePart(id: string): Observable<Object> {
    const url = `${this._apiEndpoint}${this._databaseId}/part/${id}`;
    return this._http.delete(url).pipe(catchError(this._error.handleError));
  }

  /**
   * Add or update the specified part.
   * @param item IPart The part.
   * @returns Observable<Object> Observable with result.
   */
  public addPart(part: Part): Observable<Object> {
    const url = `${this._apiEndpoint}${this._databaseId}/parts`;
    return this._http
      .post(url, { raw: JSON.stringify(part) })
      .pipe(catchError(this._error.handleError));
  }

  /**
   * Group the specified parts according to the specified part definitions. This is
   * used to list an item's part when displaying them in editing.
   * @param parts The parts to group.
   * @param partDefs The part definitions to use for grouping.
   * @return The groups.
   */
  public groupParts(parts: Part[], partDefs: PartDefinition[]): PartGroup[] {
    // group the part definitions by their groupKey sorting by sortKey
    const groupedDefs = this.groupBy(
      partDefs.sort((a, b) => {
        return a.sortKey.localeCompare(b.sortKey);
      }), 'groupKey');

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
        const filteredParts: Part[] = parts.filter(p => {
          return p.typeId === def.typeId
            && (!p.roleId || p.roleId === def.roleId);
        }).sort((a, b) => {
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
   * Get the fragment type and role from the part's role ID. This starts
   * with "fr.", and might be followed by the role proper, introduced
   * by the first dot if any. For instance, "fr.net.fusisoft.comment" would just
   * return "fr.net.fusisoft.comment", while "fr.net.fusisoft.comment:scholarly"
   * would return "fr.net.fusisoft.comment". This is required to navigate to
   * the correct fragment editor, which is the same for each fragment type,
   * independently from its role.
   * @param role The part role ID.
   * @returns An array where [0]=fragment type and [1]=role, or null.
   */
  public getFragmentTypeAndRole(roleId: string): string[] {
    if (!roleId || !roleId.startsWith('fr.')) {
      return null;
    }
    const i = roleId.indexOf(':');
    if (i > -1) {
      return [roleId.substr(0, i), roleId.substr(i + 1)];
    } else {
      return [roleId, null];
    }
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

import { Injectable } from '@angular/core';
import { PartDefinition } from '../models';

/**
 * Library route service.
 * This service is used to build routes to part and fragment editors,
 * which are hosted in an open list of library modules in the Cadmus
 * application.
 * This architecture allows lazy-loading part and fragments editors
 * only when they are required.
 * Each part type with its dumb UI editor component is located in a
 * library named after the name of the group the part belongs to. For
 * instance, the model and dumb UI editor component for a part belonging
 * to the "general" group are located in the "parts/general/general-ui"
 * library.
 * In turn, the feature UI editor component for the same part is located
 * in the "parts/general/general-feature" library. This library has
 * a route for each part editor. For instance, the NotePart editor
 * component route is "items/:iid/general/net.fusisoft.note/:pid", where
 * ":iid" is the item ID and ":pid" the part ID.
 */
@Injectable({
  providedIn: 'root'
})
export class LibraryRouteService {
  constructor() {}

  /**
   * Strip the eventual fragment-role ID from the specified part's role ID.
   * For instance, a part's role ID like "fr.net.fusisoft.comment:scholarly"
   * becomes "fr.net.fusisoft.comment".
   *
   * @param roleId The part's role ID.
   */
  public stripFragmentRoleId(roleId: string): string {
    // remove the optional :fr-role from roleId
    const i = roleId.lastIndexOf(':');
    if (i > -1) {
      roleId = roleId.substring(0, i);
    }
    return roleId;
  }

  /**
   * Get the library group key from the specified part type.
   *
   * @param partDefs The parts definitions.
   * @param typeId The part's type ID.
   * @param roleId The part's role ID.
   */
  public getGroupKeyFromPartType(
    partDefs: PartDefinition[],
    typeId: string,
    roleId: string = null
  ): string {
    if (!partDefs) {
      return 'default';
    }

    let def: PartDefinition;
    if (roleId) {
      // find both type and role
      const reqRoleId = this.stripFragmentRoleId(roleId);
      def = partDefs.find(d => {
        return (
          d.typeId === typeId &&
          this.stripFragmentRoleId(d.roleId) === reqRoleId
        );
      });
    } else {
      def = partDefs.find(d => {
        return d.typeId === typeId;
      });
    }
    return def ? def.groupKey : 'default';
  }

  /**
   * Build the route to the part editor corresponding to the specified
   * part.
   *
   * A part editing route is like
   * "/items/<id>/<part-group>/<part-typeid>/<part-id>?rid=<role-id>",
   * where the role ID is optional, and may include the fragment role ID
   * as a suffix preceded by a colon.
   *
   * A fragment editing route is like
   * "/items/<id>/<part-group>/fragment/<part-id>/<fr-typeid>/<loc>?rid=<role-id>",
   * where the role ID is as above, and the fragment's type ID is derived
   * from the part's role ID, stripping the eventual fragment's role ID out.
   *
   * @param partDefs The parts definitions.
   * @param itemId The ID of the item the parts belongs to.
   * @param partId The part's ID.
   * @param typeId The part's type ID.
   * @param roleId The part's role ID.
   * @returns Object with a route property and an optional rid property
   * representing the role ID, which will be rendered as a query parameter.
   */
  public buildPartEditorRoute(
    partDefs: PartDefinition[],
    itemId: string,
    partId: string,
    typeId: string,
    roleId: string
  ): { route: string; rid: string | null } {
    const def = partDefs.find(p => p.typeId === typeId);

    const isLayer = def && roleId && roleId.startsWith('fr.');

    // build the target route to the appropriate part editor
    let route: string;
    let rid: string = null;
    const groupKey = this.getGroupKeyFromPartType(partDefs, typeId);

    if (isLayer) {
      // /items/<id>/layer/token/<pid>?rid=X
      route = `/items/${itemId}/layer/token/${partId}`;
    } else {
      // /items/<id>/<part-group>/ +
      // <part-typeid>/<part-id>?rid=<role-id>
      route = `/items/${itemId}/${groupKey}/${typeId}/${partId}`;
    }
    if (roleId) {
      rid = roleId;
    }
    return {
      route: route,
      rid: rid
    };
  }
}

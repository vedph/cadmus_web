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
   * Get the fragment type and role from the part's role ID. This starts
   * with "fr.", and might be followed by the role proper, introduced
   * by the first dot if any. For instance, "fr.net.fusisoft.comment" would just
   * return "fr.net.fusisoft.comment", while "fr.net.fusisoft.comment:scholarly"
   * would return "fr.net.fusisoft.comment". This is required to navigate to
   * the correct fragment editor, which is the same for each fragment type,
   * independently from its role.
   * @param role The part role ID.
   * @returns An object where frTypeId=fragment type ID and frRoleId=fragment role
   * ID, or null.
   */
  public getFragmentTypeAndRole(
    roleId: string
  ): { frTypeId: string; frRoleId: string | null } {
    if (!roleId || !roleId.startsWith('fr.')) {
      return null;
    }
    const i = roleId.indexOf(':');
    if (i > -1) {
      return {
        frTypeId: roleId.substring(0, i),
        frRoleId: roleId.substring(i + 1)
      };
    } else {
      return {
        frTypeId: roleId,
        frRoleId: null
      };
    }
  }

  /**
   * Get the library editor key from the specified part type, looking up
   * the specified parts definitions.
   *
   * @param partDefs The parts definitions.
   * @param typeId The part's type ID.
   * @param roleId The part's role ID.
   */
  public getEditorKeyFromPartType(
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
    return def && def.editorKey ? def.editorKey : 'default';
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

    // layer parts always have a role ID equal to the fragment's type ID,
    // which always starts with "fr.".
    const isLayer = def && roleId && roleId.startsWith('fr.');

    let route: string;
    let rid: string = null;
    const editorKey = this.getEditorKeyFromPartType(partDefs, typeId);

    if (isLayer) {
      // /items/<id>/layer/token/<pid>?rid=X
      route = `/items/${itemId}/layer/token/${partId}`;
      // (currently rid has no meaning for a layers part)
    } else {
      // /items/<id>/<part-group>/ +
      // <part-typeid>/<part-id>?rid=<role-id>
      route = `/items/${itemId}/${editorKey}/${typeId}/${partId}`;
    }
    if (roleId) {
      rid = roleId;
    }
    return {
      route: route,
      rid: rid
    };
  }

  /**
   * Build the route to the fragment editor corresponding to the specified
   * layers part and location.
   *
   * @param partDefs The parts definitions.
   * @param itemId The ID of the item the parts belongs to.
   * @param partId The part's ID.
   * @param typeId The part's type ID.
   * @param roleId The part's role ID.
   * @param loc The fragment's location.
   * @returns Object with a route property and an optional rid property
   * representing the role ID, which will be rendered as a query parameter.
   */
  public buildFragmentEditorRoute(
    partDefs: PartDefinition[],
    itemId: string,
    partId: string,
    typeId: string,
    roleId: string,
    loc: string
  ): { route: string; rid: string | null } {
    let route: string;
    const editorKey = this.getEditorKeyFromPartType(partDefs, typeId, roleId);
    const { frTypeId, frRoleId } = this.getFragmentTypeAndRole(roleId);

    route = `/items/${itemId}/${editorKey}/fragment/${partId}/${frTypeId}/${loc}`;
    return {
      route: route,
      rid: frRoleId
    };
  }
}

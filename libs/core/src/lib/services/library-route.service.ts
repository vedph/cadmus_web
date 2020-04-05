import { Injectable, Inject } from '@angular/core';
import { PartDefinition, PartEditorKeys } from '../models';

/**
 * Library route service.
 * This service is used to build routes to part and fragment editors,
 * which are hosted in an open list of library modules in the Cadmus
 * application.
 * This architecture allows lazy-loading part- and fragment-editors
 * only when they are required.
 * Each part type with its dumb UI editor component is located in a
 * library, named after the name of the group the part belongs to. For
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
  constructor(
    @Inject('partEditorKeys') private _partEditorKeys: PartEditorKeys
  ) {}

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
   * Find among the specified parts definitions the one matching the specified
   * type ID, and eventually role ID when specified.
   *
   * @param partDefs The parts definitions.
   * @param typeId The type ID.
   * @param roleId The role ID or null.
   * @returns Part definition or null if not found.
   */
  private findPartDefinition(
    partDefs: PartDefinition[],
    typeId: string,
    roleId: string = null
  ): PartDefinition | null {
    if (!partDefs) {
      return null;
    }

    // if role ID is specified, find both type and role
    if (roleId) {
      const reqRoleId = this.stripFragmentRoleId(roleId);
      return partDefs.find(d => {
        return (
          d.typeId === typeId &&
          this.stripFragmentRoleId(d.roleId) === reqRoleId
        );
      });
    }
    // else just find type ID
    return partDefs.find(d => {
      return d.typeId === typeId;
    });
  }

  /**
   * Get the library editor key from the specified part type, looking up
   * the specified parts definitions.
   *
   * @param typeId The part's type ID.
   * @param roleId The part's role ID.
   */
  public getEditorKeyFromPartType(
    typeId: string,
    roleId: string = null
  ): { partKey: string; frKey?: string } {
    // find the part type ID
    const partGroupKey = this._partEditorKeys[typeId];
    if (!partGroupKey) {
      return {
        partKey: 'default'
      };
    }

    // additionally find the role ID if specified
    if (roleId) {
      const reqRoleId = this.stripFragmentRoleId(roleId);
      return {
        partKey: partGroupKey.part,
        frKey: partGroupKey.fragments[reqRoleId]
      };
    }
    return {
      partKey: partGroupKey.part
    };
  }

  /**
   * Decompose the specified editor key into part and fragment.
   * A simple editor key will just provide the same value for both.
   *
   * @param key The editor key to decompose.
   */
  public decomposeEditorKey(key: string): { partKey: string; frKey: string } {
    const i = key.indexOf(' ');
    if (i > -1) {
      return {
        partKey: key.substr(0, i),
        frKey: key.substr(i + 1)
      };
    } else {
      return {
        partKey: key,
        frKey: key
      };
    }
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
   * @returns Object with a route property and an optional rid property
   * representing the role ID, which will be rendered as a query parameter.
   */
  public buildPartEditorRoute(
    partDefs: PartDefinition[],
    itemId: string,
    partId: string,
    typeId: string
  ): string {
    let route: string;
    const editorKey = this.getEditorKeyFromPartType(typeId);

    // /items/<id>/<part-group>/<part-typeid>/<part-id>?rid=<role-id>
    route = `/items/${itemId}/${editorKey.partKey}/${typeId}/${partId}`;
    return route;
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
    const editorKey = this.getEditorKeyFromPartType(typeId, roleId);
    const { frTypeId, frRoleId } = this.getFragmentTypeAndRole(roleId);

    route = `/items/${itemId}/${editorKey.frKey}/fragment/${partId}/${frTypeId}/${loc}`;
    return {
      route: route,
      rid: frRoleId
    };
  }
}

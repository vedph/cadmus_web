import { Component, OnInit, Input } from '@angular/core';
import { Thesaurus, FacetDefinition, PartTypeIds } from '@cadmus/core';
import { FacetService } from '@cadmus/api';

export enum PartBadgeType {
  partAndRole = 0,
  partOnly = 1,
  roleOnly = 2
}

@Component({
  selector: 'cadmus-part-badge',
  templateUrl: './part-badge.component.html',
  styleUrls: ['./part-badge.component.css']
})
export class PartBadgeComponent implements OnInit {
  private _typeThesaurus: Thesaurus;
  private _facetDefinition: FacetDefinition;
  private _partTypeIds: PartTypeIds;

  public typeName: string;
  public roleName: string;
  public color: string;

  /**
   * The badge type: 0=part and role, 1=part only, 2=role only.
   */
  @Input()
  public badgeType: PartBadgeType;

  /**
   * The types thesaurus.
   */
  @Input()
  public get typeThesaurus(): Thesaurus {
    return this._typeThesaurus;
  }
  public set typeThesaurus(value: Thesaurus) {
    this._typeThesaurus = value;
    this.updateBadge();
  }

  /**
   * The part's facet definition.
   */
  @Input()
  public get facetDefinition(): FacetDefinition {
    return this._facetDefinition;
  }
  public set facetDefinition(value: FacetDefinition) {
    this._facetDefinition = value;
    this.updateBadge();
  }

  /**
   * The part type IDs.
   */
  @Input()
  public get partTypeIds(): PartTypeIds {
    return this._partTypeIds;
  }
  public set partTypeIds(value: PartTypeIds) {
    this._partTypeIds = value;
    this.updateBadge();
  }

  constructor(private _facetService: FacetService) {
    this.badgeType = PartBadgeType.partAndRole;
    this.color = 'transparent';
  }

  ngOnInit(): void {}

  private getPartColor(typeId: string, roleId: string): string {
    if (!this._facetDefinition) {
      return 'transparent';
    }
    return this._facetService.getPartColor(
      typeId,
      roleId,
      this._facetDefinition
    );
  }

  private getTypeIdName(typeId: string): string {
    if (!this._typeThesaurus) {
      return typeId;
    }
    const entry = this._typeThesaurus.entries.find(e => e.id === typeId);
    return entry ? entry.value : typeId;
  }

  private getRoleIdName(roleId: string): string {
    if (!roleId || !roleId.startsWith('fr.')) {
      return roleId;
    }
    return this.getTypeIdName(roleId);
  }

  private updateBadge() {
    if (this._partTypeIds) {
      this.color = this.getPartColor(this._partTypeIds.typeId, this._partTypeIds.roleId);
      this.typeName = this.getTypeIdName(this._partTypeIds.typeId);
      this.roleName = this.getRoleIdName(this._partTypeIds.roleId);
    } else {
      this.color = 'transparent';
      this.typeName = null;
      this.roleName = null;
    }
  }
}

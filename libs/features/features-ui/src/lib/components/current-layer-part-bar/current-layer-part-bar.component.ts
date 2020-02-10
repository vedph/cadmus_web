import { Component, OnInit } from '@angular/core';
import { EditItemQuery, EditLayerPartQuery } from '@cadmus/features/edit-state';
import { TextLayerPart, PartDefinition } from '@cadmus/core';

@Component({
  selector: 'cadmus-current-layer-part-bar',
  templateUrl: './current-layer-part-bar.component.html',
  styleUrls: ['./current-layer-part-bar.component.css']
})
export class CurrentLayerPartBarComponent implements OnInit {
  constructor(
    private _itemQuery: EditItemQuery,
    private _partQuery: EditLayerPartQuery
  ) {}

  public typeId: string;
  public roleId: string;
  public color: string;

  private getTypeIdName(typeId: string): string {
    const state = this._itemQuery.getValue();
    if (!state || !state.typeThesaurus) {
      return typeId;
    }
    const entry = state.typeThesaurus.entries.find(e => e.id === typeId);
    return entry ? entry.value : typeId;
  }

  private getRoleIdName(roleId: string): string {
    if (!roleId || !roleId.startsWith('fr.')) {
      return roleId;
    }
    return this.getTypeIdName(roleId);
  }

  private getPartColor(typeId: string, roleId: string): string {
    const state = this._itemQuery.getValue();
    let def: PartDefinition = null;
    if (state) {
      def = state.facet.partDefinitions.find(d => {
        return d.typeId === typeId && (!roleId || roleId === d.roleId);
      });
      if (!def) {
        def = state.facet.partDefinitions.find(d => {
          return d.typeId === typeId;
        });
      }
    }
    return def ? '#' + def.colorKey : '#f0f0f0';
  }

  private updateLabels() {
    const part: TextLayerPart = this._partQuery.getValue().part;
    if (!part) {
      this.typeId = null;
      this.roleId = null;
      this.color = null;
      return;
    } else {
      this.typeId = this.getTypeIdName(part.typeId);
      this.roleId = this.getRoleIdName(part.roleId);
      this.color = this.getPartColor(part.typeId, part.roleId);
    }
  }

  ngOnInit() {
    this._itemQuery.select().subscribe(_ => {
      this.updateLabels();
    });
    this._partQuery.select().subscribe(_ => {
      this.updateLabels();
    });
  }
}

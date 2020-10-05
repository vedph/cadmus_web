import { Component, Input } from '@angular/core';
import { FacetDefinition } from '@cadmus/core';
import { ColorService } from '../../services/color.service';

@Component({
  selector: 'cadmus-facet-badge',
  templateUrl: './facet-badge.component.html',
  styleUrls: ['./facet-badge.component.css']
})
export class FacetBadgeComponent {
  private _facetColors: { [key: string]: string };
  private _facetTips: { [key: string]: string };
  private _facetId: string;
  private _facetDefinitions: FacetDefinition[];

  public color: string;
  public contrastColor: string;
  public tip: string;

  /**
   * The facet ID.
   */
  @Input()
  public get facetId(): string {
    return this._facetId;
  }
  public set facetId(value: string) {
    if (this._facetId === value) {
      return;
    }
    this._facetId = value;
    this.updateBadge();
  }

  /**
   * The facets definitions.
   */
  @Input()
  public get facetDefinitions(): FacetDefinition[] {
    return this._facetDefinitions;
  }
  public set facetDefinitions(value: FacetDefinition[]) {
    this._facetDefinitions = value;
    this._facetColors = {};
    this._facetTips = {};
    this.updateBadge();
  }

  constructor(private _colorService: ColorService) {
    this._facetColors = {};
    this._facetTips = {};
    this.color = 'transparent';
    this.contrastColor = 'black';
  }

  private getFacetColor(facetId: string): string {
    if (this._facetColors[facetId]) {
      return this._facetColors[facetId];
    }
    if (!this._facetDefinitions) {
      return 'transparent';
    }

    const facet = this._facetDefinitions.find(f => {
      return f.id === facetId;
    });
    if (facet?.colorKey) {
      this._facetColors[facetId] = '#' + facet.colorKey;
    } else {
      this._facetColors[facetId] = 'transparent';
    }
    return this._facetColors[facetId];
  }

  private getFacetTip(facetId: string): string {
    if (this._facetTips[facetId]) {
      return this._facetTips[facetId];
    }

    if (!this.facetDefinitions) {
      return null;
    }

    const facet = this.facetDefinitions.find(f => {
      return f.id === facetId;
    });
    if (!facet) {
      this._facetTips[facetId] = facetId;
    } else {
      const sb: string[] = [];
      for (let i = 0; i < facet.partDefinitions.length; i++) {
        if (i > 0) {
          sb.push(', ');
        }
        sb.push(facet.partDefinitions[i].name);
        if (facet.partDefinitions[i].isRequired) {
          sb.push('*');
        }
      }
      this._facetTips[facetId] = sb.join('');
    }
    return this._facetTips[facetId];
  }

  private updateBadge() {
    this.color = this.getFacetColor(this._facetId);
    this.contrastColor = this._colorService.getContrastColor(this.color);
    this.tip = this.getFacetTip(this._facetId);
  }
}

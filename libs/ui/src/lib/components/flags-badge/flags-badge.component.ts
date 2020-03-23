import { Component, OnInit, Input } from '@angular/core';
import { FlagDefinition } from '@cadmus/core';

/**
 * Badge with item's flags. Each flag is represented by a circle filled
 * with the flag's color key.
 */
@Component({
  selector: 'cadmus-flags-badge',
  templateUrl: './flags-badge.component.html',
  styleUrls: ['./flags-badge.component.css']
})
export class FlagsBadgeComponent implements OnInit {
  private _flags: number;
  private _flagDefinitions: FlagDefinition[];

  public badgeFlags: FlagDefinition[]

  @Input()
  public get flags(): number {
    return this._flags;
  }
  public set flags(value: number) {
    if (this._flags === value) {
      return;
    }
    this._flags = value;
    this.updateBadge();
  }

  @Input()
  public get flagDefinitions() : FlagDefinition[] {
    return this._flagDefinitions;
  }
  public set flagDefinitions(value: FlagDefinition[]) {
    this._flagDefinitions = value;
    this.updateBadge();
  }

  constructor() {
    this.badgeFlags = [];
  }

  ngOnInit(): void {
  }

  private updateBadge() {
    if (!this._flagDefinitions) {
      return;
    }
    this.badgeFlags = this._flagDefinitions.filter(def => {
      // tslint:disable-next-line: no-bitwise
      return (def.id & this._flags);
    });
  }
}

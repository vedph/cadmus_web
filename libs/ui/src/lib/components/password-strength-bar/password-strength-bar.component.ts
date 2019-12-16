import {
  Component,
  OnChanges,
  EventEmitter,
  Input,
  Output,
  SimpleChange
} from '@angular/core';

@Component({
  selector: 'cadmus-password-strength-bar',
  templateUrl: './password-strength-bar.component.html',
  styleUrls: ['./password-strength-bar.component.css']
})
export class PasswordStrengthBarComponent implements OnChanges {
  private _colors = ['#F00', '#F90', '#FF0', '#9F0', '#0F0'];

  @Input() passwordToCheck: string;
  @Output() strengthChange = new EventEmitter<number>();

  public bar0: string;
  public bar1: string;
  public bar2: string;
  public bar3: string;
  public bar4: string;

  /**
   *
   */
  constructor() {
    this.strengthChange = new EventEmitter<number>();
  }

  private measureStrength(p: string): number {
    let force = 0;
    const regex = /[$-/:-?{-~!"^_`\[\]]/g; // "

    const lowerLetters = /[a-z]+/.test(p);
    const upperLetters = /[A-Z]+/.test(p);
    const numbers = /[0-9]+/.test(p);
    const symbols = regex.test(p);

    const flags = [lowerLetters, upperLetters, numbers, symbols];

    let passedMatches = 0;
    for (const flag of flags) {
      passedMatches += flag === true ? 1 : 0;
    }

    force += 2 * p.length + (p.length >= 10 ? 1 : 0);
    force += passedMatches * 10;

    // penalty (short password)
    force = p.length <= 6 ? Math.min(force, 10) : force;

    // penalty (poor letiety of characters)
    force = passedMatches === 1 ? Math.min(force, 10) : force;
    force = passedMatches === 2 ? Math.min(force, 20) : force;
    force = passedMatches === 3 ? Math.min(force, 40) : force;

    return force;
  }

  private getColor(s: number) {
    let idx = 0;
    if (s <= 10) {
      idx = 0;
    } else if (s <= 20) {
      idx = 1;
    } else if (s <= 30) {
      idx = 2;
    } else if (s <= 40) {
      idx = 3;
    } else {
      idx = 4;
    }
    return {
      idx: idx + 1,
      col: this._colors[idx]
    };
  }

  ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
    const password = changes['passwordToCheck'].currentValue;
    this.setBarColors(5, '#DDD');
    if (password) {
      const strength = this.measureStrength(password);
      const c = this.getColor(strength);
      this.setBarColors(c.idx, c.col);
      this.strengthChange.emit(strength);
    }
  }

  private setBarColors(count: number, col: string) {
    for (let n = 0; n < count; n++) {
      this['bar' + n] = col;
    }
  }
}

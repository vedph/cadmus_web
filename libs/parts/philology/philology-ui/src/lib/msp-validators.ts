import { AbstractControl } from '@angular/forms';
import { MspOperation } from './msp-operation';

export class MspValidators {
  public static msp(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    if (control.value) {
      const op = MspOperation.parse(control.value);
      if (!op || op.validate()) {
        return { msp: true };
      }
    }
    return null;
  }
}

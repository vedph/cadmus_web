import {
  AbstractControl,
  ValidatorFn,
  ValidationErrors,
  FormGroup
} from '@angular/forms';

// https://www.tektutorialshub.com/angular/custom-validator-with-parameters-in-angular/

/**
 * General-purpose custom validators.
 */
export class CustomValidators {
  /**
   * Validates a FormGroup or FormArray control checking if the count of their
   * controls with a true value is equal to or greater than the specified
   * number.
   *
   * @param min The minimum number of checked controls.
   */
  public static minChecked(min = 1): ValidatorFn {
    return (control: FormGroup): ValidationErrors | null => {
      // https://trungk18.com/experience/angular-form-array-validate-at-least-one-checkbox-was-selected/
      let checked = 0;

      Object.keys(control.controls).forEach(key => {
        const ctl = control.controls[key];
        if (ctl.value === true) {
          checked++;
        }
      });

      if (checked < min) {
        return {
          minChecked: true
        };
      }
      return null;
    };
  }
}

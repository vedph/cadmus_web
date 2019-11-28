import { AbstractControl } from '@angular/forms';

/**
 * Simple JSON validator.
 * TODO: add JSON schema support.
 */
export class JsonValidators {
  public static json(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    if (!control.value) {
      // we allow empty code
      return null;
    }
    try {
      JSON.parse(control.value);
    } catch (e) {
      return { json: true };
    }
    return null;
  }
}

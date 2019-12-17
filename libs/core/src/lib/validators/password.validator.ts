import { AbstractControl } from '@angular/forms';

export class PasswordValidator {
  static isValidPassword(control: AbstractControl): { [key: string]: boolean } {
    if (!control.value) {
      return null;
    }

    if (control.value.length < 8) {
      return {
        passwordTooShort: true
      };
    }

    if (!/.*[A-Z].*/.test(control.value)) {
      return {
        noUpperInPassword: true
      };
    }

    if (!/.*[a-z].*/.test(control.value)) {
      return {
        noLowerInPassword: true
      };
    }

    if (!/.*[A-Z].*/.test(control.value)) {
      return {
        noUpperInPassword: true
      };
    }

    if (!/.*[-`~!@#$%^&*()_+=\[\]{};:'",.<>/?|\\].*/.test(control.value)) {
      return {
        noSymbolInPassword: true
      };
    }

    return null;
  }
}

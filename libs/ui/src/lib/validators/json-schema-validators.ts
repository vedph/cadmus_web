import { JsonSchemaService } from '@cadmus/core';
import { AbstractControl } from '@angular/forms';

/**
 * JSON schema validator.
 *
 * The returned error objects can be:
 * - for key "json": JSON is not well-formed.
 * - for key "jsonSchema": JSON is not valid. Details are in "errors".
 */
export class JsonSchemaValidators {
  // https://stackoverflow.com/questions/35505520/access-a-service-from-a-custom-validator-in-angular2

  /**
   * Create a JSON schema validator using the specified service and schema.
   * Use this like: JsonSchemaValidators.create(service, name).
   *
   * @param schemaService The JSON schema service.
   * @param schemaName The schema name.
   */
  public static create(schemaService: JsonSchemaService, schemaName: string) {
    return (control: AbstractControl) => {
      if (!control.value) {
        // we allow empty code
        return null;
      }

      let data = null;
      try {
        data = JSON.parse(control.value);
      } catch (e) {
        return { json: true };
      }

      if (!schemaService || !schemaName) {
        return null;
      }
      const result = schemaService.validateData(schemaName, data);

      // https://angular.io/guide/form-validation
      // the error object t typically has a property whose name is the validation
      // key, and whose value is an arbitrary dictionary of values that you could
      // insert into an error message using syntax "{propertyName}"
      return result.valid
        ? null
        : {
            jsonSchema: {
              errors: result.errorsText
            }
          };
    };
  }
}

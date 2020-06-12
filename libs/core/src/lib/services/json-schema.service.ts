import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// this requires "allowSyntheticDefaultImports": true in tsconfig.json compiler options
import Ajv from 'ajv';

// npm i ajv --save
// https://tane.dev/2019/09/validating-data-with-json-schema-angular-and-typescript/

/**
 * The response of a validation result.
 */
export interface ValidationResult {
  /**
   * If the result is valid or not
   */
  valid: boolean;

  /**
   * Error text from the validator
   */
  errorsText: string;
}

/**
 * JSON schema validation service.
 */
@Injectable({
  providedIn: 'root'
})
export class JsonSchemaService {
  private readonly _ajv: Ajv.Ajv;

  constructor(private readonly http: HttpClient) {
    this._ajv = new Ajv({ allErrors: true });
  }

  /**
   * Add the specified schema to the validator schema set. If a schema with
   * the same name already exists, nothing happens unless you pass replace=true.
   *
   * @param name The name of the schema; this will be used as the key to store it.
   * @param json The schema to be added.
   * @param replace True to replace an existing schema with the same name.
   */
  public addSchema(name: string, schema: object, replace = false): void {
    const old = this._ajv.getSchema(name);
    if (old) {
      if (replace) {
        this._ajv.removeSchema(name);
      } else {
        return;
      }
    }
    this._ajv.addSchema(schema, name);
  }

  /**
   * Fetch the schema and add it to the validator schema set.
   * @param name The name of the schema; this will be used as the key to store it.
   * @param urlPath The URL path of the schema to load.
   */
  public loadSchema(name: string, urlPath: string): void {
    this.http
      .get(urlPath)
      .subscribe(result => this._ajv.addSchema(result, name));
  }

  /**
   * Validate data against a schema.
   * @param name The name of the schema to validate.
   * @param data The data to validate.
   */
  public validateData<T>(name: string, data: T): ValidationResult {
    const valid = this._ajv.validate(name, data) as boolean;
    return {
      valid: valid,
      errorsText: this._ajv.errorsText()
    };
  }
}

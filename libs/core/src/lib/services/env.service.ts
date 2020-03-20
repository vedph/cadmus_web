import { Injectable } from '@angular/core';

/**
 * The environment service. Its properties are the default values
 * that can be overridden by env.js, assuming that there is one and
 * it can be loaded; otherwise, the application will fall back to
 * these default values.
 * See https://www.jvandemo.com/how-to-use-environment-variables-to-configure-your-angular-application-without-a-rebuild/
 */
@Injectable({
  providedIn: 'root'
})
export class EnvService {
  public apiUrl = 'http://localhost:60304/api/';
  public databaseId = 'cadmus';
  public name = 'Demo';

  constructor() {}
}

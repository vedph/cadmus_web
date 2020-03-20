import { EnvService } from './env.service';

/**
 * This function creates an instance of EnvService and copies
 * all the properties from window.__env object into it.
 */
export const EnvServiceFactory = () => {
  // Create env
  const env = new EnvService();

  // Read environment variables from browser window
  const browserWindow = window || {};
  const browserWindowEnv = browserWindow['__env'] || {};

  // Assign environment variables from browser window to env
  // In the current implementation, properties from env.js
  // overwrite defaults from the EnvService.
  // If needed, a deep merge can be performed here to merge
  // properties instead of overwriting them.
  for (const key in browserWindowEnv) {
    if (browserWindowEnv.hasOwnProperty(key)) {
      env[key] = window['__env'][key];
    }
  }

  return env;
};

/**
 * A provider recipe for the EnvService.
 * This must be registered in the applications providers array.
 */
export const EnvServiceProvider = {
  provide: EnvService,
  useFactory: EnvServiceFactory,
  deps: []
};

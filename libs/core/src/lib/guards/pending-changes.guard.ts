import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

// https://stackoverflow.com/questions/35922071/warn-user-of-unsaved-changes-before-leaving-page

/**
 * Interface implemented by those components which require a pending changes
 * guard. The implementor must keep its canDeactivate property up to date,
 * so that it reflects its dirty state.
 */
export interface ComponentCanDeactivate {
  canDeactivate: () => boolean | Observable<boolean>;
}

@Injectable({
  providedIn: 'root'
})
export class PendingChangesGuard
  implements CanDeactivate<ComponentCanDeactivate> {
  canDeactivate(
    component: ComponentCanDeactivate
  ): boolean | Observable<boolean> {
    // if there are no pending changes, just allow deactivation; else confirm first
    return !component || component.canDeactivate()
      ? true
      : // NOTE: this warning message will only be shown when navigating
        // elsewhere within your angular app; when navigating away from your
        // angular app, the browser will show a generic warning message.
        // see http://stackoverflow.com/a/42207299/7307355
        confirm(
          'Warning: your changes have not been saved. ' +
            'Press Cancel to go back and save, OK to continue.'
        );
  }
}

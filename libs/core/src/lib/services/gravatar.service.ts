import { Injectable } from '@angular/core';
import * as gravatar from 'gravatar';

// npm i gravatar --save
// npm i @types/gravatar --save

@Injectable({
  providedIn: 'root'
})
export class GravatarService {
  /**
   * Builds the URL to the Gravatar avatar corresponding to the specified email
   * address.
   * @param email: The email address.
   * @param size The required size in pixels (1-512).
   */
  public buildGravatarUrl(email: string, size = 80): string {
    if (!email) {
      return null;
    }
    return gravatar.url(email, { s: size.toString() });
    // const hash = this._hash.getMd5(email.trim().toLowerCase());
    // return this.buildGravatarUrlFromHash(hash, size);
  }
}

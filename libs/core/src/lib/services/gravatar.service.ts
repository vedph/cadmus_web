import { Injectable } from '@angular/core';
import { HashService } from './hash.service';

@Injectable({
  providedIn: 'root'
})
export class GravatarService {
  constructor(private _hash: HashService) {}

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
    const hash = this._hash.getMd5(email.trim().toLowerCase());
    return this.buildGravatarUrlFromHash(hash, size);
  }

  /**
   * Build the URL to the Gravatar avatar corresponding to the specified
   * hash.
   * @param hash The Gravatar hash.
   * @param size The required size in pixels (1-512).
   */
  public buildGravatarUrlFromHash(hash: string, size = 80): string {
    if (!hash) {
      return `https://www.gravatar.com/avatar/?d=identicon&size=${size}`;
    }
    return `https://www.gravatar.com/avatar/${hash}.jpg?s=${size}`;
  }
}

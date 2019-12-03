import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  /**
   * Retrieve the object with the specified key from the specified storage.
   * @param key key.
   * @param session true to use session instead of local storage.
   */
  public retrieve<T>(key: string, session: boolean = false): T {
    const json = (session ?
      sessionStorage.getItem(key) :
      localStorage.getItem(key));

    if (!json) {
      return null;
    }
    return JSON.parse(json);
  }

  /**
   * Store the specified object with the specified key in the specified storage.
   * @param key key.
   * @param value object.
   * @param session true to use session instead of local storage.
   */
  public store(key: string, value: any, session: boolean = false) {
    if (session) {
      sessionStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }

  /**
   * Remove the object with the specified key from the specified storage.
   * @param key key.
   * @param session true to use session instead of local storage.
   */
  public remove(key: string, session: boolean = false) {
    if (session) {
      sessionStorage.removeItem(key);
    } else {
      localStorage.removeItem(key);
    }
  }

  /**
   * Get all the stored entities keys starting with the specified prefix.
   * @param prefix key prefix.
   * @param session true to use session instead of local storage.
   */
  public getKeys(prefix: string, session = false) {
    const keys: string[] = [];
    if (session) {
      for (let i = 0, len = sessionStorage.length; i < len; i++) {
        const key = sessionStorage.key(i);
        if (key.startsWith(prefix)) {
          keys.push(key);
        }
      }
    } else {
      for (let i = 0, len = localStorage.length; i < len; i++) {
        const key = localStorage.key(i);
        if (key.startsWith(prefix)) {
          keys.push(key);
        }
      }
    }
  }

  /**
   * Remove all the entries whose key starts with the specified prefix.
   * @param prefix key prefix.
   */
  public clear(prefix: string, session = false) {
    if (session) {
      for (let i = 0, len = sessionStorage.length; i < len; i++) {
        const key = sessionStorage.key(i);
        if (key.startsWith(prefix)) {
          sessionStorage.removeItem(key);
        }
      }
    } else {
      for (let i = 0, len = localStorage.length; i < len; i++) {
        const key = localStorage.key(i);
        if (key.startsWith(prefix)) {
          localStorage.removeItem(key);
        }
      }
    }
  }
}

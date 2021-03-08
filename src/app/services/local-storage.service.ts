import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }
  /**
   * Store data in localStorage
   *
   * @param key  key to store data
   * @param value data to store
   */
  public setItem(key: string, value: string) {
    localStorage.setItem(key, btoa(value));
  }

  /**
   * Retrieve specific data
   *
   * @param key key to retieve in localStorage
   */
  public getItem(key: string) {
    const item = localStorage.getItem(key);
    if (!!item) {
      return JSON.parse(atob(item));
    }
    return null;
  }
}

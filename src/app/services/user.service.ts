import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private localStorageService: LocalStorageService) { }

  get currentUser(): User {
    return this.localStorageService.getItem('currentUser');
  }

  public storeCurrentUser(user: User) {
    this.localStorageService.setItem('currentUser', JSON.stringify(user));
  }
}

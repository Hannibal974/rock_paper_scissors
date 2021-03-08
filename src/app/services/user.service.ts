import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public currentUser: User;

  constructor() { }

  public storeCurrentUser(user: User) {
    this.currentUser = user;
  }
}

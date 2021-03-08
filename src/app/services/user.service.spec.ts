import { TestBed } from '@angular/core/testing';
import { User } from '../models/user';

import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should storre user as currentUser', () => {
    const user = new User('testeur');
    service.storeCurrentUser(user);
    expect(service.currentUser).toEqual(user);
  });
});

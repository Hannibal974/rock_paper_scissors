import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { User } from '../models/user';
import { routerStub, userServiceStub } from '../tools/unit-test-stub';

import { GameGuardService } from './game-guard.service';
import { UserService } from './user.service';

describe('GameGuardService', () => {
  let service: GameGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: routerStub() },
        { provie: UserService, useValue: userServiceStub() }
      ]
    });
    service = TestBed.inject(GameGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should test canActivate with user connected', () => {
    service['userService'].currentUser = new User('test');
    expect(service.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot)).toBeTrue();
  });

  it('should test canActivate without user', () => {
    const spy = spyOn(service['router'], 'navigate');
    const result = service.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot);
    expect(spy).toHaveBeenCalledWith(['login']);
    expect(result).toBeFalse();
  });
});

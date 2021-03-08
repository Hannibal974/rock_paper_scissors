import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class GameGuardService implements CanActivate {

  /**
   * Constructor
   *
   * @param userService
   * @param router
   */
  constructor(private userService: UserService, private router: Router) { }

  /**
   * Allowed routing to game page only if currentUser is defined
   *
   * @param route
   * @param state
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(!!this.userService.currentUser) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}

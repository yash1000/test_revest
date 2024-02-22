// auth.guard.ts

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginAuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.checkAuthentication();
  }

  private checkAuthentication(): boolean | UrlTree {
    const jwtToken = localStorage.getItem('jwtToken');

    if (jwtToken) {
      // Token exists, redirect to 'user-list'
      return this.router.createUrlTree(['/user-list']);
    } else {
      // No token, allow access to the route
      return true;
    }
  }
}

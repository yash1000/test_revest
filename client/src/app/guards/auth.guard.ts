// auth.guard.ts

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
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
      return true; // User is logged in
    } else {
      // Redirect to login and return UrlTree
      return this.router.createUrlTree(['/login']);
    }
  }
}

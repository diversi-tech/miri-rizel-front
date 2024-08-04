import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from '@app/Services/auth.service';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class RoleBasedGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private jwtHelper: JwtHelperService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const token = this.authService.accessToken;
    if (!token || this.jwtHelper.isTokenExpired(token)) {
      this.router.navigate(['/login']);
      return false;
    }

    const userRole = this.authService.getRole();
    
    if (userRole === 1) {
      this.router.navigate(['/Dashboard']);
      return false;
    } else if (userRole === 2 || userRole === 3) {
      this.router.navigate(['/home']);
      return false;
    } else {
      this.router.navigate(['/403-Forbidden']);
      return false;
    }
  }
}

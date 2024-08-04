import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from '@app/Services/auth.service';
import { Observable, map, catchError, of } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private jwtHelper: JwtHelperService, private translate: TranslateService) { }

  canActivate(  route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const token = this.authService.accessToken;
    if (token == "" || this.jwtHelper.isTokenExpired(token)) {
      this.translate.get('unConnectToConnect').subscribe(translation =>
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: translation,
          showConfirmButton: false,
          timer: 2000
        }))
      this.router.navigate(['/login']);
      return false;
    }

    let userRole = this.authService.getRole();
    // if(userRole== null|| userRole== undefined)
    //   userRole=this.authService.
  
    
    const roles = route.data['roles'] as Array<number>;

    if (roles && roles.includes(userRole!)) {
      return true;
    } else {
      this.router.navigate(['403-Forbidden']);
      return false;
    }
  }
}

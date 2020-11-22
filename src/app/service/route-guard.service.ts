import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { DynamicAuthenticationService } from './dynamic-authentication.service';
import { LoginDataService } from './login-data.service';
@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {

  constructor(private dynamicAuthenticationService: DynamicAuthenticationService,private router:Router,
    private loginDataService: LoginDataService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.loginDataService.isUserLoggedIn()) 
      return true;
    
    this.router.navigate(['login'])
    return false;
  }
}

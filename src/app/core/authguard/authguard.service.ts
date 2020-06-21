import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate {

  constructor(private routes: Router, private authService: AuthService) { }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {   
    //if (localStorage.getItem('username') != null && localStorage.getItem('username') !== '') {
    if (localStorage.getItem('EINVALUE') !== '' && localStorage.getItem('EINVALUE') !== null && localStorage.getItem('EINVALUE') !== undefined) {
      return true;
    } else {
      this.routes.navigate(['/']);
      return false;
    }
  }
  CanActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    //if (localStorage.getItem('username') != null && localStorage.getItem('username') !== '') {
    if (localStorage.getItem('EINVALUE') !== '' && localStorage.getItem('EINVALUE') !== null && localStorage.getItem('EINVALUE') !== undefined) {
      return true;
    } else {
      this.routes.navigate(['/']);
      return false;
    }
  }
}

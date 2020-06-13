import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authS: AuthService,
    private router: Router ) {}

  canActivate() {
    if (!this.authS.isTokenExpired()) {
      return true;
    }

    this.router.navigate(['/home']); // TODO open login dialog
    return false;
  }

}

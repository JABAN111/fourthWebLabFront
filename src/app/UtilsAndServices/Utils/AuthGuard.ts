import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {UserService} from "../Services/UserService";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (UserService.active_account) {
      return true;
    } else {
      this.router.navigate(['/accessDenied']); // Перенаправьте пользователя на стартовую страницу, если он не вошел в систему
      return false;
    }
  }
}

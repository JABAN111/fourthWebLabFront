import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {UserService} from "../../UtilsAndServices/UserService";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userService:UserService , private router: Router) {}

  canActivate(): boolean {
    if (UserService.active_account) {
      return true;
    } else {
      console.log('где же рай...');
      console.log(UserService.active_account);
      this.router.navigate(['/accessDenied']); // Перенаправьте пользователя на стартовую страницу, если он не вошел в систему
      return false;
    }
  }
}

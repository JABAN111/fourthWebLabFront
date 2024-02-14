import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { HttpService } from "../Services/HttpService";
import { User } from "./User";
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private http: HttpService) {}

  checkValidUser(): Observable<boolean> {
    const login = localStorage.getItem('login');
    const password = localStorage.getItem('password');
    if (!login || !password) {
      return of(false);
    }
    // @ts-ignore
    const user: User = new User(login, password);

    return this.http.getUserPost(user).pipe(
      map((data: any) => {
        return data === "USER_VALID";
      })
    );
  }

  canActivate(): Observable<boolean> {
    return this.checkValidUser().pipe(
      map((isValid: boolean) => {
        if (isValid) {
          return true;
        } else {
          this.router.navigate(['/accessDenied']);
          return false;
        }
      })
    );
  }
}

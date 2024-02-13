import { Injectable } from '@angular/core';
import {User} from "../Utils/User";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private static _active_account:User | null;

  static get active_account(): User | null {
    return this._active_account;
  }

  static set active_account(value: User) {
    this._active_account = value;
  }

}

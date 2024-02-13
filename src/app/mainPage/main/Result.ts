import {User} from "../../startPage/User";

export class Result {
  constructor(
    private _x: number,
    private _y: number,
    private _r: number,
    private _date: Date,
    private _hit:null| boolean,
    private _user_id: User)
  {}


  get x(): number {
    return this._x;
  }

  set x(value: number) {
    this._x = value;
  }

  get y(): number {
    return this._y;
  }

  set y(value: number) {
    this._y = value;
  }

  get r(): number {
    return this._r;
  }

  set r(value: number) {
    this._r = value;
  }

  get date(): Date {
    return this._date;
  }

  set date(value: Date) {
    this._date = value;
  }

  get hit(): boolean | null {
    return this._hit;
  }

  set hit(value: boolean | null) {
    this._hit = value;
  }

  get user_id(): User {
    return this._user_id;
  }

  set user_id(value: User) {
    this._user_id = value;
  }
}

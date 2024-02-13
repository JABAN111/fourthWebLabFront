import {Injectable, OnInit} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {User} from "../Utils/User";
import {Result} from "../Utils/Result";
import {UserService} from "./UserService";

@Injectable()
export class HttpService{

  defaultLink:string = "http://localhost:23210";
  constructor(private http: HttpClient){ }


  public getUserPost(user:User){
    const body = {
      login: user.login,
      password: user.password
    }
    return this.http.post(this.defaultLink+"/users/check",body);
  }
  public newUserPost(newUser:User){
    const body = {login: newUser.login, password: newUser.password};
    return this.http.post(this.defaultLink+"/users", body);
  }
  getAllPreviousResults(){
    if(UserService.active_account != undefined) {
      let activeUser:User = UserService.active_account;
      const body = {
        login: activeUser.login,
        password: activeUser.password
      }
      return this.http.post(this.defaultLink + "/result/getAllByUser",body);
    }
    return null;
  }
  clearResults(user:User){
    const body =
      {
        login: user.login,
        password: user.password
      }
    return this.http.post(this.defaultLink+'/results/deleteRes',body);
  }
  getResult(result:Result){
    const body = {
      x: result.x,
      y: result.y,
      r: result.r,
      date: result.date,
      user: {
        login: result.user_id.login,
        password: result.user_id.password
      }
    }
    return this.http.post(this.defaultLink+"/results", body);
  }
}

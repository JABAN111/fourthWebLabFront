import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {User} from "../startPage/User";
import {resetParseTemplateAsSourceFileForTest} from "@angular/compiler-cli/src/ngtsc/typecheck/diagnostics";

@Injectable()
export class HttpService{

  constructor(private http: HttpClient){ }

  public getUserPost(user:User){
    const body = {
      login: user.login,
      password: user.password
    }
    return this.http.post(`http://localhost:8080/users/check`,body);
  }
  public newUserPost(newUser:User){
    const body = {login: newUser.login, password: newUser.password};
    return this.http.post("http://localhost:8080/users", body);
  }

  getResults(){
    return this.http.get("http://localhost:8080/results")
  }
  //просто в тестовом формате для сбора данных с json файла
  getData(){
    return this.http.get("assets/data/data.json")
  }

}

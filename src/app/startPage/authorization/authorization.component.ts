import {Component} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
class User{
  constructor(private login:string, private password:string) {
  }
}

@Component({
  selector: "registration",
  standalone: true,
  imports: [
    FormsModule,
    RouterLink
  ],
  styleUrl: 'authorization.component.css',
  templateUrl: "authorization.component.html"
})

export class AuthorizationComponent{
  validUser = false;

  registrationLogin: string = '';
  registrationPassword: string = '';

  loginLogin: string = '';
  loginPassword: string = '';

  logIn(login:string,password:string){
    if(login != "" || password != ""){
      console.log(`Удачный вход: login=${login} с password=${password}`)
      this.validUser = true;
      return new User(login,password);
    }
    else{
      console.error("не удалось найти пользователя");
      this.validUser = false;
      return null;
    }
  }
  registerNewUser(login:string,password:string){
    if(login != "" || password != ""){
      console.log(`Удачная регистрация: login=${login} с password=${password}`)
      this.validUser = true;
      return new User(login,password);
      }
    else{
      console.error("не удалось зарегистрировать пользователя");
      this.validUser = false;
      return null;
    }
  }

}

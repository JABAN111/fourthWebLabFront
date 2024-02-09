import {Component} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {HttpService} from "../../UtilsAndServices/HttpService";
import {User} from "../User";
import {MessageModule} from "primeng/message";
import {MessagesModule} from "primeng/messages";
import {ButtonModule} from "primeng/button";
import {MessageService} from "primeng/api";

@Component({
  selector: "registration",
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    MessageModule,
    MessagesModule,
    ButtonModule
  ],
  styleUrl: 'authorization.component.css',
  templateUrl: "authorization.component.html",
  providers: [HttpService,MessageService]
})

export class AuthorizationComponent{
  validUser = false;
  registrationLogin: string = '';
  registrationPassword: string = '';

  loginLogin: string = '';
  loginPassword: string = '';
  registrationPasswordVerification: string = '';

  constructor(private http:HttpService,private messageService: MessageService) {
  }

  addSingleMessage(body:{}) {
    this.messageService.add(body);
  }
  logIn(login:string,password:string){
    if(login != "" || password != ""){
      let user:User = new User(login,password);
      this.http.getUserPost(user).subscribe({
        next:(data:any)=>{
          switch(data) {
            case "USER_VALID":
              this.validUser = true;
              break;
            case "USER_NOT_FOUND":
              let userNotFound = {severity:'error', summary:'Вход', detail:'Пользователя с таким логином не существует'};
              this.addSingleMessage(userNotFound);
              this.validUser = false;
              break;
            case "PASSWORD_INVALID":
              let passwordInvalid = {severity:'error', summary:'Вход', detail:'Неправильный пароль'};
              this.addSingleMessage(passwordInvalid);
              this.validUser = false;
              break;
            default:
              let somethingWentWrong = {severity:'error', summary:'Вход', detail:'Что-то пошло не так'};
              this.addSingleMessage(somethingWentWrong);
              this.validUser = false;
              break;
          }
        },error: err => console.error(err)
      });
      return new User(login,password);
    }
    else{
      console.error("не удалось найти пользователя");
      this.validUser = false;
      return null;
    }
  }
  loginValidation(login:string){
    const bigLetter = /[A-Z]/;
    const number = /[0-9]/
    if (login.length >= 4) {
      if(login.search(number) != -1 && login.search(bigLetter) != -1) {
        return true;
      }else{
        let invalidType = {severity:'error', summary:'Регистрация', detail:'Логин должен содержать минимум 1 большую букву и одну цифру'};
        this.addSingleMessage(invalidType);
      }
    }else{
      let lengthMustBeMoreThanSix = {severity:'error', summary:'Регистрация', detail:'Логин должен состоять минимум из 4 символов'};
      this.addSingleMessage(lengthMustBeMoreThanSix);
    }
    return false;
  }
  passwordValidation(password:string,passwordVerification:string){
    const num = /\d/;
    const bigLetter = /[A-Z]/;
    if(password.length == 0 || passwordVerification.length == 0){
      let notFullData = {severity:'error', summary:'Регистрация', detail:'Все поля регистрации должны быть заполнены'};
      this.addSingleMessage(notFullData);
      return false;
    }
    if(password.length >= 6){
      if(password.search(num) != -1 && password.search(bigLetter) != -1){
        if(password == passwordVerification)
          return true;
        else{
          let dontMatchPasswords = {severity:'error', summary:'Регистрация', detail:'Пароли не совпадают'};
          this.addSingleMessage(dontMatchPasswords);
        }
      }else{
        let invalidType = {severity:'error', summary:'Регистрация', detail:'Пароль должен содержать минимум 1 большую букву и одну цифру'};
        this.addSingleMessage(invalidType);
      }
    }else{
      let lengthMustBeMoreThanSix = {severity:'error', summary:'Регистрация', detail:'Пароль должен состоять минимум из 6 символов'};
      this.addSingleMessage(lengthMustBeMoreThanSix);
    }
    return false;
  }
  validateUserData(login:string,password:string,verificationPassword:string){
    return this.loginValidation(login) && this.passwordValidation(password,verificationPassword)
  }

  registerNewUser(login:string,password:string,verificationPassword:string) {
    if (this.validateUserData(login,password,verificationPassword)) {
      let user: User = new User(login, password);

      this.http.newUserPost(user).subscribe({
        next: (data: any) => {
          if (data == "SUCCESSFULLY_CREATED") {
            this.validUser = true;
          }
          else if(data == "USER_ALREADY_EXIST"){
            this.validUser = false;
          }
        }, error: error => console.log(error)
      })
      this.validUser = true;
    }
  else{
      console.error("invalid login or password");
      this.validUser = false;
    }
  }
  clear() {
    this.messageService.clear();
  }

}

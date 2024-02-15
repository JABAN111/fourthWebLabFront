import {Component, OnInit} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {HttpService} from "../../UtilsAndServices/Services/HttpService";
import {User} from "../../UtilsAndServices/Utils/User";
import {MessageModule} from "primeng/message";
import {MessagesModule} from "primeng/messages";
import {ButtonModule} from "primeng/button";
import {MessageService} from "primeng/api";
import {UserService} from "../../UtilsAndServices/Services/UserService";
import {ResultKeeperService} from "../../UtilsAndServices/Services/ResultKeeperService";import {NgIf} from "@angular/common";
import {ToastModule} from "primeng/toast";
import {HeaderComponent} from "../../header/header.component";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";

@Component({
  selector: "registration",
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    MessageModule,
    MessagesModule,
    ButtonModule,
    NgIf,
    ToastModule,
    HeaderComponent
  ],
  styleUrl: 'authorizationStyles/authorization.component.css',
  templateUrl: "authorization.component.html",
  providers: [HttpService,MessageService,UserService,ResultKeeperService]
})

export class AuthorizationComponent implements OnInit{
  selectedRegistration: boolean = false;

  registrationLogin: string = '';
  registrationPassword: string = '';

  loginLogin: string = '';
  loginPassword: string = '';
  registrationPasswordVerification: string = '';

  constructor(private http:HttpService,private messageService: MessageService,private router:Router) {
  }

  ngOnInit(): void {
    let login = localStorage.getItem('login');
    let password = localStorage.getItem('password');
    if(login != null && password != null){
      // @ts-ignore
      this.logIn(login,password);
    }
  }
  setSelectedRegistration(isRegistration:boolean){
    this.selectedRegistration = isRegistration;
  }

  addSingleMessage(body:{}) {
    this.messageService.add(body);
  }

  logIn(login:string, password:string){
    if(login != '' || password != ""){
      ResultKeeperService.results = [];
      let user:User = new User(login,password);
      this.http.getUserPost(user).subscribe({
        next:(data:any)=>{
          switch(data) {
            case "USER_VALID":
              UserService.active_account = user;
              localStorage.setItem("login",UserService.active_account.login);
              localStorage.setItem("password",UserService.active_account.password);
              this.http.getAllPreviousResults()?.subscribe({
                next:(data:any)=>{
                  ResultKeeperService.results = data;
                  this.router.navigate(['main']);
                  // console.log('должны перейти к main');
                },error: err=>this.addSingleMessage({severity:'error', summary:'Вход', detail: err.message})
              })
              break;
            case "USER_NOT_FOUND":
              let userNotFound = {severity:'error', summary:'Вход', detail:'Пользователя с таким логином не существует'};
              this.addSingleMessage(userNotFound);
              break;
            case "PASSWORD_INVALID":
              let passwordInvalid = {severity:'error', summary:'Вход', detail:'Неправильный пароль'};
              this.addSingleMessage(passwordInvalid);
              break;
            default:
              let somethingWentWrong = {severity:'error', summary:'Вход', detail:'Что-то пошло не так'};
              this.addSingleMessage(somethingWentWrong);
              break;
          }
        },error: error => {
          this.addSingleMessage({severity: 'error', summary: 'Вход', detail: error.message})
        }
      });
    }
    else{
      this.addSingleMessage({severity: 'error', summary: 'Вход', detail: "Не удалось найти пользователя"})
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
          switch(data) {
            case "SUCCESSFULLY_CREATED":
              UserService.active_account = user;
              localStorage.setItem("login",UserService.active_account.login);
              localStorage.setItem("password",UserService.active_account.password);
              this.router.navigate(['main']);
              break;
            case "USER_ALREADY_EXIST":
              let userAlreadyExist = {severity:'error', summary:'Регистрация', detail:'Пользователь с таким логином уже существует'};
              this.addSingleMessage(userAlreadyExist);
              break;
            default:
              let somethingWentWrong = {severity:'error', summary:'Регистрация', detail:'Что-то пошло не так'};
              this.addSingleMessage(somethingWentWrong);
              break;
          }
        }, error: error => {
          this.addSingleMessage({severity: 'error', summary: 'Регистрация', detail: error.message})
        }})
    }
  }
}

import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {HeaderComponent} from "../header/header.component";
import {SliderModule} from "primeng/slider";
import {FormsModule} from "@angular/forms";
import {MultiSelectModule} from "primeng/multiselect";
import {RippleModule} from "primeng/ripple";
import {ButtonModule} from "primeng/button";
import {CanActivate, Router, RouterOutlet} from "@angular/router";
import {UserService} from "../UtilsAndServices/Services/UserService";
import {HttpService} from "../UtilsAndServices/Services/HttpService";
import {Result} from "../UtilsAndServices/Utils/Result";
import {User} from "../UtilsAndServices/Utils/User";
import {ResultKeeperService} from "../UtilsAndServices/Services/ResultKeeperService";
import {TableModule} from "primeng/table";
import {DatePipe} from "@angular/common";
import {CanvasService} from "../UtilsAndServices/Services/CanvasService";
import {MessageService} from "primeng/api";
import {MessagesModule} from "primeng/messages";
import {ToastModule} from "primeng/toast";

@Component({
  selector: "main",
  standalone: true,
  imports: [
    HeaderComponent,
    SliderModule,
    FormsModule,
    MultiSelectModule,
    RippleModule,
    ButtonModule,
    TableModule,
    DatePipe,
    MessagesModule,
    ToastModule
  ],
  templateUrl: "mainPage.component.html",
  providers: [UserService, RouterOutlet, HttpService,
    ResultKeeperService, CanvasService,MessageService
  ]
})

export class MainPageComponent implements AfterViewInit, CanActivate, OnInit {
  results: Result[] = [];

  xOptions = ['-3', '-2', '-1', '0', '1', '2', '3', '4', '5'];
  selectedX: string[] = ['0'];

  selectedY: number = 2.5;

  radiusOptions = ['-3', '-2', '-1', '1', '2', '3', '4', '5'];
  selectedRadius: string[] = ['2'];

  @ViewChild('myCanvas', {static: true})
  canvas!: ElementRef<HTMLCanvasElement>;
  ctx!: CanvasService;
  //default value: 2
  private currentRadius = 2;

  constructor(private messageService: MessageService,private http: HttpService, private router: Router) {}
  ngOnInit(): void {this.results = ResultKeeperService.results;}
  canActivate() {
    if (UserService.active_account) {
      return true;
    }
    else {
      console.error('Для доступа необходимо войти в аккаунт');
      this.router.navigate(['/accessDenied'])
      return false;
    }
  }
  ngAfterViewInit(): void {
    this.ctx = new CanvasService(this.canvas.nativeElement.getContext('2d'), this.canvas, this.results);
    this.ctx.drawCanvas();
    this.addOldDotsOnPage();
  }
  clickSender(event:MouseEvent){
    if(UserService.active_account) {
      let resultToSend = this.ctx.mouseHandler(event,UserService.active_account)?.resultToSend;
      this.processingResultFromServer(resultToSend);
    }
  }

  setRadius(newRadius: number) {
    this.selectedRadius = ['' + newRadius];
    this.currentRadius = newRadius;
    this.ctx.drawCanvas();
  }

  updateRadius(){
    if(!this.validatorValue(this.selectedRadius)){
      this.messageService.add({severity:'warn', summary:'Валидация данных', detail: "Должен быть выбран только один радиус"});
      return;
    }
    let radius = this.validatorValue(this.selectedRadius);
    if(radius){
      this.selectedRadius = ['' + radius];
      this.ctx.setRadius(radius);
      this.setRadius(radius);
    }
    this.addOldDotsOnPage();
  }

  addOldDotsOnPage(){
    for (let result of this.results){
      this.ctx.printDotOnGraphByResult(result);
    }
  }
  validatorValue(selectedOption: string[]) {
    if (selectedOption.length != 1) {

      return false;
    }
    return +selectedOption[0];
  }

  addResult(newResult: Result) {
    this.ctx.printDotOnGraphByResult(newResult);
    ResultKeeperService.results.push(newResult);
  }

  processingResultFromServer(resultToSend: Result) {
    let resultResponse: Result;
    this.http.getResult(resultToSend).subscribe({
      next: (data: any) => {
        resultResponse = new Result(data.x, data.y, data.r, new Date(), data.hit, data.user);
        this.addResult(resultResponse);
        this.messageService.add({severity: 'success', summary: 'Успех', detail: 'Данные отправлены' })
        return resultResponse;
      }, error: err => console.error(err)
    });
  }

  submitForm() {
    console.log(this.selectedX)
    if(!this.validatorValue(this.selectedX)) {
      this.messageService.add({severity: 'warn', summary: 'Валидация данных', detail: "Должен быть выбран только один x"});
      return;
    }
    let x = this.validatorValue(this.selectedX);
    let y = this.selectedY;
    if (UserService.active_account) {
      let resultToSend: Result = new Result(+x, y, this.currentRadius, new Date(), null, UserService.active_account);
      this.processingResultFromServer(resultToSend);
    }
  }
  clearAll(){
    this.ctx.clearAll();
    ResultKeeperService.results = [];
    this.results = ResultKeeperService.results;
    this.http.clearResults(<User> UserService.active_account).subscribe({
      next:(data:any) => {
        console.log(data);
      },error: err => console.error(err)
    });
  }
}

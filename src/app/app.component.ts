import {Component, OnInit} from "@angular/core";
import { RouterOutlet} from "@angular/router";
import {MultiSelectModule} from "primeng/multiselect";
import {FormsModule} from "@angular/forms";
import { PrimeNGConfig } from 'primeng/api';


@Component({
  selector: "my-app",
  standalone: true,
  imports: [RouterOutlet, MultiSelectModule, FormsModule],
  animations: [],
  styleUrl: "app.component.css",
  templateUrl: "app.component.html",

  // template: `<router-outlet></router-outlet>`,
})
export class AppComponent implements OnInit{
  title:string = "fourthWebLabFront";
  xOptions = ['-3', '-2', '-1', '0', '1', '2', '3', '4', '5'];
  selectedX: string = '';
  constructor(private primengConfig: PrimeNGConfig) {}

  ngOnInit() {
    this.primengConfig.ripple = true;
  }
}

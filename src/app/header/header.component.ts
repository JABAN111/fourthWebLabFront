import {Component} from "@angular/core";
import {ClockComponent} from "./clock/clock.component";


@Component({
  selector: "head-data",
  standalone: true,
  styleUrl: "header.component.css",
  imports: [ClockComponent],
  templateUrl: "headerPart.html"
})
export class HeaderComponent{

}

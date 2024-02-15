import {Component} from "@angular/core";
import {ClockComponent} from "./clock/clock.component";
import {NgOptimizedImage} from "@angular/common";


@Component({
  selector: "head-data",
  standalone: true,
  styleUrl: "stylesForHeader/header.component.css",
  imports: [ClockComponent, NgOptimizedImage],
  templateUrl: "headerPart.html"
})
export class HeaderComponent{

}

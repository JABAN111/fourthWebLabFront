import {Component} from "@angular/core";
import {HeaderComponent} from "../header/header.component";
import {AuthorizationComponent} from "./authorization/authorization.component";

@Component({
  selector: "start-page",
  standalone: true,
  imports: [
    HeaderComponent,
    AuthorizationComponent
  ],
  styleUrl: "startPage.component.css",
  template: `
        <head-data></head-data>
        <registration></registration>
  `
})

export class StartPageComponent{}

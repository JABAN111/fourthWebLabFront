import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {ButtonModule} from "primeng/button";

@Component({
  selector: 'access-denied',
  standalone: true,
  imports: [
    RouterLink,
    ButtonModule
  ],
  templateUrl: './access-denied.component.html',
  styleUrl: './access-denied.component.css',
  providers: [RouterLink,RouterOutlet]
})
export class AccessDeniedComponent {

}

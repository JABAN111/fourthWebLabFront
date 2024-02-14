import {Component } from "@angular/core";
import { RouterOutlet} from "@angular/router";

@Component({
  selector: "my-app",
  standalone: true,
  imports: [RouterOutlet],
  styleUrl: "app.component.css",
  templateUrl: "app.component.html",
})
export class AppComponent {
  title = "lab 4";
}


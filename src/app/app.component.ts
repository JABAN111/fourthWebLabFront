import {Component } from "@angular/core";
import { RouterOutlet} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: "my-app",
  standalone: true,
  imports: [RouterOutlet, HttpClientModule],
  styleUrl: "app.component.css",
  templateUrl: "app.component.html",
})
export class AppComponent {
  title = "lab 4";
}


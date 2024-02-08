import { provideRouter, Routes } from "@angular/router";
import { ApplicationConfig } from "@angular/core";
import {provideAnimations} from "@angular/platform-browser/animations";


// компоненты, которые сопоставляются с маршрутами
import {MainPageComponent} from "./mainPage/mainPage.component";
import {NotFoundComponent} from "./ErrorPages/notFound/not-found.component";
import {StartPageComponent} from "./startPage/startPage.component";

// определение маршрутов
const appRoutes: Routes =[
  { path: "", component: StartPageComponent},
  { path: "main", component: MainPageComponent},
  { path: "**", component: NotFoundComponent }
];

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(appRoutes),provideAnimations()]
};

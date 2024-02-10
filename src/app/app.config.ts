import { provideRouter, Routes } from "@angular/router";
import { ApplicationConfig } from "@angular/core";
import {provideAnimations} from "@angular/platform-browser/animations";

// компоненты, которые сопоставляются с маршрутами
import {MainPageComponent} from "./mainPage/mainPage.component";
import {NotFoundComponent} from "./ErrorPages/notFound/not-found.component";
import {StartPageComponent} from "./startPage/startPage.component";
import {AccessDeniedComponent} from "./ErrorPages/access-denied/access-denied.component";
import {HomeComponent} from "./test/home.component";
import {AuthGuard} from "./mainPage/main/AuthGuard";

// определение маршрутов
const appRoutes: Routes =[
  { path: "", component: StartPageComponent},
  { path: "main", component: MainPageComponent, canActivate: [AuthGuard]},
  { path: "*", component: NotFoundComponent },
  {path: "accessDenied", component: AccessDeniedComponent},
  {path: "home", component:HomeComponent}
];

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(appRoutes),provideAnimations()]
};


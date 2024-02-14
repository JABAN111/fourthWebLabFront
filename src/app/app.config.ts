import {provideRouter, RouterModule, Routes} from "@angular/router";
import {ApplicationConfig, NgModule} from "@angular/core";
import {provideAnimations} from "@angular/platform-browser/animations";

// компоненты, которые сопоставляются с маршрутами
import {MainPageComponent} from "./mainPage/mainPage.component";
import {NotFoundComponent} from "./ErrorPages/notFound/not-found.component";
import {StartPageComponent} from "./startPage/startPage.component";
import {AccessDeniedComponent} from "./ErrorPages/access-denied/access-denied.component";
import {AuthGuard} from "./UtilsAndServices/Utils/AuthGuard";
import {HttpService} from "./UtilsAndServices/Services/HttpService";
import {NgModel} from "@angular/forms";
import {provideHttpClient} from "@angular/common/http";

// определение маршрутов
//for Local
const appRoutes: Routes =[
  { path: "", component: StartPageComponent},
  { path: "main", component: MainPageComponent, canActivate: [AuthGuard]},
  { path: "*", component: NotFoundComponent },
  {path: "accessDenied", component: AccessDeniedComponent},
];


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(appRoutes),provideAnimations(),provideHttpClient()]
};


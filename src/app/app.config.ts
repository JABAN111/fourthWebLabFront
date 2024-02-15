import {provideRouter, Routes} from "@angular/router";
import {ApplicationConfig} from "@angular/core";
import {provideAnimations} from "@angular/platform-browser/animations";

import {MainPageComponent} from "./mainPage/mainPage.component";
import {NotFoundComponent} from "./ErrorPages/notFound/not-found.component";
import {StartPageComponent} from "./startPage/startPage.component";
import {AccessDeniedComponent} from "./ErrorPages/access-denied/access-denied.component";
import {AuthGuard} from "./UtilsAndServices/Utils/AuthGuard";
import {provideHttpClient} from "@angular/common/http";
import {HashLocationStrategy, LocationStrategy} from "@angular/common";

const appRoutes: Routes =[
  { path: "", component: StartPageComponent},
  { path: "main", component: MainPageComponent, canActivate: [AuthGuard]},
  { path: "*", component: NotFoundComponent },
  {path: "accessDenied", component: AccessDeniedComponent},
];


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(appRoutes),provideAnimations(),provideHttpClient(),
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ]
};


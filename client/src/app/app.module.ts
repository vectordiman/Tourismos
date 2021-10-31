import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import { TextInputComponent } from './_forms/text-input/text-input.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ToastrModule } from 'ngx-toastr';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import {ErrorInterceptor} from "./_interceptors/error.interceptor";
import { TourPackageCardComponent } from './tour_packages/tour-package-card/tour-package-card.component';
import { TourPackageListComponent } from './tour_packages/tour-package-list/tour-package-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AppComponent,
    NavComponent,
    RegisterComponent,
    LoginComponent,
    TextInputComponent,
    NotFoundComponent,
    TestErrorsComponent,
    ServerErrorComponent,
    TourPackageCardComponent,
    TourPackageListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

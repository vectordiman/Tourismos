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
import { TextInputComponent } from './_forms/text-input/text-input.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import {ErrorInterceptor} from "./_interceptors/error.interceptor";
import { TourPackageCardComponent } from './tour_packages/tour-package-card/tour-package-card.component';
import { TourPackageListComponent } from './tour_packages/tour-package-list/tour-package-list.component';
import { TourPackageDetailComponent } from './tour_packages/tour-package-detail/tour-package-detail.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { UserManagementComponent } from './admin/user-management/user-management.component';
import { SharedModule } from './_modules/shared/shared.module';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { RolesModalComponent } from './modals/roles-modal/roles-modal.component';
import { TourPackageCreationComponent } from './admin/tour-package-creation/tour-package-creation.component';
import { DateInputComponent } from './_forms/date-input/date-input.component';
import { FooterComponent } from './footer/footer.component';
import { UserMessagesComponent } from './user-messages/user-messages.component';
import { HasRoleDirective } from './_directives/has-role.directive';
import { TourPackageEditComponent } from './tour_packages/tour-package-edit/tour-package-edit.component';
import { UserProfileDetailComponent } from './user-profile/user-profile-detail/user-profile-detail.component';
import { UserProfileEditComponent } from './user-profile/user-profile-edit/user-profile-edit.component';
import { UserProfileComponent } from './user-profile/user-profile/user-profile.component';
import { ConfirmDialogComponent } from './modals/confirm-dialog/confirm-dialog.component';

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
    TourPackageListComponent,
    TourPackageDetailComponent,
    AdminPanelComponent,
    UserManagementComponent,
    RolesModalComponent,
    TourPackageCreationComponent,
    DateInputComponent,
    FooterComponent,
    UserMessagesComponent,
    HasRoleDirective,
    TourPackageEditComponent,
    UserProfileDetailComponent,
    UserProfileEditComponent,
    UserProfileComponent,
    ConfirmDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

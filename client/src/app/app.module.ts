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
import { UserMessagesComponent } from './user/user-messages/user-messages.component';
import { HasRoleDirective } from './_directives/has-role.directive';
import { TourPackageEditComponent } from './tour_packages/tour-package-edit/tour-package-edit.component';
import { UserProfileDetailComponent } from './user/user-profile/user-profile-detail/user-profile-detail.component';
import { UserProfileEditComponent } from './user/user-profile/user-profile-edit/user-profile-edit.component';
import { UserProfileComponent } from './user/user-profile/user-profile/user-profile.component';
import { ConfirmDialogComponent } from './modals/confirm-dialog/confirm-dialog.component';
import { UserModalComponent } from './modals/user-modal/user-modal.component';
import { TourPhotoEditorComponent } from './tour_packages/tour-photo-editor/tour-photo-editor.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { UserMessagesListComponent } from './expert/user-messages-list/user-messages-list.component';
import {PaginationModule} from "ngx-bootstrap/pagination";
import {ButtonsModule} from "ngx-bootstrap/buttons";
import {CollapseModule} from "ngx-bootstrap/collapse";
import { FavoritesToursComponent } from './user/favorites-tours/favorites-tours.component';
import { ExpertPanelComponent } from './expert/expert-panel/expert-panel.component';
import { MessagesComponent } from './messages/messages.component';
import { ExpertMessagesListComponent } from './admin/expert-messages-list/expert-messages-list.component';
import { AdminMessagesListComponent } from './expert/admin-messages-list/admin-messages-list.component';
import { ServiceCreationComponent } from './expert/service-creation/service-creation.component';
import { ServiceDetailComponent } from './tour-services/service-detail/service-detail.component';
import { ServiceListComponent } from './tour-services/service-list/service-list.component';
import { ServiceCardComponent } from './tour-services/service-card/service-card.component';

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
    UserModalComponent,
    TourPhotoEditorComponent,
    UserMessagesListComponent,
    FavoritesToursComponent,
    ExpertPanelComponent,
    MessagesComponent,
    ExpertMessagesListComponent,
    AdminMessagesListComponent,
    ServiceCreationComponent,
    ServiceDetailComponent,
    ServiceListComponent,
    ServiceCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    SharedModule,
    CarouselModule.forRoot(),
    PaginationModule,
    ButtonsModule,
    CollapseModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

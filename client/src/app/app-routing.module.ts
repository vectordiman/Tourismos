import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";
import { NotFoundComponent } from './errors/not-found/not-found.component';
import {TestErrorsComponent} from "./errors/test-errors/test-errors.component";
import {ServerErrorComponent} from "./errors/server-error/server-error.component";
import {HomeComponent} from "./home/home.component";
import { TourPackageListComponent } from './tour_packages/tour-package-list/tour-package-list.component';
import { TourPackageDetailComponent } from './tour_packages/tour-package-detail/tour-package-detail.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { AdminGuard } from './_guards/admin.guard';
import {AuthGuard} from "./_guards/auth.guard";
import {UserProfileComponent} from "./user/user-profile/user-profile/user-profile.component";
import {UserProfileResolver} from "./_resolvers/user-profile.resolver";
import {UserProfileEditComponent} from "./user/user-profile/user-profile-edit/user-profile-edit.component";
import {PreventUnsavedChangesGuard} from "./_guards/prevent-unsaved-changes.guard";
import {FavoritesToursComponent} from "./user/favorites-tours/favorites-tours.component";
import {ExpertPanelComponent} from "./expert/expert-panel/expert-panel.component";
import {ExpertGuard} from "./_guards/expert.guard";
import {MessagesComponent} from "./messages/messages.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {
    path:'',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {path: 'users/:username', component: UserProfileComponent, resolve: {member: UserProfileResolver}},
      {path: 'users/:username/edit', component: UserProfileEditComponent, canDeactivate: [PreventUnsavedChangesGuard]}
    ]
  },
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'admin', component: AdminPanelComponent, canActivate: [AdminGuard]},
  {path: 'expert', component: ExpertPanelComponent, canActivate: [ExpertGuard]},
  {path: 'trips', component: TourPackageListComponent},
  {path: 'trips/:id', component: TourPackageDetailComponent},
  {path: 'not-found', component: NotFoundComponent},
  {path: 'errors', component: TestErrorsComponent},
  {path: 'not-found', component: NotFoundComponent},
  {path: 'server-error', component: ServerErrorComponent},
  {path: 'favorites-tours', component: FavoritesToursComponent},
  {path: 'messages', component: MessagesComponent},
  {path: '**', component: NotFoundComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

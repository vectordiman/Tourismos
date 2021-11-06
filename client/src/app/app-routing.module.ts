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

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'admin', component: AdminPanelComponent, canActivate: [AdminGuard]},
  {path: 'trips', component: TourPackageListComponent},
  {path: 'trips/:id', component: TourPackageDetailComponent},
  {path: 'not-found', component: NotFoundComponent},
  {path: 'errors', component: TestErrorsComponent},
  {path: 'not-found', component: NotFoundComponent},
  {path: 'server-error', component: ServerErrorComponent},
  {path: '**', component: NotFoundComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

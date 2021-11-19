import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanDeactivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {ConfirmService} from "../_services/confirm.service";
import {UserProfileEditComponent} from "../user-profile/user-profile-edit/user-profile-edit.component";

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangesGuard implements CanDeactivate<unknown> {

  constructor(private confirmService: ConfirmService) {
  }

  canDeactivate(component: UserProfileEditComponent): Observable<boolean> | boolean {
    if(component.editForm.dirty) {
      return this.confirmService.confirm();
    }
    return true;
  }

}

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {AccountService} from "../_services/account.service";
import {ToastrService} from "ngx-toastr";
import {map} from "rxjs/operators";
import {User} from "../_models/user";

@Injectable({
  providedIn: 'root'
})
export class ExpertGuard implements CanActivate {
  constructor(private accountService: AccountService,
              private toastr: ToastrService) {}

  canActivate(): Observable<boolean> {
    return this.accountService.currentUser$.pipe(
      map((user: User) => {
        if (user.role.includes('Expert')) {
          return true;
        }
        this.toastr.error("Cannot enter this area");
        return false;
      })
    );
  }

}

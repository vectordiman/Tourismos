import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TourPackage } from '../_models/tour-package';
import { User } from '../_models/user';
import { Expert } from '../_models/expert';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUsersWithRoles() {
    return this.http.get<Partial<User[]>>(this.baseUrl + "admin/user-roles");
  }

  updateUserRole(username: string, role: string) {
    return this.http.get(this.baseUrl + 'admin/edit-role/' + username + '?role=' + role);
  }

  getExperts() {
    return this.http.get<Partial<Expert[]>>(this.baseUrl + "users/expert");
  }
}

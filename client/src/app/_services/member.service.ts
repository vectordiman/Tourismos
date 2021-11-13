import { Injectable } from '@angular/core';
import {AccountService} from "./account.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Member} from "../_models/member";
import {User} from "../_models/user";
import {map, take} from "rxjs/operators";
import {of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  baseUrl = environment.apiUrl;
  members: Member[] = [];
  memberCache = new Map();
  user!: User;


  constructor(private http: HttpClient, private accountService: AccountService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
      this.user = user;
    })
  }

  getMember(username: string | null) {
    const member = [...this.memberCache.values()]
      .reduce((arr, element) => arr.concat(element.result), [])
      .find((member: Member) => member.username === username);

    if(member) {
      return of(member);
    }

    return this.http.get<Member>(this.baseUrl + 'users/' + username);
  }

  updateMember(member: Member) {
    return this.http.put(this.baseUrl + 'users', member).pipe(
      map(() => {
        const index = this.members.indexOf(member);
        this.members[index] = member;
      })
    )
  }

  addMainPhoto() {
    return this.http.post(this.baseUrl + 'users/add-main-photo', {});
  }

  deletePhoto(photoId: number) {
    return this.http.delete(this.baseUrl + 'users/delete-photo/' + photoId, {});
  }
}

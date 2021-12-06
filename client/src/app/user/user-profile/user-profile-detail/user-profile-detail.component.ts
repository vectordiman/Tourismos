import { Component, OnInit } from '@angular/core';
import {Member} from "../../../_models/member";
import {User} from "../../../_models/user";
import {ActivatedRoute, Router} from "@angular/router";
import {AccountService} from "../../../_services/account.service";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-user-profile-detail',
  templateUrl: './user-profile-detail.component.html',
  styleUrls: ['./user-profile-detail.component.css']
})
export class UserProfileDetailComponent implements OnInit {
  member!: Member;
  user!: User;

  constructor(private route: ActivatedRoute, private accountService: AccountService, private router: Router) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.member = data.member;
    })

  }
}

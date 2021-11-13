import {Component, Input, OnInit, Output} from '@angular/core';
import {Member} from "../../_models/member";
import {User} from "../../_models/user";
import {ActivatedRoute, Router} from "@angular/router";
import {AccountService} from "../../_services/account.service";
import {take} from "rxjs/operators";
import {MemberService} from "../../_services/member.service";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  @Input() member!: Member;
  user!: User;

  constructor(private route: ActivatedRoute, private accountService: AccountService, private memberService: MemberService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    this.memberService.getMember(this.user.username).subscribe(member => {
      this.member = member;
    })
  }
}

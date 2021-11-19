import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Member} from "../../_models/member";
import {User} from "../../_models/user";
import {AccountService} from "../../_services/account.service";
import {MemberService} from "../../_services/member.service";
import {ToastrService} from "ngx-toastr";
import {take} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-user-profile-edit',
  templateUrl: './user-profile-edit.component.html',
  styleUrls: ['./user-profile-edit.component.css']
})
export class UserProfileEditComponent implements OnInit {
  @ViewChild('editForm') editForm!: NgForm;
  member!: Member;
  user!: User;

  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private accountService: AccountService, private memberService: MemberService, private toastr: ToastrService, private router: Router, private route: ActivatedRoute) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user)
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  edit() {
    this.memberService.changeEditUserMode();
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.member = data.member;
    })
  }

  updateMember() {
    this.memberService.updateMember(this.member).subscribe(() => {
      this.toastr.success('Profile updated successfully');
      this.editForm.reset(this.member);
    })
  }
}

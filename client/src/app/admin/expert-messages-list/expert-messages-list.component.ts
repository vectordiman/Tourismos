import { Component, OnInit } from '@angular/core';
import {User} from "../../_models/user";
import {MessageService} from "../../_services/message.service";
import {AccountService} from "../../_services/account.service";
import {take} from "rxjs/operators";
import {AdminService} from "../../_services/admin.service";
import {Expert} from "../../_models/expert";

@Component({
  selector: 'app-expert-messages-list',
  templateUrl: './expert-messages-list.component.html',
  styleUrls: ['./expert-messages-list.component.css']
})
export class ExpertMessagesListComponent implements OnInit {
  experts: Partial<Expert[]> | undefined;
  currentExpert!: Expert;
  user!: User;
  messageMode = false;

  constructor(private messageService: MessageService, private accountService: AccountService, private adminService: AdminService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit(): void {
    this.loadExperts()
  }

  ngOnDestroy(): void {
    this.messageService.stopHubConnection();
  }

  loadExperts() {
    this.adminService.getExperts().subscribe(result => {
      this.experts = result
    })
  }

  setCurrentSender(expert: Expert) {
    this.currentExpert = expert;
    this.messageModeChange();
  }

  messageModeChange() {
    if(!this.messageMode) {
      this.messageService.createHubConnection(this.user, this.currentExpert.username);
    }
    else {
      this.messageService.stopHubConnection();
    }
    this.messageMode = !this.messageMode;
  }

}

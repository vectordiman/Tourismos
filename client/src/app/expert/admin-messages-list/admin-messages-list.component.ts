import { Component, OnInit } from '@angular/core';
import {Expert} from "../../_models/expert";
import {User} from "../../_models/user";
import {MessageService} from "../../_services/message.service";
import {AccountService} from "../../_services/account.service";
import {AdminService} from "../../_services/admin.service";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-admin-messages-list',
  templateUrl: './admin-messages-list.component.html',
  styleUrls: ['./admin-messages-list.component.css']
})
export class AdminMessagesListComponent implements OnInit {
  admins: Partial<User[]> | undefined;
  currentAdmin!: User;
  user!: User;
  messageMode = false;

  constructor(private messageService: MessageService, private accountService: AccountService, private adminService: AdminService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit(): void {
    this.loadAdmins()
  }

  ngOnDestroy(): void {
    this.messageService.stopHubConnection();
  }

  loadAdmins() {
    this.adminService.getAdmins().subscribe(result => {
      this.admins = result
    })
  }

  setCurrentSender(admin: User) {
    this.currentAdmin = admin;
    this.messageModeChange();
  }

  messageModeChange() {
    if(!this.messageMode) {
      this.messageService.createHubConnection(this.user, this.currentAdmin.username);
    }
    else {
      this.messageService.stopHubConnection();
    }
    this.messageMode = !this.messageMode;
  }

}

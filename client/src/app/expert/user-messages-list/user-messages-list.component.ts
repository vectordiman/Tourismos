import {Component, OnDestroy, OnInit} from '@angular/core';
import {MessageService} from "../../_services/message.service";
import {User} from "../../_models/user";
import {take} from "rxjs/operators";
import {AccountService} from "../../_services/account.service";

@Component({
  selector: 'app-user-messages-list',
  templateUrl: './user-messages-list.component.html',
  styleUrls: ['./user-messages-list.component.css']
})
export class UserMessagesListComponent implements OnInit, OnDestroy {
  senders: User[] = [];
  currentSender!: User;
  user!: User;
  messageMode = false;

  constructor(private messageService: MessageService, private accountService: AccountService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit(): void {
    this.loadSenders(this.user.username)
  }

  ngOnDestroy(): void {
    this.messageService.stopHubConnection();
  }

  loadSenders(username: string) {
    this.messageService.getSenders(username).subscribe(result => {
      this.senders = result.filter(user => user.role !== 'Admin')
    })
  }

  setCurrentSender(sender: User) {
    this.currentSender = sender;
    this.messageModeChange();
  }

  messageModeChange() {
    if(!this.messageMode) {
      this.messageService.createHubConnection(this.user, this.currentSender.username);
    }
    else {
      this.messageService.stopHubConnection();
    }
    this.messageMode = !this.messageMode;
  }

}

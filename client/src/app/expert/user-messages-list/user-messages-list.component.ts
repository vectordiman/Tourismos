import {Component, OnInit} from '@angular/core';
import {MessageService} from "../../_services/message.service";
import {ConfirmService} from "../../_services/confirm.service";
import {Pagination} from "../../_models/pagination";
import {User} from "../../_models/user";
import {take} from "rxjs/operators";
import {AccountService} from "../../_services/account.service";

@Component({
  selector: 'app-user-messages-list',
  templateUrl: './user-messages-list.component.html',
  styleUrls: ['./user-messages-list.component.css']
})
export class UserMessagesListComponent implements OnInit {
  senders: User[] = [];
  user!: User;
  isCollapsed = true;

  constructor(private messageService: MessageService, private accountService: AccountService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit(): void {
    this.loadSenders(this.user.username)
  }

  loadSenders(username: string) {
    this.messageService.getSenders(username).subscribe(result => {
      this.senders = result
    })
  }


}

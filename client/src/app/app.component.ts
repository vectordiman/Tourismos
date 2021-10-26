import { Component } from '@angular/core';
import {AccountService} from "./_services/account.service";
import {User} from "./_models/user";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tourismos';
  users: any;

  constructor(private accountService: AccountService) {}

  ngOnInit() {
    this.setCurrentUser();
  }

  setCurrentUser() {
    const user: User = JSON.parse(<string>localStorage.getItem('user'));

    if(user) {
      this.accountService.setCurrentUser(user);
    }

  }
}

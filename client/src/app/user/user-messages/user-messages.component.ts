import {ChangeDetectionStrategy, Component, Input, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Message} from "../../_models/message";
import {MessageService} from "../../_services/message.service";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-user-messages',
  templateUrl: './user-messages.component.html',
  styleUrls: ['./user-messages.component.css']
})
export class UserMessagesComponent implements OnInit {
  @ViewChild('messageForm') messageForm!: NgForm;
  @Input() messages!: Message[];
  @Input() username!: string;
  messageContent!: string;

  constructor(public messageService: MessageService) { }

  ngOnInit(): void {}

  sendMessage() {
    this.messageService.sendMessage(this.username, this.messageContent).then(() => {
      this.messageForm.reset();
    })
  }

}

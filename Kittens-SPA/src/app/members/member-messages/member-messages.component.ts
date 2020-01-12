import {Component, Input, OnInit} from '@angular/core';
import {AlertifyService} from 'src/app/_services/alertify.service';
import {AuthService} from 'src/app/_services/auth.service';
import {UserService} from 'src/app/_services/user.service';
import {IMessage} from 'src/app/api-interfaces';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {
  @Input() public recipientId: number;
  public messages: IMessage[];

  constructor(private authService: AuthService, private userService: UserService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.loadMessages();
  }
  public loadMessages() {
    this.userService.getMessageThread(this.authService.getUserId(), this.recipientId).subscribe(
      (messages) => { this.messages = messages; },
      (errror) => { this.alertify.error(errror); }
    );
  }

}

import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AlertifyService} from 'src/app/_services/alertify.service';
import {AuthService} from 'src/app/_services/auth.service';
import {UserService} from 'src/app/_services/user.service';
import {IMessage, IPagination} from 'src/app/api-interfaces';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  public messages: IMessage[];
  public pagination: IPagination;
  public messageContainer?: 'Inbox'|'Outbox';

  constructor(private userService: UserService, private authService: AuthService,
              private route: ActivatedRoute, private alertify: AlertifyService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.messages = data.messages.result;
      this.pagination = data.messages.pagination;
    });
  }
  public loadMessages() {
    this.userService.getMessages(this.authService.getUserId(), this.pagination.currentPage,
      this.pagination.itemsPerPage, this.messageContainer).subscribe((res) => {
        if (res.result) {
          this.messages = res.result;
        }
        if (res.pagination) {
          this.pagination = res.pagination;
        }
    }, error => { this.alertify.error(error); });
  }
  public pageChanged(event: {page: number}) {
    this.pagination.currentPage = event.page;
    this.loadMessages();
  }
}

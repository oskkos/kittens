import { Component, OnInit } from '@angular/core';
import { IUser } from '../../api-interfaces';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  public users: IUser[];

  constructor(private userService: UserService, private alertify: AlertifyService, private route: ActivatedRoute) { }

  public ngOnInit() {
    this.route.data.subscribe(
      data => { this.users = data.users.result; }
    );
  }
}

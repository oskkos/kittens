import { Component, OnInit } from '@angular/core';
import { IUser } from '../../api-interfaces';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  protected users: IUser[];

  constructor(private userService: UserService, private alertify: AlertifyService) { }

  public ngOnInit() {
    this.loadUsers();
  }

  private loadUsers() {
    this.userService.getUsers().subscribe(
      (users) => { this.users = users; },
      (error) => { this.alertify.error(error); }
    );
  }
}

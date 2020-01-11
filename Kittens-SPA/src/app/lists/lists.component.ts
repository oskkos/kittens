import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AlertifyService} from 'src/app/_services/alertify.service';
import {AuthService} from 'src/app/_services/auth.service';
import {UserService} from 'src/app/_services/user.service';
import {IPagination, IUser, PaginatedResult} from 'src/app/api-interfaces';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  public users: IUser[];
  public pagination: IPagination;
  public likesParam: 'Likers' | 'Likees' = 'Likers';

  constructor(
    private authService: AuthService, private userService: UserService, private alertify: AlertifyService, private route: ActivatedRoute
  ) { }

  public ngOnInit() {
    this.route.data.subscribe(data => {
      this.users = data.users.result;
      this.pagination = data.users.pagination;
    });
  }
  public pageChanged(event: {page: number, itemsPerPage: number}) {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }
  public loadUsers() {
    this.userService.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, undefined, this.likesParam)
    .subscribe((res: PaginatedResult<IUser[]>) => {
      this.users = res.result ? res.result : [];
      if (res.pagination) {
        this.pagination = res.pagination;
      }
    }, (error) => { this.alertify.error(error); });
  }

}

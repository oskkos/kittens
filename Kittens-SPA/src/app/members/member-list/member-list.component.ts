import { Component, OnInit } from '@angular/core';
import { IUser, IPagination, PaginatedResult, IUserParams } from '../../api-interfaces';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  public users: IUser[];
  public user: IUser;
  public genderList = [{value: 'male', display: 'Males'}, {value: 'female', display: 'Females'}];
  public userParams: IUserParams = {};
  public pagination: IPagination;
  constructor(
    private userService: UserService,
    private alertify: AlertifyService,
    private route: ActivatedRoute) {
      this.user = AuthService.getUser();
    }

  public ngOnInit() {
    this.route.data.subscribe(
      data => {
        this.users = data.users.result;
        this.pagination = data.users.pagination;
      }
    );
    this.resetFilters();
  }
  public pageChanged(event: {page: number, itemsPerPage: number}) {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }
  public resetFilters() {
    this.userParams.gender = this.user.gender === 'female' ? 'male' : 'female';
    this.userParams.minAge = 0;
    this.userParams.maxAge = 99;
  }
  public loadUsers() {
    this.userService.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, this.userParams)
    .subscribe((res: PaginatedResult<IUser[]>) => {
      this.users = res.result;
      this.pagination = res.pagination;
    }, (error) => { this.alertify.error(error); });
  }
}

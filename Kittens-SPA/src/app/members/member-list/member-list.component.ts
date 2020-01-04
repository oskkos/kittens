import { Component, OnInit } from '@angular/core';
import { IUser, IPagination, PaginatedResult } from '../../api-interfaces';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryThumbnailsComponent } from 'ngx-gallery';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  public users: IUser[];
  public pagination: IPagination;
  constructor(private userService: UserService, private alertify: AlertifyService, private route: ActivatedRoute) { }

  public ngOnInit() {
    this.route.data.subscribe(
      data => {
        this.users = data.users.result;
        this.pagination = data.users.pagination;
      }
    );
  }
  public pageChanged(event: {page: number, itemsPerPage: number}) {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }
  private loadUsers() {
    this.userService.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage)
    .subscribe((res: PaginatedResult<IUser[]>) => {
      this.users = res.result;
      this.pagination = res.pagination;
    }, (error) => { this.alertify.error(error); });
  }
}

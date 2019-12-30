import { Component, OnInit } from '@angular/core';
import { IUserDetailed } from '../../api-interfaces';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  protected user: IUserDetailed;

  constructor(private userService: UserService, private alertify: AlertifyService, private route: ActivatedRoute) { }

  public ngOnInit() {
    this.route.data.subscribe(
      (data) => { this.user = data.user; }
    );
  }
}

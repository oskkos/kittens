import { Component, OnInit, Input } from '@angular/core';
import {AlertifyService} from 'src/app/_services/alertify.service';
import {AuthService} from 'src/app/_services/auth.service';
import {UserService} from 'src/app/_services/user.service';
import { IUser } from 'src/app/api-interfaces';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
  @Input() public user: IUser;

  constructor(private authService: AuthService, private userService: UserService, private alertify: AlertifyService ) { }

  public ngOnInit() {
  }
  public sendLike(recipientId: number) {
    this.userService.sendLike(AuthService.getUser().id, recipientId).subscribe(
      () => { this.alertify.success('You have liked ' + this.user.knownAs); },
      (error) => { this.alertify.error(error); }
    );
  }
}

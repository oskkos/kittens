import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { IUserDetailed } from 'src/app/api-interfaces';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm', {static: true})
  public editForm: NgForm;
  public photoUrl: string;
  public user: IUserDetailed;

  @HostListener('window:beforeunload', ['$event'])
  public unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }
  constructor(
    private route: ActivatedRoute, private alertify: AlertifyService,
    private userService: UserService, private authService: AuthService) { }

  public ngOnInit() {
    this.route.data.subscribe(
      (data) => { this.user = data.user; }
    );
    this.authService.currentPhotoUrl.subscribe(
      (url) => { this.photoUrl = url; }
    );
 }

 public updateUser() {
   this.userService.updateUser(this.authService.getUserId(), this.user).subscribe(
     () => {
      this.alertify.success('Profile updated succesfully!');
      this.editForm.reset(this.user);
     },
     (error: string) => { this.alertify.error(error); }
   );
 }
 public updateMainPhoto(url: string) {
   this.user.photoUrl = url;
 }
}

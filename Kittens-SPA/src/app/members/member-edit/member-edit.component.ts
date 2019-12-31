import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { IUserDetailed } from 'src/app/api-interfaces';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm', {static: true})
  public editForm: NgForm;

  public user: IUserDetailed;

  @HostListener('window:beforeunload', ['$event'])
  public unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }
  constructor(private route: ActivatedRoute, private alertify: AlertifyService) { }

  public ngOnInit() {
    this.route.data.subscribe(
      (data) => { this.user = data.user; }
    );
 }

 public updateUser() {
   console.log(this.user);
   this.alertify.success('Profile updated succesfully!');
   this.editForm.reset(this.user);
 }
}

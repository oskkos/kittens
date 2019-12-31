import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { IRegister } from '../api-interfaces';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();

  public model: IRegister = {};

  constructor(private authService: AuthService, private alertify: AlertifyService) { }

  public ngOnInit() {
  }

  public register() {
    this.authService.register(this.model).subscribe(
      () => { this.alertify.success('success'); },
      (error) => { this.alertify.error(error); }
    );
  }
  public cancel() {
    this.cancelRegister.emit({cancelled: true});
  }
}

import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { IRegister } from '../api-interfaces';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();

  public model: IRegister = {};
  public registerForm: FormGroup;

  constructor(private authService: AuthService, private alertify: AlertifyService) { }

  public ngOnInit() {
    this.registerForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8)])
    }, this.passwordMatchValidator);
  }

  private passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get("confirmPassword").value
      ? null
      : {mismatch: true};
  }
  public register() {
    this.authService.register(this.registerForm.value).subscribe(
      () => { this.alertify.success('success'); },
      (error) => { this.alertify.error(error); }
    );
  }
  public cancel() {
    this.cancelRegister.emit({cancelled: true});
  }
}

import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { IUser } from '../api-interfaces';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import {FormGroup, Validators, FormBuilder, AbstractControl} from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();

  public user: IUser;
  public registerForm: FormGroup;
  public bsConfig: Partial<BsDatepickerConfig>;

  constructor(
    private authService: AuthService, private alertify: AlertifyService,
    private fb: FormBuilder, private router: Router) { }

  public ngOnInit() {
    this.bsConfig = {
      containerClass: 'theme-red',
      dateInputFormat: 'DD.MM.YYYY'
    };
    this.createRegisterForm();
  }
  public getComponent(key: 'username'|'knownAs'|'dateOfBirth'|'city'|'country'|'password'|'confirmPassword') {
    return this.registerForm.get(key) as AbstractControl;
  }
  private createRegisterForm() {
    this.registerForm = this.fb.group({
      gender: ['male'],
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: [null, Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]]
    }, {
      validator: this.passwordMatchValidator
    });
  }
  private passwordMatchValidator(g: FormGroup) {
    const passwordControl = g.get('password');
    const confirmPasswordControl = g.get('confirmPassword');
    return passwordControl && confirmPasswordControl && passwordControl.value === confirmPasswordControl.value
      ? null
      : {mismatch: true};
  }
  public register() {
    if (!this.registerForm.valid) {
      this.alertify.error('Invalid form');
      return;
    }

    this.user = Object.assign({}, this.registerForm.value);
    this.authService.register(this.user).subscribe(
      () => { this.alertify.success('Registration successful!'); },
      (error) => { this.alertify.error(error); },
      () => { this.authService.login(this.user).subscribe(
        () => { this.router.navigate(['/members']); }
      ); }
    );
  }
  public cancel() {
    this.cancelRegister.emit({cancelled: true});
  }
}

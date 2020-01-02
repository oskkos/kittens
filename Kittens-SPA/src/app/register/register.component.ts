import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { IRegister } from '../api-interfaces';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();

  public model: IRegister = {};
  public registerForm: FormGroup;
  public bsConfig: Partial<BsDatepickerConfig>;

  constructor(private authService: AuthService, private alertify: AlertifyService, private fb: FormBuilder) { }

  public ngOnInit() {
    this.bsConfig = {
      containerClass: 'theme-red',
      dateInputFormat: 'DD.MM.YYYY'
    };
    this.createRegisterForm();
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
    return g.get('password').value === g.get('confirmPassword').value
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

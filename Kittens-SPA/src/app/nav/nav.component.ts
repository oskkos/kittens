import { Component, OnInit } from '@angular/core';
import { ILogin } from '../api-interfaces';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  protected model: ILogin = {};

  constructor(private authService: AuthService, private alertify: AlertifyService) { }

  public ngOnInit() {
  }

  protected login() {
    this.authService.login(this.model).subscribe(
      next => { this.alertify.success('logged in'); },
      error => { this.alertify.error(error); });
  }

  protected loggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }

  protected logout() {
    localStorage.removeItem('token');
    this.alertify.message('logged out');
  }
}

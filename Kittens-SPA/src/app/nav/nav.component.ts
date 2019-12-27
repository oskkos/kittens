import { Component, OnInit } from '@angular/core';
import { ILogin } from '../api-interfaces';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  protected model: ILogin = {};
  protected isCollapsed = true;

  constructor(private authService: AuthService, private alertify: AlertifyService, private router: Router) { }

  public ngOnInit() {
  }

  protected login() {
    this.authService.login(this.model).subscribe(
      next => { this.alertify.success('logged in'); },
      error => { this.alertify.error(error); },
      () => { this.router.navigate(['/members']); }
    );
  }

  protected loggedIn() {
    return this.authService.loggedIn();
  }

  protected getUserName() {
    return this.authService.getUserName();
  }
  protected logout() {
    localStorage.removeItem('token');
    this.alertify.message('logged out');
    this.router.navigate(['/home']);
  }
}

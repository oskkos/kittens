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

  public model: ILogin = {};
  public isCollapsed = true;
  public photoUrl?: string;

  constructor(private authService: AuthService, private alertify: AlertifyService, private router: Router) { }

  public ngOnInit() {
    this.authService.currentPhotoUrl.subscribe(
      (url) => { this.photoUrl = url; }
    );
  }

  public login() {
    this.authService.login(this.model).subscribe(
      () => { this.alertify.success('logged in'); },
      error => { this.alertify.error(error); },
      () => { this.router.navigate(['/members']); }
    );
  }

  public loggedIn() {
    return this.authService.loggedIn();
  }

  public getUserName() {
    return this.authService.getUserName();
  }
  public logout() {
    this.authService.logout();
    this.alertify.message('logged out');
    this.router.navigate(['/home']);
  }
}

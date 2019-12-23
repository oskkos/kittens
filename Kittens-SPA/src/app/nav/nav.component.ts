import { Component, OnInit } from '@angular/core';
import { ILogin } from '../api-interfaces';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  protected model: ILogin = {};

  constructor(private authService: AuthService) { }

  public ngOnInit() {
  }

  protected login() {
    this.authService.login(this.model).subscribe(
      next => { console.log('logged in'); },
      error => { console.log('Login failed'); });
  }

  protected loggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }

  protected logout() {
    localStorage.removeItem('token');
    console.log('logged out');
  }
}

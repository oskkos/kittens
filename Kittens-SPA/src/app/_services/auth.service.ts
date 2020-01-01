import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ILogin, ILoginResponse, IRegister, IUser } from '../api-interfaces';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private baseUrl = environment.apiUrl + 'auth/';
private jwtHelper = new JwtHelperService();

public static getToken(): string {
  return localStorage.getItem('token');
}
public static getUser(): IUser {
  return JSON.parse(localStorage.getItem('user'));
}

constructor(private http: HttpClient) { }

public login(model: ILogin) {
  return this.http.post(`${this.baseUrl}login`, model)
    .pipe(
      map((response: ILoginResponse) => {
        if (response) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
        }
      }
      )
    );
}
public logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}
public register(model: IRegister) {
  return this.http.post(`${this.baseUrl}register`, model);
}

public loggedIn() {
  const token = localStorage.getItem('token');
  return !this.jwtHelper.isTokenExpired(token);
}

public getUserName(): string {
  const user = AuthService.getUser();
  return user ? user.username : 'UnknownUser';
}
public getUserId(): number | null {
  const user = AuthService.getUser();
  return user ? user.id : null;
}
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ILogin, ILoginResponse, IRegister } from '../api-interfaces';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.apiUrl + 'auth/';
  private jwtHelper = new JwtHelperService();

constructor(private http: HttpClient) { }

public login(model: ILogin) {
  return this.http.post(`${this.baseUrl}login`, model)
    .pipe(
      map((response: ILoginResponse) => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
        }
      }
      )
    );
}
public register(model: IRegister) {
  return this.http.post(`${this.baseUrl}register`, model);
}

public loggedIn() {
  const token = localStorage.getItem('token');
  return !this.jwtHelper.isTokenExpired(token);
}

public getUserName() {
  const token = localStorage.getItem('token');
  if (!token) {
    return 'UnknownUser';
  }
  const decodedToken = this.jwtHelper.decodeToken(token);
  return decodedToken ? decodedToken.unique_name : 'UnknownUser';
}
}

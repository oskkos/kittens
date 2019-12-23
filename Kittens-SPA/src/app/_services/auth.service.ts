import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ILogin, ILoginResponse, IRegister } from '../api-interfaces';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:5000/api/auth/';

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
}

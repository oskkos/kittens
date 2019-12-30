import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser, IUserDetailed } from '../api-interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = environment.apiUrl;

constructor(private http: HttpClient) { }

public getUsers(): Observable<IUser[]> {
  return this.http.get<IUser[]>(this.baseUrl + 'users');
}
public getUser(id: number): Observable<IUserDetailed> {
  return this.http.get<IUserDetailed>(this.baseUrl + 'users/' + id);
}
}
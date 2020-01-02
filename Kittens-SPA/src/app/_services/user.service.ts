import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser, IUserDetailed, IUserUpdate } from '../api-interfaces';

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
public updateUser(id: number, user: IUserUpdate) {
  return this.http.put<void>(this.baseUrl + 'users/' + id, user);
}
public setMainPhoto(userId: number, id: number) {
  return this.http.post<void>(this.baseUrl + 'users/' + userId + '/photos/' + id + '/setMain', {});
}
public deletePhoto(userId: number, id: number) {
  return this.http.delete(this.baseUrl + 'users/' + userId + '/photos/' + id);
}
}

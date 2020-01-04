import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser, IUserDetailed, IUserUpdate, PaginatedResult } from '../api-interfaces';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = environment.apiUrl;

constructor(private http: HttpClient) { }

public getUsers(page: number = 1, itemsPerPage: number = 10): Observable<PaginatedResult<IUser[]>> {
  const paginatedResult: PaginatedResult<IUser[]> = new PaginatedResult<IUser[]>();
  const params = new HttpParams()
    .append('pageNumber', String(page))
    .append('pageSize', String(itemsPerPage));

  return this.http.get<IUser[]>(this.baseUrl + 'users', { observe: 'response', params})
  .pipe(
    map(response => {
      paginatedResult.result = response.body;
      if (response.headers.get('Pagination') !== null) {
        paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
      }
      return paginatedResult;
    })
  );
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

import { Injectable } from '@angular/core';
import {IUser, PaginatedResult} from '../api-interfaces';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ListsResolver implements Resolve<PaginatedResult<IUser[]> | null> {
  public pageNumber = 1;
  public pageSize = 5;
  public likesParam: 'Likers' | 'Likees' = 'Likers';

  constructor(private userService: UserService, private router: Router, private alertify: AlertifyService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<PaginatedResult<IUser[]> | null> {
    return this.userService.getUsers(this.pageNumber, this.pageSize, {}, this.likesParam).pipe(
      catchError(() => {
        this.alertify.error('Oops...');
        this.router.navigate(['']);
        return of(null);
      }));
  }
}

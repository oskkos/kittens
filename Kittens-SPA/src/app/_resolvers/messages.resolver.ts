import { Injectable } from '@angular/core';
import {AuthService} from 'src/app/_services/auth.service';
import {IMessage, PaginatedResult} from '../api-interfaces';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class MessagesResolver implements Resolve<PaginatedResult<IMessage[]> | null> {
  public pageNumber = 1;
  public pageSize = 5;
  public messageContainer?: 'Inbox' | 'Outbox';

  constructor(private userService: UserService, private authService: AuthService,
              private router: Router, private alertify: AlertifyService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<PaginatedResult<IMessage[]> | null> {
    return this.userService.getMessages(this.authService.getUserId(), this.pageNumber, this.pageSize, this.messageContainer).pipe(
      catchError(() => {
        this.alertify.error('Oops...');
        this.router.navigate(['']);
        return of(null);
      }));
  }
}

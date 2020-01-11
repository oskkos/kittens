import { Injectable } from '@angular/core';
import { IUserDetailed } from '../api-interfaces';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class MemberEditResolver implements Resolve<IUserDetailed | null> {
  constructor(
    private userService: UserService, private authService: AuthService,
    private router: Router, private alertify: AlertifyService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IUserDetailed | null> {
    return this.userService.getUser(this.authService.getUserId() as number).pipe(
      catchError(() => {
        this.alertify.error('Oops...');
        this.router.navigate(['/members']);
        return of(null);
      }));
  }
}

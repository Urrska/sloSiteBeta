import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth-service.service';
import {map, take, tap} from 'rxjs/operators';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private auth: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.auth.user
      .pipe(
        // prevent a running subscription
        take(1),
        map(user => user && user.role.admin),
        tap(isAdmin => {
          // TODO navigate to homepage after a popup or a toaster
          console.log('Acess denied - only admins allowed');
        })
      );
  }
}

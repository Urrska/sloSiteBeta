import {Injectable} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth-service.service';
import {map, take, tap} from 'rxjs/operators';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private auth: AuthService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    // debugger;
    return this.auth.user
      .pipe(
        // prevent a running subscription
        take(1),
        map(user => user && user.role.admin),
        tap(isAdmin => {
          // TODO smex the alert - make it a nice popup
          if (!isAdmin) {
            window.alert('This page is only available to content creators.');
            this.router.navigate(['/']);
          }
        })
      );
  }
}

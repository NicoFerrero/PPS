import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AutoLoginGuard implements CanLoad {
  constructor(private router: Router, private authService: AuthService) {}
  canLoad(): Observable<boolean> {
    return this.authService.isAuthenticated.pipe(
      filter((val) => val !== null),
      take(1),
      map((isAutheticated) => {
        console.log(isAutheticated);
        if (isAutheticated) {
          this.router.navigate(['listado'], { replaceUrl: true });
          return true;
        } else {
          console.log(isAutheticated);
          return true;
        }
      }),
    );
  }
}

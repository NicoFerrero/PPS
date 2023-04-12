import { Injectable } from '@angular/core';
import {
    CanLoad,
    Route,
    UrlSegment,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { map, take } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanLoad {
    constructor(private afAuth: AngularFireAuth, private router: Router) {}
    canLoad(
        route: Route,
        segments: UrlSegment[],
    ): Observable<boolean> | Promise<boolean> | boolean {
        return this.afAuth.authState.pipe(
            take(1),
            map((user) => {
                console.log(user);
                if (user == null) {
                    this.router.navigate(['home']);
                    return false;
                } else {
                    return true;
                }
            }),
        );
    }
}

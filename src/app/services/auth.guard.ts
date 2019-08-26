import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private route: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return new Promise(
        (resolve, reject) => {
          firebase.auth().onAuthStateChanged(
            (user) => {
              if (user) {
                resolve(true);
              } else {
                this.route.navigate(['/auth', 'signin']);
                resolve(false);
              }
            }
          );
        }
      );
  }
}

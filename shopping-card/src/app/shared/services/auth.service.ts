import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute, Router } from '@angular/router';
import * as auth from 'firebase/auth';

import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AppUser } from '../models/app-user';
import { UserService } from './user.service';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$!: Observable<auth.UserInfo | null>;

  constructor(
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
    this.user$ = this.afAuth.authState;
  }

  login() {
    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    localStorage.setItem('returnUrl', returnUrl);

    this.afAuth.signInWithRedirect(new auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.signOut();
    this.router.navigateByUrl('/login');
  }

  get appUser$(): Observable<AppUser> {
    // return this.user$.pipe(
    //   switchMap((user) =>
    //     user ? this.userService.get(user.uid).valueChanges() : of<AppUser>(null)
    //   )
    // );
  }
}

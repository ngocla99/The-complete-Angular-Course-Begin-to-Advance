import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppUser } from 'src/app/shared/models/app-user.model';

import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  appUser!: AppUser;
  userSubscription!: Subscription;
  constructor(public auth: AuthService) {}

  ngOnInit(): void {
    this.auth.appUser$.subscribe((appUser) => {
      this.appUser = appUser;
    });
  }

  onLogout() {
    this.auth.logout();
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}

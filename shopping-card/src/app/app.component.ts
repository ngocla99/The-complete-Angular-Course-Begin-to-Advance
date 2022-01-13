import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './shared/services/auth.service';
import { UserService } from './shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'shopping-card';

  constructor(
    private userService: UserService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.auth.user$.subscribe((user) => {
      const returnUrl = localStorage.getItem('returnUrl');
      if (user && returnUrl) {
        localStorage.removeItem('returnUrl');
        this.userService.save(user);
        this.router.navigateByUrl(returnUrl);
      }
    });
  }
}

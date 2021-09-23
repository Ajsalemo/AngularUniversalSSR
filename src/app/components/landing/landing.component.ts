import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
})
export class LandingComponent implements OnInit {
  constructor(public auth: AuthService, private router: Router) {}

  login(): void {
    try {
      this.auth.loginWithRedirect();
    } catch (err) {
      console.error(err)
    }
  }

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe(isAuthenticated => {
      if (isAuthenticated) {
        this.router.navigate(['/tasks'])
      }
    })
  }
}

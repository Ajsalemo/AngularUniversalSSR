import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
})
export class LandingComponent implements OnInit {
  constructor(public auth: AuthService) {}

  login(): void {
    this.auth.loginWithRedirect({
      redirect_uri: 'http://localhost:4200/tasks',
    });
  }

  ngOnInit(): void {
    
  }
}

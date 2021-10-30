import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
})
export class AvatarComponent implements OnInit {
  constructor(public auth: AuthService) {}

  logout(): void {
    this.auth.logout({ returnTo: window.location.origin });
  }

  ngOnInit(): void {}
}

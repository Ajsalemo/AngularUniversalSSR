import { Component, HostListener, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { themeApiArray } from '@api/themeApi';
import { MobileBottomMainNavComponent } from '@components/mobile-bottom-main-nav/mobile-bottom-main-nav.component';
import { MobileBottomSuggestionsComponent } from '@components/mobile-bottom-suggestions/mobile-bottom-suggestions.component';
import { AuthService } from '@auth0/auth0-angular';
import { UserServicesService } from '@services/userServices/user-services.service';

@Component({
  selector: 'app-content-entrypoint',
  templateUrl: './content-entrypoint.component.html',
})
export class ContentEntrypointComponent implements OnInit {
  // Boolean to open/close the right-hand sidenav
  isRightSideNavOpen: boolean = true;
  // Boolean to open/close the left-hand sidenav
  isLeftHandSideNavOpen: boolean = true;
  // Boolean to hide the left-hand sidenav toggle button
  hideLeftHandSideNavToggle: boolean = true;
  backgroundTheme = themeApiArray;
  // Set the screen width to a variable
  innerWidth!: number;
  userSelectedTheme: string = '';
  constructor(
    private _bottomMainNavSheet: MatBottomSheet,
    public auth: AuthService,
    private userService: UserServicesService
  ) {}

  setBackgroundTheme(theme: string): any {
    // Sets the user selected background theme
    this.userSelectedTheme = theme;
  }

  // Opens the left-sidenav bottom sheet component (mobile viewing)
  openBottomMainNavSheet(): void {
    this._bottomMainNavSheet.open(MobileBottomMainNavComponent);
  }

  // Opens the right-sidenav bottom sheet component (mobile viewing)
  openBottomSuggestionsSheet(): void {
    this._bottomMainNavSheet.open(MobileBottomSuggestionsComponent);
  }

  /* 
    This function programatically checks the current screen width size
    On general desktop width the sidenav bars will stay open by default
    On tablet/mobile the sidenav bars will be closed by default
  */
  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.innerWidth = window.innerWidth;

    if (this.innerWidth < 768) {
      this.isLeftHandSideNavOpen = false;
      this.isRightSideNavOpen = false;
      this.hideLeftHandSideNavToggle = false;
    } else {
      this.isLeftHandSideNavOpen = true;
      this.isRightSideNavOpen = true;
      this.hideLeftHandSideNavToggle = true;
    }
  }

  checkIfAuth0UserExists(): void {
    try {
      this.auth.isLoading$.subscribe((isLoading) => {
        if (!isLoading) {
          this.auth.user$.subscribe(async (user) => {
            console.log(user);
            if (user && user.email) {
              await this.userService.checkUserUponLogin(user.email)
            } else {
              console.error('No user object exists.')
            }
          });
        } else {
          console.log('loading..');
        }
      });
    } catch (err) {
      console.log(err)
    }
  }

  ngOnInit(): void {
    this.checkIfAuth0UserExists();
  }
}

import { Component, HostListener, OnInit } from '@angular/core';
import { themeApiArray } from '@api/themeApi';

@Component({
  selector: 'app-content-entrypoint',
  templateUrl: './content-entrypoint.component.html',
})
export class ContentEntrypointComponent implements OnInit {
  // Boolean to open/close the right-hand sidenav
  isRightSideNavOpen: boolean = true;
  // Boolean to open/close the left-hand sidenav
  isLeftHandSideNavOpen: boolean = true;
  backgroundTheme = themeApiArray;
  // Set the screen width to a variable
  innerWidth!: number;
  userSelectedTheme: string = '';
  constructor() {}

  setBackgroundTheme(theme: string): any {
    // Sets the user selected background theme
    this.userSelectedTheme = theme;
  }

  /* 
    This function programatically checks the current screen width size
    On general desktop width the sidenav bars will stay open by default
    On tablet/mobile the sidenav bars will be closed by default
  */
  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.innerWidth = window.innerWidth;

    if (this.innerWidth < 1465) {
      this.isLeftHandSideNavOpen = false;
      this.isRightSideNavOpen = false;
    } else {
      this.isLeftHandSideNavOpen = true;
      this.isRightSideNavOpen = true;
    }
  }

  ngOnInit(): void {}
}

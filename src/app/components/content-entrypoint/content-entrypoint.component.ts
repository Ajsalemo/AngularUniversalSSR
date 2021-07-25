import { Component, OnInit } from '@angular/core';
import { themeApiArray } from '@api/themeApi';

@Component({
  selector: 'app-content-entrypoint',
  templateUrl: './content-entrypoint.component.html',
})
export class ContentEntrypointComponent implements OnInit {
  // Boolean to open/close the right-hand sidenav
  isOpen: boolean = true;
  backgroundTheme = themeApiArray;
  userSelectedTheme: string = '';
  constructor() {}

  setBackgroundTheme(theme: string): any {
    // Sets the user selected background theme
    this.userSelectedTheme = theme;
  }

  ngOnInit(): void {}
}

import { Component, OnInit } from '@angular/core';
import { themeApiArray } from '@api/themeApi';

@Component({
  selector: 'app-content-entrypoint',
  templateUrl: './content-entrypoint.component.html',
})
export class ContentEntrypointComponent implements OnInit {
  // Boolean to open/close the right-hand sidenav
  isOpen: boolean = true;
  backgroundTheme = themeApiArray
  constructor() {}

  setBackgroundTheme(theme: string): any {
    console.log(theme)
  }

  ngOnInit(): void {}
}

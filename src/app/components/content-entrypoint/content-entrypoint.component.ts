import { Component, HostListener, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { themeApiArray } from '@api/themeApi';
import { MobileBottomSuggestionsComponent } from '@components/mobile-bottom-suggestions/mobile-bottom-suggestions.component';

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
  // Boolean to filter only important tasks
  isImportantFilter: boolean = false;
  // Boolean to filter only completed tasks
  isCompletedFilter: boolean = false;
  // Boolean to filter general tasks
  isTasksFilter: boolean = false;
  constructor(private _bottomMainNavSheet: MatBottomSheet) {}

  setBackgroundTheme(theme: string): any {
    // Sets the user selected background theme
    this.userSelectedTheme = theme;
  }

  // Opens the right-sidenav bottom sheet component (mobile viewing)
  // We pass the data into the component to act as 2-way binding of sorts
  openBottomSuggestionsSheet(): void {
    this._bottomMainNavSheet.open(MobileBottomSuggestionsComponent, {
      data: {
        isCompletedFilter: this.isCompletedFilter,
        isImportantFilter: this.isImportantFilter,
        isTasksFilter: this.isTasksFilter
      },
    });
  }

  /* 
    This function programatically checks the current screen width size
    On general desktop width the sidenav bars will stay open by default
    On tablet/mobile the sidenav bars will be closed by default
  */
  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.innerWidth = window.innerWidth;

    if (this.innerWidth < 1176) {
      this.isLeftHandSideNavOpen = false;
      this.isRightSideNavOpen = false;
      this.hideLeftHandSideNavToggle = false;
    } else {
      this.isLeftHandSideNavOpen = true;
      this.isRightSideNavOpen = true;
      this.hideLeftHandSideNavToggle = true;
    }
  }

  ngOnInit(): void {
    this.onResize();
  }
}

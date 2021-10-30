import { Component, Inject, OnInit } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-mobile-bottom-suggestions',
  templateUrl: './mobile-bottom-suggestions.component.html',
})
export class MobileBottomSuggestionsComponent implements OnInit {
  isImportantFilter = this.data.isImportantFilter;
  isCompletedFilter = this.data.isCompletedFilter;
  isTasksFilter = this.data.isTasksFilter;

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {}

  ngOnInit(): void {}
}

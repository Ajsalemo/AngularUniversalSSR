import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-left-sidenav-options',
  templateUrl: './left-sidenav-options.component.html',
})
export class LeftSidenavOptionsComponent implements OnInit {
  @Input()
  isImportantFilter!: boolean;
  @Input()
  isCompletedFilter!: boolean;
  @Input()
  isTasksFilter!: boolean;
  // To avoid dumb future mistakes, make sure to add a 'Change' suffix to event emitters for 2-way data binding
  // https://stackoverflow.com/questions/57547337/unsure-how-to-apply-two-way-binding-on-angular-for-a-custom-component
  @Output()
  isImportantFilterChange = new EventEmitter();
  @Output()
  isCompletedFilterChange = new EventEmitter();
  @Output()
  isTasksFilterChange = new EventEmitter();

  setIsImportantFilterChange(): void {
    if (this.isImportantFilter === true) {
      this.isImportantFilter = false;
      this.isImportantFilterChange.emit(this.isImportantFilter);
      this.isCompletedFilter = false;
      this.isCompletedFilterChange.emit(this.isCompletedFilter);
    } else {
      this.isImportantFilter = true;
      this.isImportantFilterChange.emit(this.isImportantFilter);
      this.isCompletedFilter = false;
      this.isCompletedFilterChange.emit(this.isCompletedFilter);
    }
  }

  setIsCompletedFilterChange(): void {
    if (this.isCompletedFilter === true) {
      this.isCompletedFilter = false;
      this.isCompletedFilterChange.emit(this.isCompletedFilter);
      this.isImportantFilter = false;
      this.isImportantFilterChange.emit(this.isImportantFilter);
    } else {
      this.isCompletedFilter = true;
      this.isCompletedFilterChange.emit(this.isCompletedFilter);
      this.isImportantFilter = false;
      this.isImportantFilterChange.emit(this.isImportantFilter);
    }
  }

  constructor() {}

  sidenavOptionLinks: any[] = [
    {
      text: 'My Day',
      icon: 'flare',
      ariaLabelText: 'My Day icon',
      action: () =>
        this.isTasksFilterChange.emit(
          (this.isTasksFilter = !this.isTasksFilter)
        ),
    },
    {
      text: 'Important',
      icon: 'star_border',
      ariaLabelText: 'Important Tasks icon',
      action: () => this.setIsImportantFilterChange(),
    },
    {
      text: 'Completed',
      icon: 'check_circle',
      ariaLabelText: 'Completed Tasks icon',
      action: () => this.setIsCompletedFilterChange(),
    },
    {
      text: 'Assigned To You',
      icon: 'person_outline',
      ariaLabelText: 'Assigned Tasks icon',
      action: () =>
        this.isCompletedFilterChange.emit(
          (this.isCompletedFilter = !this.isCompletedFilter)
        ),
    },
    {
      text: 'Tasks',
      icon: 'home',
      ariaLabelText: 'Normal Tasks icon',
      action: () =>
        this.isTasksFilterChange.emit(
          (this.isTasksFilter = !this.isTasksFilter)
        ),
    },
  ];

  ngOnInit(): void {}
}

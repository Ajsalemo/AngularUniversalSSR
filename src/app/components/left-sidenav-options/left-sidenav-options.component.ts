import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-left-sidenav-options',
  templateUrl: './left-sidenav-options.component.html',
})
export class LeftSidenavOptionsComponent implements OnInit {
  @Input()
  isImportantFilter!: boolean;
  @Input()
  setIsPlannedFilter!: () => void | false;
  @Input()
  setIsTasksFilter!: () => void | false;
  // To avoid dumb future mistakes, make sure to add a 'Change' suffix to event emitters for 2-way data binding
  // https://stackoverflow.com/questions/57547337/unsure-how-to-apply-two-way-binding-on-angular-for-a-custom-component
  @Output() 
  isImportantFilterChange = new EventEmitter();

  constructor() {}

  sidenavOptionLinks: any[] = [
    {
      text: 'My Day',
      icon: 'flare',
      ariaLabelText: 'My Day icon',
      action: () => this.setIsTasksFilter(),
    },
    {
      text: 'Important',
      icon: 'star_border',
      ariaLabelText: 'Important Tasks icon',
      action: () => this.isImportantFilterChange.emit(this.isImportantFilter = !this.isImportantFilter),
    },
    {
      text: 'Planned',
      icon: 'event',
      ariaLabelText: 'Planned Tasks icon',
      action: () => this.setIsPlannedFilter(),
    },
    {
      text: 'Assigned To You',
      icon: 'person_outline',
      ariaLabelText: 'Assigned Tasks icon',
      action: () => this.setIsPlannedFilter(),
    },
    {
      text: 'Tasks',
      icon: 'home',
      ariaLabelText: 'Normal Tasks icon',
      action: () => this.setIsTasksFilter(),
    },
  ];

  ngOnInit(): void {}
}

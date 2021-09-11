import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-left-sidenav-options',
  templateUrl: './left-sidenav-options.component.html',
})
export class LeftSidenavOptionsComponent implements OnInit {
  constructor() {}
  @Input()
  setIsImportantFilter!: () => void | false;
  @Input()
  setIsPlannedFilter!: () => void | false;
  @Input()
  setIsTasksFilter!: () => void | false;

  sidenavOptionLinks: any[] = [
    {
      text: 'My Day',
      link: 'TBD',
      icon: 'flare',
      ariaLabelText: 'My Day icon',
      action: () => this.setIsTasksFilter()
    },
    {
      text: 'Important',
      link: 'TBD',
      icon: 'star_border',
      ariaLabelText: 'Important Tasks icon',
      action: () => this.setIsImportantFilter()
    },
    {
      text: 'Planned',
      link: 'TBD',
      icon: 'event',
      ariaLabelText: 'Planned Tasks icon',
      action: () => this.setIsPlannedFilter()
    },
    {
      text: 'Assigned To You',
      link: 'TBD',
      icon: 'person_outline',
      ariaLabelText: 'Assigned Tasks icon',
      action: () => this.setIsImportantFilter()
    },
    {
      text: 'Tasks',
      link: 'TBD',
      icon: 'home',
      ariaLabelText: 'Normal Tasks icon',
      action: () => this.setIsTasksFilter()
    },
  ];

  ngOnInit(): void {}
}

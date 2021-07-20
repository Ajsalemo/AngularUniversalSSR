import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav-options',
  templateUrl: './sidenav-options.component.html',
})
export class SidenavOptionsComponent implements OnInit {
  constructor() {}

  sidenavOptionLinks: any[] = [
    {
      text: 'My Day',
      link: 'TBD',
      icon: 'flare',
      ariaLabelText: 'My Day icon',
    },
    {
      text: 'Important',
      link: 'TBD',
      icon: 'star_border',
      ariaLabelText: 'Important Tasks icon',
    },
    {
      text: 'Planned',
      link: 'TBD',
      icon: 'event',
      ariaLabelText: 'Planned Tasks icon',
    },
    {
      text: 'Assigned To You',
      link: 'TBD',
      icon: 'person_outline',
      ariaLabelText: 'Assigned Tasks icon',
    },
    {
      text: 'Tasks',
      link: 'TBD',
      icon: 'home',
      ariaLabelText: 'Normal Tasks icon',
    },
  ];

  ngOnInit(): void {}
}

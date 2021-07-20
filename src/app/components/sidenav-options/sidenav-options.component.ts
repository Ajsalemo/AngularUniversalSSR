import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav-options',
  templateUrl: './sidenav-options.component.html',
})
export class SidenavOptionsComponent implements OnInit {
  constructor() {}

  sidenavOptionLinks: any[] = [
    { text: 'My Day', link: 'TBD' },
    { text: 'Important', link: 'TBD' },
    { text: 'Planned', link: 'TBD' },
    { text: 'Assigned To You', link: 'TBD' },
    { text: 'Tasks', link: 'TBD' }
  ];

  ngOnInit(): void {}
}

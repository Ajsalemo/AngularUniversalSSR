import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content-entrypoint',
  templateUrl: './content-entrypoint.component.html',
})
export class ContentEntrypointComponent implements OnInit {
  // Boolean to open/close the right-hand sidenav
  isOpen: boolean = true;
  constructor() {}

  ngOnInit(): void {}
}

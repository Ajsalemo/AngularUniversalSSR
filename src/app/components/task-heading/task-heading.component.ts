import { Component, OnInit } from '@angular/core';
import { format } from 'date-fns';

@Component({
  selector: 'app-task-heading',
  templateUrl: './task-heading.component.html',
})
export class TaskHeadingComponent implements OnInit {
  dayAndTime = format(new Date(), "eeee, MMMM d");
  constructor() {}

  ngOnInit(): void {}
}

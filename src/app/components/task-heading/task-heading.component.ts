import { Component, Input, OnInit } from '@angular/core';
import { format } from 'date-fns';

@Component({
  selector: 'app-task-heading',
  templateUrl: './task-heading.component.html',
})
export class TaskHeadingComponent implements OnInit {
  @Input() userSelectedTheme: any;
  // Format the date to 'Day of week, Month Date'
  dayAndTime = format(new Date(), 'eeee, MMMM d');
  constructor() {}
  /* 
    Switch statement to check the current background theme and address the text to change it from white to black
    This is to help with contrast
  */ 
  checkCurrentBackgroundColor(): string {
    switch (this.userSelectedTheme) {
      case 'bg-yellow-100':
      case 'bg-yellow-400':
      case 'bg-green-200':
      case 'bg-green-400':
      case 'bg-blue-100':
      case 'bg-purple-300':
        return 'text-black';
      default:
        return 'text-white';
    }
  }

  ngOnInit(): void {}
}

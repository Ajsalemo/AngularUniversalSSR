import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-task-form',
  templateUrl: './main-task-form.component.html',
})
export class MainTaskFormComponent implements OnInit {
  task: string = '';
  constructor() {}

  submitMainTaskForm(data: any) {
    console.log(data.value.task);
  }

  ngOnInit(): void {}
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-main-task-form',
  templateUrl: './main-task-form.component.html',
})
export class MainTaskFormComponent implements OnInit {
  task: string = '';
  constructor() {}

  mainTaskForm = new FormGroup({
    task: new FormControl('', [
      Validators.required,
      Validators.minLength(1)
    ]),
  });

  submitMainTaskForm(data: any) {
    console.log(data.value.task);
  }

  ngOnInit(): void {}
}

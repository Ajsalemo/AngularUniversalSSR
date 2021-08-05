import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormServicesService } from '@services/formServices/form-services.service';

@Component({
  selector: 'app-main-task-form',
  templateUrl: './main-task-form.component.html',
})
export class MainTaskFormComponent implements OnInit {
  mainTasksToDisplay: any;
  constructor(private formServicesService: FormServicesService) {}

  mainTaskForm = new FormGroup({
    task: new FormControl('', [Validators.required, Validators.minLength(2)]),
  });

  // Field getter
  get getTaskControl() {
    return this.mainTaskForm.controls;
  }

  // Function to submit tasks on the main form/input
  submitMainTaskForm(data: any) {
    this.formServicesService
      .mainTaskFormSubmitTodo(data.value)
      .then((res: any) => {
        this.formServicesService.mainTaskFormGetAllTodos().then((res: any) => {
          console.log(res);
          this.mainTasksToDisplay = res;
        });
      });
  }

  ngOnInit(): void {}
}

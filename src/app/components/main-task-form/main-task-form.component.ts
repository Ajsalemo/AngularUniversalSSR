import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormServicesService } from '@services/formServices/form-services.service';

@Component({
  selector: 'app-main-task-form',
  templateUrl: './main-task-form.component.html',
})
export class MainTaskFormComponent implements OnInit {
  mainTasksToDisplay: any;
  testBrowser!: boolean;
  constructor(
    private formServicesService: FormServicesService,
    @Inject(PLATFORM_ID) platformId: string
  ) {
    this.testBrowser = isPlatformBrowser(platformId);
  }

  mainTaskForm = new FormGroup({
    task: new FormControl('', [Validators.required, Validators.minLength(2)]),
  });

  // Field getter
  get getTaskControl() {
    return this.mainTaskForm.controls;
  }

  async retrieveAllTasks(): Promise<void> {
    try {
      const tasks = await this.formServicesService.mainTaskFormGetAllTodos();
      this.mainTasksToDisplay = tasks;
    } catch (error) {
      console.log(error);
    }
  }

  // Function to submit tasks on the main form/input
  async submitMainTaskForm(data: any): Promise<void> {
    try {
      // Automatically return if the form isn't valid
      if (!this.mainTaskForm.valid) return;

      const submitForm = await this.formServicesService.mainTaskFormSubmitTodo(
        data.value
      );
      console.log(submitForm);
      this.mainTaskForm.reset();
      if (submitForm && submitForm.task) {
        await this.retrieveAllTasks();
      }
    } catch (error) {
      console.log(error);
    }
  }

  ngOnInit(): void {
    // This prevents an 'NetworkError' when trying to run these functions onInit
    if (this.testBrowser) {
      this.retrieveAllTasks();
    }
  }
}

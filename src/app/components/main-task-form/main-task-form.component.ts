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
  isLoading: boolean = false;
  isCompletedTask!: boolean;
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
    this.isLoading = true;
    try {
      const tasks = await this.formServicesService.mainTaskFormGetAllTodos();
      this.mainTasksToDisplay = tasks;
      this.isLoading = false;
      console.log(tasks)
    } catch (error) {
      console.error(error);
    }
  }

  // Function to submit tasks on the main form/input
  async submitMainTaskForm(data: any): Promise<void> {
    try {
      // Automatically return if the form isn't valid
      if (!this.mainTaskForm.valid) return;
      this.isLoading = true;
      const submitForm = await this.formServicesService.mainTaskFormSubmitTodo(
        data.value
      );
      this.mainTaskForm.reset();
      // If the submit occurred successfully then retrieve tasks
      if (submitForm && submitForm.task) {
        await this.retrieveAllTasks();
        this.isLoading = false;
      }
    } catch (error) {
      console.error(error);
    }
  }

  // Delete tasks
  async deleteTask(id: number): Promise<void> {
    try {
      this.isLoading = true;
      const { message } = await this.formServicesService.mainTaskFormDeleteTodo(
        id
      );
      console.log(message);
      if (message) {
        this.isLoading = false;
        await this.retrieveAllTasks();
      }
    } catch (error) {
      console.error(error);
    }
  }

  // Update tasks to a completed status
  async completeTask(id: number, completed: boolean): Promise<void> {
    if (completed === true) {
      await this.formServicesService.mainTaskFormCompleteTodo(id, false);
      return await this.retrieveAllTasks();
    } else {
      await this.formServicesService.mainTaskFormCompleteTodo(id, true);
      return await this.retrieveAllTasks();
    }
  }

  async makeTaskImportant(id: number, important: boolean): Promise<void> {
    if (important === true) {
      await this.formServicesService.mainTaskFormSetImportantTodo(id, false);
      return await this.retrieveAllTasks();
    } else {
      await this.formServicesService.mainTaskFormSetImportantTodo(id, true);
      return await this.retrieveAllTasks();
    }
  }

  ngOnInit(): void {
    // This prevents an 'NetworkError' when trying to run these functions onInit
    if (this.testBrowser) {
      this.retrieveAllTasks();
    }
  }
}

import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormServicesService } from '@services/formServices/form-services.service';
import { differenceInCalendarDays, format, parseISO } from 'date-fns';
import { AuthService } from '@auth0/auth0-angular';
import { UserServicesService } from '@services/userServices/user-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-task-form',
  templateUrl: './main-task-form.component.html',
})
export class MainTaskFormComponent implements OnInit {
  @Input()
  isImportantFilter!: boolean;
  @Input()
  isCompletedFilter!: boolean;
  @Input()
  isTasksFilter!: boolean;

  mainTasksToDisplay: any;
  testBrowser!: boolean;
  isLoading: boolean = false;
  isError: boolean = false;
  isCompletedTask!: boolean;
  catchError!: string;
  userEmail!: string;
  
  constructor(
    private formServicesService: FormServicesService,
    @Inject(PLATFORM_ID) platformId: string,
    public auth: AuthService,
    private userService: UserServicesService,
    private router: Router
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

  // This checks the calendar day difference in between now and the selected target date for the task
  setFormatTaskDueDateBoolean(date: any) {
    const todayDueDateBoolean = new Date();
    const todayDateDiffBool = differenceInCalendarDays(
      parseISO(date),
      todayDueDateBoolean
    );
    if (todayDateDiffBool === 0) {
      return true;
    } else if (todayDateDiffBool === 1) {
      return false;
    } else if (todayDateDiffBool > 1 || todayDateDiffBool < 0) {
      return false;
    } else {
      return true;
    }
  }

  // Logic to check the current date
  formatTaskDueDate(date: any) {
    if (!date) return;
    const todayDueDate = new Date();
    const todayDateDiff = differenceInCalendarDays(
      parseISO(date),
      todayDueDate
    );
    if (todayDateDiff === 0) {
      return 'Due today';
    } else if (todayDateDiff === 1) {
      return 'Due tomorrow';
    } else if (todayDateDiff < 0) {
      return `Overdue on ${format(parseISO(date), 'M/d/y')}`;
    } else {
      return `Due on ${format(parseISO(date), 'M/d/y')}`;
    }
  }

  // Retrieve all stored tasks from the current logged in user
  async retrieveAllTasks(): Promise<void> {
    this.isLoading = true;
    this.isError = false;
    console.log(this.isImportantFilter)
    try {
      if (this.userEmail && this.userEmail !== '') {
        const tasks = await this.formServicesService.mainTaskFormGetAllTodos(
          this.userEmail
        );
        this.mainTasksToDisplay = tasks;
        this.isLoading = false;
        this.isError = false;
      } else {
        this.isLoading = false;
        this.isError = true;
        return;
      }
    } catch (e) {
      console.error(e);
      this.catchError = 'An error has occurred. Please try again.';
      this.isLoading = false;
      this.isError = true;
    }
  }

  // Function to submit tasks on the main form/input
  async submitMainTaskForm(data: any): Promise<void> {
    try {
      // Automatically return if the form isn't valid
      if (!this.mainTaskForm.valid) return;
      this.isLoading = true;
      this.isError = false;
      const submitForm = await this.formServicesService.mainTaskFormSubmitTodo(
        data.value,
        this.userEmail
      );
      this.mainTaskForm.reset();
      // If the submit occurred successfully then retrieve tasks
      if (submitForm && submitForm.task) {
        await this.retrieveAllTasks();
        this.isError = false;
        this.isLoading = false;
      }
    } catch (e) {
      console.error(e);
      this.catchError = 'An error has occurred. Please try again.';
      this.isLoading = false;
      this.isError = true;
    }
  }

  // Delete tasks
  async deleteTask(id: number): Promise<void> {
    try {
      this.isLoading = true;
      this.isError = false;
      const { message } = await this.formServicesService.mainTaskFormDeleteTodo(
        id,
        this.userEmail
      );
      if (message) {
        this.isLoading = false;
        this.isError = false;
        await this.retrieveAllTasks();
      }
    } catch (e) {
      console.error(e);
      this.catchError = 'An error has occurred. Please try again.';
      this.isLoading = false;
      this.isError = true;
    }
  }

  // Update tasks to a completed or incomplete status
  async completeTask(id: number, completed: boolean): Promise<void> {
    try {
      this.isLoading = true;
      this.isError = false;
      if (completed === true) {
        await this.formServicesService.mainTaskFormCompleteTodo(
          id,
          false,
          this.userEmail
        );
        return await this.retrieveAllTasks();
      } else {
        await this.formServicesService.mainTaskFormCompleteTodo(
          id,
          true,
          this.userEmail
        );
        return await this.retrieveAllTasks();
      }
    } catch (e) {
      console.error(e);
      this.catchError = 'An error has occurred. Please try again.';
      this.isLoading = false;
      this.isError = true;
    }
  }

  // Update tasks to be important or unimportant
  async makeTaskImportant(id: number, important: boolean): Promise<void> {
    try {
      this.isLoading = true;
      this.isError = false;
      if (important === true) {
        await this.formServicesService.mainTaskFormSetImportantTodo(
          id,
          false,
          this.userEmail
        );
        this.isLoading = true;
        return await this.retrieveAllTasks();
      } else {
        await this.formServicesService.mainTaskFormSetImportantTodo(
          id,
          true,
          this.userEmail
        );
        this.isLoading = true;
        return await this.retrieveAllTasks();
      }
    } catch (e) {
      console.error(e);
      this.catchError = 'An error has occurred. Please try again.';
      this.isLoading = false;
      this.isError = true;
    }
  }

  // Set a tasks due date
  async setTaskDueDateToToday(id: number): Promise<void> {
    const date = new Date();
    await this.formServicesService.mainTaskFormSetDueDateToday(
      id,
      date,
      this.userEmail
    );
    return await this.retrieveAllTasks();
  }

  // Set a tasks due date to one day ahead (tomorrow)
  async setTaskDueDateToTomorrow(id: number): Promise<void> {
    try {
      const tomorrow = new Date();
      const tomorrowDate = tomorrow.setDate(tomorrow.getDate() + 1);
      await this.formServicesService.mainTaskFormSetDueDateToday(
        id,
        tomorrowDate,
        this.userEmail
      );
      return await this.retrieveAllTasks();
    } catch (e) {
      console.error(e);
      this.catchError = 'An error has occurred. Please try again.';
      this.isLoading = false;
      this.isError = true;
    }
  }

  // Remove a task's due date
  async removeTaskDueDate(id: number): Promise<void> {
    try {
      await this.formServicesService.mainTaskFormSetDueDateToday(
        id,
        null,
        this.userEmail
      );
      return await this.retrieveAllTasks();
    } catch (e) {
      console.error(e);
      this.catchError = 'An error has occurred. Please try again.';
      this.isLoading = false;
      this.isError = true;
    }
  }

  // Check if the user logging in from Auth0 exists or not
  checkIfAuth0UserExists(): void {
    try {
      this.isError = false;
      this.auth.isLoading$.subscribe((isLoading) => {
        if (!isLoading) {
          this.auth.user$.subscribe(async (user) => {
            if (user && user.email) {
              this.userEmail = user.email;
              await this.userService.checkUserUponLogin(user.email);
              await this.retrieveAllTasks();
            } else {
              this.isLoading = false;
              console.error('No user object exists.');
              this.router.navigate(['']);
            }
          });
        } else {
          this.isLoading = true;
          this.isError = false;
        }
      });
    } catch (e) {
      console.error(e);
      this.catchError = 'An error has occurred. Please try again.';
      this.isLoading = false;
      this.isError = true;
    }
  }

  ngOnInit(): void {
    // This prevents an 'NetworkError' when trying to run these functions onInit
    if (this.testBrowser) {
      this.checkIfAuth0UserExists();
    }
  }
}

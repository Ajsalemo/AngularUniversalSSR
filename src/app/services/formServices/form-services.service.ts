import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FormServicesService {
  constructor(private http: HttpClient) {}

  mainTaskFormSubmitTodo(data: any): any {
    return this.http
      .post('/api/submit_task', data)
      .toPromise();
  }

  mainTaskFormGetAllTodos(): any {
    return this.http
      .get('/api/get_all_tasks')
      .toPromise()
  }
}

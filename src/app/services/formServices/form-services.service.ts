import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FormServicesService {
  constructor(private http: HttpClient) {}

  async mainTaskFormSubmitTodo(data: any): Promise<any> {
    return await this.http.post('/api/submit_task', data).toPromise();
  }

  async mainTaskFormGetAllTodos(): Promise<any> {
    return await this.http.get('/api/get_all_tasks').toPromise();
  }

  async mainTaskFormDeleteTodo(id: number): Promise<any> {
    return await this.http.delete(`/api/delete_task/${id}`).toPromise();
  }

  async mainTaskFormCompleteTodo(
    id: number,
    isCompleted: boolean
  ): Promise<Object> {
    return await this.http
      .put(
        `/api/complete_task/${id}`,
        { isCompleted },
        { responseType: 'text' }
      )
      .toPromise();
  }
}

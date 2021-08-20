import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FormServicesService {
  constructor(private http: HttpClient) {}

  async mainTaskFormSubmitTodo(data: any): Promise<any> {
    return await this.http.post('/api/task/submit', data).toPromise();
  }

  async mainTaskFormGetAllTodos(): Promise<any> {
    return await this.http.get('/api/task/get').toPromise();
  }

  async mainTaskFormDeleteTodo(id: number): Promise<any> {
    return await this.http.delete(`/api/task/delete/${id}`).toPromise();
  }

  async mainTaskFormCompleteTodo(
    id: number,
    isCompleted: boolean
  ): Promise<Object> {
    return await this.http
      .put(
        `/api/task/complete/${id}`,
        { isCompleted },
        { responseType: 'text' }
      )
      .toPromise();
  }

  async mainTaskFormSetImportantTodo(
    id: number,
    isImportant: boolean
  ): Promise<Object> {
    return await this.http
      .put(
        `/api/task/important/${id}`,
        { isImportant },
        { responseType: 'text' }
      )
      .toPromise();
  }

}

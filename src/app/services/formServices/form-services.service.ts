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
    console.log(id)
    return await this.http.delete(`/api/delete_task/${id}`).toPromise();
  }
}

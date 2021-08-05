import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FormServicesService {
  constructor(public http: HttpClient) {}

  mainTaskFormSubmitTodo(data: any) {
    this.http
      .post('/api/submit_task', { data: data })
      .toPromise()
      .then((res) => console.log(res));
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FormServicesService {
  constructor(public http: HttpClient) {}

  mainTaskFormSubmitTodo(data: any) {
    console.log(data);
    this.http.post('/api/test', data).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
  }
}

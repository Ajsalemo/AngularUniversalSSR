import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserServicesService {
  constructor(private http: HttpClient) {}

  async checkUserUponLogin(email: string): Promise<any> {
    return await this.http
      .get(`/api/user/get/${email}`, { responseType: 'text' })
      .toPromise();
  }
}

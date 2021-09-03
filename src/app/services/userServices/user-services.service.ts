import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserServicesService {
  constructor(private http: HttpClient) {}

  async checkUserUponLogin(email: string): Promise<any> {
    console.log('checkUserUponLogin function executed');
    return await this.http
      .get(`/api/user/get/${email}`, { responseType: 'text' })
      .toPromise();
  }
}

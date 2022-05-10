import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserSvService {

  url = environment.apiUrl;
  constructor(private http: HttpClient) { }


  getUser(): Observable<any> {
    return this.http.get(this.url + "/admin/getUsers");
  }
  createUser(data): Observable<any> {
    return this.http.post(this.url + '/admin/AddUser', data);
  }

  deleteUserById(id): Observable<any> {
    return this.http.delete(this.url + "/admin/DeleteUserById/" + id);
  }
}

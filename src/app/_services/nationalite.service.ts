import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NationaliteService {
  
  url = environment.apiUrl;
  constructor(private http: HttpClient) { }


  getNlt(): Observable<any> {
    return this.http.get(this.url + "/admin/getNationalities");
  }
  createNlt(data): Observable<any> {
    return this.http.post(this.url + '/admin/AddNationalities', data);
  }

  deleteNltById(id): Observable<any> {
    return this.http.delete(this.url + "/admin/DeleteNationalityById/" + id);
  }
  updateNltById(id,data): Observable<any> {
    return this.http.put(this.url + "/admin/UpdateCatgById/"+ id,data);
  }
}

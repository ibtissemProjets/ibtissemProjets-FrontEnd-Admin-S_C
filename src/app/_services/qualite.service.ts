import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QualiteService {

  url = environment.apiUrl;
  constructor(private http: HttpClient) { }


  getQlt(): Observable<any> {
    return this.http.get(this.url + "/admin/getQualities");
  }
  createQlt(data): Observable<any> {
    return this.http.post(this.url + '/admin/AddQualities', data);
  }

  deleteQltById(id): Observable<any> {
    return this.http.delete(this.url + "/admin/DeleteQualityById/" + id);
  }

  updateQltById(id,data): Observable<any> {
    return this.http.put(this.url + "/admin/UpdateQltById/"+ id,data);
  }
}

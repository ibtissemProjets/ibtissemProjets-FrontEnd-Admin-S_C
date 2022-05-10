import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class FilmsService {
  url = environment.apiUrl;
  constructor(private http: HttpClient) { }


  getFilm(): Observable<any> {
    return this.http.get(this.url+"/admin/getFilms");
  }

  createfilm(data): Observable<any> {   
    return this.http.post(this.url+'/admin/AddFilm', data );
  }

  getFilmbyid(id): Observable<any> {
  return this.http.get(this.url+"/admin/filmbyid/"+id);
  }

  deleteFilmbyId(id): Observable<any> {
  return this.http.delete(this.url+"/admin/DeleteFilmById/"+id);
  }

}
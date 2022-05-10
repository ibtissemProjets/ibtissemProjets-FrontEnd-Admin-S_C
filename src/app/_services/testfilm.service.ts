import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
 
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TestfilmService {

  constructor(private http: HttpClient) { }


  getFilm(): Observable<any> {
    return this.http.get("http://localhost:3000/getFilm",{responseType: 'text'});
  }

 

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class CarousselService {
  url = environment.apiUrl;
  constructor(private http: HttpClient) { }


  getPhoto(): Observable<any> {
    return this.http.get(this.url+"/getPhotoCarousssel");
  }



  createCaroussel(data): Observable<any> {   
    return this.http.post(this.url+'/upload', data );
  }

}

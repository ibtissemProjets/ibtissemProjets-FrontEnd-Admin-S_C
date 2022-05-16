import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ImagesFilmService {
  url = environment.apiUrl;
  constructor(private http: HttpClient) { }


  



  createImgProfile(data): Observable<any> {   
    return this.http.post(this.url+'/uploadProfileImg', data );
  }

  createImgCouverture(data): Observable<any> {   
    return this.http.post(this.url+'/uploadCouvertureImg', data );
  }
}

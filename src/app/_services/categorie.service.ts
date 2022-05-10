import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/assets/shared/_models/Category';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  updateCatgById(idCatg: any, categorys: Category) {
    throw new Error('Method not implemented.');
  }
  url = environment.apiUrl;
  constructor(private http: HttpClient) { }


  getCategorieByFilm(id): Observable<any> {
    return this.http.get(this.url+"/admin/catfilmID/"+id);
  }

  getCategorie(): Observable<any> {
    return this.http.get(this.url+"/admin/getCategories");
  }

  createCategorie(data): Observable<any> {   
    return this.http.post(this.url+'/admin/AddCategories', data );
  }

  deleteCategorieById(id): Observable<any> {
  return this.http.delete(this.url+"/admin/DeleteCategoryById/"+id);
  }

  updateCategorieById(id,data): Observable<any> {
    return this.http.put(this.url + "/admin/UpdateCatgById/"+ id,data);
  }
}

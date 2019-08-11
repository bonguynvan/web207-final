import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  apiURL = 'http://5d3193a54901b4001401a06a.mockapi.io/category' ;
  constructor(private http: HttpClient ) { }

  public getCategoriesList() {
    return this.http.get<any[]>(this.apiURL) ;
  }
  getCategory(id: string) {
    return this.http.get<any>(`${this.apiURL}/${id}`);
  }
  removeCategory(id: string) {
    return this.http.delete<any[]>(`${this.apiURL}/${id}`);
  }
  updateCategory(data) {
    return this.http.put<any[]>(`${this.apiURL}/${data.id}`, data);
  }
  createCategory(data) {
    return this.http.post<any>(this.apiURL, data);
  }


}

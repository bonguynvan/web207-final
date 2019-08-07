import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CategoryService} from './category.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient,
              private categoryService: CategoryService) {  }
  getProductsList(url: string) {
    console.log(this.categoryService.apiURL) ;
    return this.http.get<any[]>(`${this.categoryService.apiURL}/${url}`) ;
  }
  getProduct(url: string) {
    return this.http.get<any>(`${this.categoryService.apiURL}/${url}`) ;
  }
  // removeProduct(category: string, id: string) {
  //   this.apiURL = `http://5d3193a54901b4001401a06a.mockapi.io/category/${category}/products`;
  //   return this.http.delete<any[]>(`${this.apiURL}/${id}`);
  // }
  updateProduct(url: string, data) {
    return this.http.put<any>(`${this.categoryService.apiURL}/${url}`, data);
  }
  createProduct(url: string, data) {
    return this.http.post<any>(`${this.categoryService.apiURL}/${url}`, data);
  }
}

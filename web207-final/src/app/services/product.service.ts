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
    return this.http.get<any[]>(`${this.categoryService.apiURL}/${url}`) ;
  }
  getProduct(url: string) {
    return this.http.get<any>(`${this.categoryService.apiURL}/${url}`) ;
  }
  removeProduct(url: string, id) {
    return this.http.delete<any>(`${this.categoryService.apiURL}/${url}/${id}`);
  }
  updateProduct(url: string, data) {
    return this.http.put<any>(`${this.categoryService.apiURL}/${url}`, data);
  }
  createProduct(url: string, data) {
    return this.http.post<any>(`${this.categoryService.apiURL}/${url}`, data);
  }
}

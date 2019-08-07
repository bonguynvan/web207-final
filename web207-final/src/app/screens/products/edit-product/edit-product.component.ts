import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {ProductService} from '../../../services/product.service';
import {FormControl, FormGroup} from '@angular/forms';
@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  constructor(private productService: ProductService,
              private http: HttpClient,
              private router: Router,
              private route: ActivatedRoute) { }
  categoryId: string = this.route.snapshot.paramMap.get('category-id') ;
  productId: string = this.route.snapshot.paramMap.get('id') ;
  url: string = this.router.url
  productForm = new FormGroup({
    id: new FormControl(this.productId),
    categoryId: new FormControl(this.categoryId),
    name: new FormControl(''),
    image: new FormControl(''),
    price: new FormControl(''),
    detail: new FormControl(''),
    amount: new FormControl(''),
    status: new FormControl('')
  }) ;
  ngOnInit() {
    this.getProduct() ;
  }
  getProduct() {
    this.productService.getProduct(this.url).subscribe(data => {
      this.productForm = new FormGroup({
        id: new FormControl(this.productId),
        categoryId: new FormControl(this.categoryId),
        name: new FormControl(data.name),
        image: new FormControl(data.image),
        price: new FormControl(data.price),
        detail: new FormControl(data.detail),
        amount: new FormControl(data.amount),
        status: new FormControl(data.status)
      }) ;
    }) ;
  }
  updateProduct() {
    this.productService.updateProduct(this.url, this.productForm.value).subscribe(data => {
      this.router.navigate([`${this.categoryId}/products`]) ;
    }) ;
  }
}

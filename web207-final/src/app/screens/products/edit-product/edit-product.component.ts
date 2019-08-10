import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {ProductService} from '../../../services/product.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
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
  url = `${this.categoryId}/products/${this.productId}`
  productForm = new FormGroup({
    id: new FormControl(this.productId),
    categoryId: new FormControl(this.categoryId),
    name: new FormControl('',
      Validators.required),
    image: new FormControl('', [
      Validators.required,
      Validators.pattern(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g)
    ]),
    price: new FormControl('',
      [
        Validators.required,
        Validators.pattern(/(\d+\.\d{1,2})/g)]),
    detail: new FormControl(''),
    amount: new FormControl('',
     [
       Validators.required,
       Validators.pattern(/^[\d]+[\.][\d]{2}$/g)]),
    status: new FormControl('',
      Validators.required)
  })
  get name() {return this.productForm.get('name'); }
  get image() {return this.productForm.get('image') ; }
  get price() {return this.productForm.get('price') ; }
  get amount() {return this.productForm.get('amount') ; }
  get status() {return this.productForm.get('status') ; }

  ngOnInit() {
    this.getProduct() ;
  }
  getProduct() {
    this.productService.getProduct(this.url).subscribe(data => {
      this.productForm.setValue({
        id: new FormControl(this.productId),
        categoryId: new FormControl(this.categoryId),
        name: data.name,
        image: data.image,
        price: data.price,
        detail: data.detail,
        amount: data.amount,
        status: data.status
      }) ;
    }) ;
  }
  updateProduct() {
    this.productService.updateProduct(this.url, this.productForm.value).subscribe(data => {
      this.router.navigate([`${this.categoryId}/products`]) ;
    }) ;
  }
}

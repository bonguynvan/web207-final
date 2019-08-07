import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {CategoryService} from '../../../services/category.service';
import {Router, ActivatedRoute} from '@angular/router';
import {ProductService} from '../../../services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  constructor(private productService: ProductService,
              private router: Router,
              private route: ActivatedRoute) { }
  categoryId: string = this.route.snapshot.paramMap.get('category-id') ;
  url: string = this.router.url ;
  productForm = {
    name: new FormControl(''),
    image: new FormControl(''),
    price: new FormControl(''),
    detail: new FormControl(''),
    amount: new FormControl(''),
    status: new FormControl('')
  } ;
  ngOnInit() {
  }
  saveProduct() {
    let data = {
      name: this.productForm.name.value,
      image: this.productForm.image.value,
      price: this.productForm.price.value,
      detail: this.productForm.detail.value,
      amount: this.productForm.amount.value,
      status: this.productForm.status.value
    } ;
    this.productService.createProduct(this.url, data)
      .subscribe(data => {
        this.router.navigate([`${this.categoryId}/products`]);
      });
  }

}

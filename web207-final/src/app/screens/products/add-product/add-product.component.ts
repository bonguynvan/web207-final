import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
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
  url = `${this.categoryId}/products` ;
  productForm = {
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
  }
  ngOnInit() {
  }
  saveProduct() {
    let newProduct = {
      name: this.productForm.name.value,
      image: this.productForm.image.value,
      price: this.productForm.price.value,
      detail: this.productForm.detail.value,
      amount: this.productForm.amount.value,
      status: this.productForm.status.value
    } ;
    this.productService.createProduct(this.url, newProduct)
      .subscribe(data => {
        this.router.navigate([this.url]);
      });
  }

}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {ProductService} from '../../../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private productService: ProductService,
              private http: HttpClient,
              private router: Router,
              private route: ActivatedRoute) {  this.categoryId = this.route.snapshot.paramMap.get('category-id') ;}
  categoryId: string
  url: string = this.router.url
  productList: any[]
  ngOnInit() {
    this.getProductsList() ;
    console.log(this.url) ;
  }
  getProductsList() {
      this.productService.getProductsList(this.url).subscribe(data => {
        this.productList = [...data] ;
        console.log(data) ;
      }) ;
  }

  removeProduct(product) {
    this.productService.removeProduct(this.url, product.id)
      .subscribe((() => {
        this.productList = this.productList.filter(item => item.id !== product.id) ;
      }));
  }


}

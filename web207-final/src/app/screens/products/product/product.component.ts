import {Component, Input, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {ProductService} from '../../../services/product.service';
import {CategoryService} from '../../../services/category.service';
import * as $ from 'jquery' ;
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private productService: ProductService,
              private http: HttpClient,
              private router: Router,
              private route: ActivatedRoute,
              private cateService: CategoryService) {
    $(document).ready(() => {
      const $header = $('header');
      const $sticky = $header.before($header.clone().addClass('sticky'));
      $(window).on('scroll', () => {
        const scrollFromTop = $(window).scrollTop();
        $('body').toggleClass('scroll', (scrollFromTop > 50));
      });
    });
    this.categoryId = this.route.snapshot.paramMap.get('category-id');
    console.log('category: ' + this.getCategoriesName(this.categoryId));
  }

  categoryId: string;
  url: string = this.router.url;
  productList: any[];
  categoryName: string;

  ngOnInit() {
    this.getProductsList();
    this.getCategoriesName(this.categoryId);
  }

  getProductsList() {
    this.productService.getProductsList(this.url).subscribe(data => {
      this.productList = [...data];
      console.log('got ' + data.length + ' items');
    });
  }

  removeProduct(product) {
    const conf = confirm(`Are you sure to delete ${product.name} ?`);
    if (conf) {
      this.productService.removeProduct(this.url, product.id)
        .subscribe((() => {
          this.productList = this.productList.filter(item => item.id !== product.id);
        }));
    }
  }

  getCategoriesName(id) {
    this.cateService.getCategoriesList().subscribe(data => {
      this.categoryName = data.find(cate => cate.id === id).name;
    });
  }
}

import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../../services/category.service';
import {Router} from '@angular/router';
import * as $ from 'jquery' ;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private cateService: CategoryService,
              private router: Router) {
    $(document).ready(() => {
      const $header = $('header');
      const $sticky = $header.before($header.clone().addClass('sticky'));
      $(window).on('scroll', () => {
        const scrollFromTop = $(window).scrollTop();
        $('body').toggleClass('scroll', (scrollFromTop > 50));
      });
    });
  }
  categories: any[];
  ngOnInit() {
    this.displayCategoriesList();
  }

  displayCategoriesList() {
    this.cateService.getCategoriesList().subscribe(data => this.categories = [...data]);
  }

  removeCategory(category) {
    const conf = confirm(`Are you sure to delete ${category.name} ?`);
    if (conf) {
      this.cateService.removeCategory(category.id)
        .subscribe((data => {
          this.categories = this.categories.filter(item => item.id !== category.id);
        }));
    }
  }

}

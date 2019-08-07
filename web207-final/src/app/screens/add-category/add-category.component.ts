import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../../services/category.service';
import { Router} from '@angular/router';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  categoryForm = {
    name: new FormControl(''),
    image: new FormControl(''),
    address: new FormControl('')
  }
  constructor(private categoryService: CategoryService,
              private router: Router) { }
  ngOnInit() {
  }
  saveCategory() {
    if (this.categoryForm.image.value === '') {
      this.categoryForm.image.setValue('https://via.placeholder.com/150') ;
    }
    let data = {
      name: this.categoryForm.name.value,
      image: this.categoryForm.image.value,
      address: this.categoryForm.address.value
    } ;
    this.categoryService.createCategory(data)
      .subscribe(data => {
        this.router.navigate(['/']);
      });
  }
}

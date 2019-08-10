import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../../services/category.service';
import {Router} from '@angular/router';
import {AbstractControl, FormControl, ValidatorFn, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  categoryForm;

  constructor(private categoryService: CategoryService,
              private router: Router) {
  }

  ngOnInit() {
    this.categoryForm = {
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20)
      ]),
      image: new FormControl('', [
        Validators.required,
        Validators.pattern(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g)
      ]),
      address: new FormControl('')
    };
  }
  saveCategory() {
    const data = {
      name: this.categoryForm.name.value,
      image: this.categoryForm.image.value,
      address: this.categoryForm.address.value
    };
    this.categoryService.createCategory(data)
      .subscribe(() => {
        this.router.navigate(['/']);
      });
  }
}

import { Component, OnInit } from '@angular/core';
import { CategoryService} from '../../services/category.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import { forbiddenNameValidator} from '../../validators/ValidatorForm';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {

  constructor(private categoryService: CategoryService,
              private router: Router,
              private route: ActivatedRoute) { }
  categoryId: string = this.route.snapshot.paramMap.get('category-id')
  categoryForm = new FormGroup({
    id: new FormControl(this.categoryId),
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20)
    ]),
    image: new FormControl('', [
      Validators.required,
      Validators.pattern(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g)
    ]),
    address: new FormControl('')})

  ngOnInit() {
    this.getCategory(this.categoryId) ;
  }
  get name() {return this.categoryForm.get('name'); }
  get image() {return this.categoryForm.get('image') ; }

  getCategory(id: string) {
    this.categoryService.getCategory(id).subscribe(data => {
      this.categoryForm.setValue({
        id: data.id,
        name: data.name,
        image: data.image,
        address: data.address,
      }) ;
    }) ;
  }

  updateCategory() {
    this.categoryService.updateCategory(this.categoryForm.value).subscribe(data => {
      this.router.navigate(['/']) ;
    }) ;
  }

}

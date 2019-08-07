import { Component, OnInit } from '@angular/core';
import { CategoryService} from '../../services/category.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';

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
    name: new FormControl(''),
    image: new FormControl(''),
    address: new FormControl('')
  }) ;

  ngOnInit() {
    this.getCategory(this.categoryId) ;
  }
  getCategory(id: string) {
    this.categoryService.getCategory(id).subscribe(data => {
      this.categoryForm = new FormGroup({
        id: new FormControl(data.id),
        name: new FormControl(data.name),
        image: new FormControl(data.image),
        address: new FormControl(data.address)
      }) ;
    }) ;
  }

  updateCategory() {
    this.categoryService.updateCategory(this.categoryForm.value).subscribe(data => {
      this.router.navigate(['/']) ;
    }) ;
  }

}

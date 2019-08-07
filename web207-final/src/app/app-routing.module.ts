import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './screens/home/home.component';
import {AddCategoryComponent} from './screens/add-category/add-category.component';
import {EditCategoryComponent} from './screens/edit-category/edit-category.component';
import {ProductComponent} from './screens/products/product/product.component';
import {EditProductComponent} from './screens/products/edit-product/edit-product.component';
import {AddProductComponent} from './screens/products/add-product/add-product.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'add',
    component: AddCategoryComponent
  },
  {
    path: ':category-id/edit',
    component: EditCategoryComponent
  },
  {
    path: ':category-id/products',
    component: ProductComponent
  },
  {
    path: ':category-id/products/:id/edit',
    component: EditProductComponent
  },
  {
    path: ':category-id/products/add',
    component: AddProductComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

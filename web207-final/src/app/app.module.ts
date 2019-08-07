import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './screens/home/home.component';
import { CategoryComponent } from './screens/category/category.component';
import { EditCategoryComponent } from './screens/edit-category/edit-category.component';
import { AddCategoryComponent } from './screens/add-category/add-category.component';
import { ProductComponent } from './screens/products/product/product.component';
import { EditProductComponent } from './screens/products/edit-product/edit-product.component';
import { AddProductComponent } from './screens/products/add-product/add-product.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CategoryComponent,
    EditCategoryComponent,
    AddCategoryComponent,
    ProductComponent,
    EditProductComponent,
    AddProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

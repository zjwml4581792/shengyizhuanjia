/*
 * @Author: ZengJun
 * @Date: 2020-11-08 15:07:32
 * @LastEditors: ZengJun
 * @LastEditTime: 2020-11-29 20:01:23
 * @Description: 
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { CategoryListPage } from './category/category-list/category-list.page';
import { CategoryAddPage } from './category/category-add/category-add.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { CategoryNameEditPage } from './category/category-name-edit/category-name-edit.page';
import { CategoryEditPage } from './category/category-edit/category-edit.page';
import { ProductAddPage } from './product/product-add/product-add.page';
import { SelectSupplierPage } from './product/select-supplier/select-supplier.page';
import { ProductListPage } from './product/product-list/product-list.page';
import { ImagePicker } from '@ionic-native/image-picker/ngx';


@NgModule({
  declarations: [
    CategoryListPage,
    CategoryAddPage,
    CategoryNameEditPage,
    CategoryEditPage,
    ProductAddPage,
    SelectSupplierPage,
    ProductListPage
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProductRoutingModule,
    // ImagePicker
  ]
})
export class ProductModule { }

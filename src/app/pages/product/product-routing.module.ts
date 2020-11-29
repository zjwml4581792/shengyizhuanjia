/*
 * @Author: ZengJun
 * @Date: 2020-11-08 15:07:32
 * @LastEditors: ZengJun
 * @LastEditTime: 2020-11-29 18:54:44
 * @Description: 
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryListPage } from './category/category-list/category-list.page';
import { CategoryAddPage} from './category/category-add/category-add.page';
import { CategoryEditPage} from './category/category-edit/category-edit.page';
import { CategoryNameEditPage} from './category/category-name-edit/category-name-edit.page';
import { ProductAddPage } from './product/product-add/product-add.page';
import { SelectSupplierPage } from './product/select-supplier/select-supplier.page';
import { ProductListPage } from './product/product-list/product-list.page';

const routes: Routes = [
  {
    path:'categoryList',
    component:CategoryListPage
  },
  {
    path: 'category/add',
    component:CategoryAddPage
  },
  {
    path: 'category/edit',
    component: CategoryEditPage
  },
  {
    path: 'category/nameEdit',
    component: CategoryNameEditPage
  },
  {
    path: 'add',
    component: ProductAddPage
  },
  {
    path: 'list',
    component:ProductListPage
  },
  {
    path: 'select-supplier',
    component: SelectSupplierPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }

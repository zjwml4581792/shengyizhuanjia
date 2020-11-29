/*
 * @Author: ZengJun
 * @Date: 2020-11-08 13:24:16
 * @LastEditors: ZengJun
 * @LastEditTime: 2020-11-08 14:45:58
 * @Description: 
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShopPage } from './shop.page';

const routes: Routes = [
  {
    path: '',
    component: ShopPage
  },
  {
    path: 'edit',
    loadChildren: () => import('./shop-edit/shop-edit.module').then( m => m.ShopEditPageModule)
  },
  {
    path: 'edit/:title/:property',
    loadChildren: () => import('./shop-edit/shop-edit.module').then( m => m.ShopEditPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopPageRoutingModule {}

/*
 * @Author: ZengJun
 * @Date: 2020-11-29 19:19:38
 * @LastEditors: ZengJun
 * @LastEditTime: 2020-11-29 19:22:43
 * @Description: 
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductAddPage } from './product-add.page';

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      IonicModule,
      SharedModule,
      ProductAddPage
    ],
    declarations: [ProductAddPage]
  })
  export class ProductAddModule {}

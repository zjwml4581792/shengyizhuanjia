/*
 * @Author: ZengJun
 * @Date: 2020-11-01 16:16:43
 * @LastEditors: ZengJun
 * @LastEditTime: 2020-11-13 20:12:44
 * @Description: 
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    RouterModule.forChild([
      {
        path:'',
        component:HomePage
      }
    ])
  ],
  declarations: [HomePage]
})
export class HomePageModule {}

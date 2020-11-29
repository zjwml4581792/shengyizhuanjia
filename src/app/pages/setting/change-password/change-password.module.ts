/*
 * @Author: ZengJun
 * @Date: 2020-11-08 14:09:55
 * @LastEditors: ZengJun
 * @LastEditTime: 2020-11-13 00:49:17
 * @Description: 
 */
import { Directive, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChangePasswordPageRoutingModule } from './change-password-routing.module';

import { ChangePasswordPage } from './change-password.page';
import { ConfirmDirective} from 'src/app/shared/directives/confirm.directive';

imports:[
  ConfirmDirective
]
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChangePasswordPageRoutingModule
  ],
  declarations: [ChangePasswordPage]
})
export class ChangePasswordPageModule {}

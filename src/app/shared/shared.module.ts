/*
 * @Author: ZengJun
 * @Date: 2020-10-18 14:12:46
 * @LastEditors: ZengJun
 * @LastEditTime: 2020-11-06 23:55:00
 * @Description: 
 */
import { DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from './services/local-storage.service';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CopyrightComponent } from './components/copyright/copyright.component';
import { ConfirmDirective } from './directives/confirm.directive';
import { PhoneCheckDirective } from './directives/phone-check.directive';



@NgModule({
  declarations: [
    CopyrightComponent,
    ConfirmDirective,
    PhoneCheckDirective
  ],
  providers:[
    LocalStorageService
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  exports:[
    DatePipe,
    CommonModule,
    FormsModule,
    IonicModule,
    CopyrightComponent
  ]
})
export class SharedModule { }

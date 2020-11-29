/*
 * @Author: ZengJun
 * @Date: 2020-10-25 13:13:49
 * @LastEditors: ZengJun
 * @LastEditTime: 2020-11-06 23:57:26
 * @Description: 
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PassportRoutingModule } from './passport-routing.module';
import { SignupPage } from './signup/signup.page';
import { SharedModule } from './../../shared/shared.module';
import { LoginPage } from './login/login.page';
import { ForgotPasswordPage } from './forgot-password/forgot-password.page';


@NgModule({
  declarations: [
    SignupPage,
    LoginPage,
    ForgotPasswordPage
  ],
  imports: [
    // CommonModule,
    SharedModule,
    PassportRoutingModule
  ]
})
export class PassportModule { }

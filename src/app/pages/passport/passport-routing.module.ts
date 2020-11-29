/*
 * @Author: ZengJun
 * @Date: 2020-10-25 13:13:49
 * @LastEditors: ZengJun
 * @LastEditTime: 2020-11-06 22:06:35
 * @Description: 
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForgotPasswordPage } from './forgot-password/forgot-password.page';
import { LoginPage } from './login/login.page';
import { SignupPage } from './signup/signup.page';


const routes: Routes = [
  {
    path: 'signup',
    component: SignupPage
  },
  {
    path: 'login',
    component: LoginPage
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordPage
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PassportRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PassportRoutingModule } from './passport-routing.module';
import { SignupPage } from './signup/signup.page';
import { SharedModule } from './../../shared/shared.module';


@NgModule({
  declarations: [
    SignupPage
  ],
  imports: [
    // CommonModule,
    SharedModule,
    PassportRoutingModule
  ]
})
export class PassportModule { }
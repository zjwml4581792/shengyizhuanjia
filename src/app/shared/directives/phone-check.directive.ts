/*
 * @Author: ZengJun
 * @Date: 2020-11-13 19:01:10
 * @LastEditors: ZengJun
 * @LastEditTime: 2020-11-13 19:09:50
 * @Description: 
 */
import { Directive, Input } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[zjPhoneCheck]'
})
export class PhoneCheckDirective {
  @Input('zjPhoneCheck') phone:string;
  constructor() { }
  validate(control:AbstractControl):ValidationErrors{
    return this.phone?phoneValidator(this.phone)(control):null;
  }

}

export function phoneValidator(phone: string) {
  return (control: AbstractControl): { [key: string]: any } => { // 传入绑定表单的formControl
    if (!control.value) { // 如果绑定未输入值，则返回 required错误
      return { required: true };
    }
    // 如果格式不正确，则返回错误
    let reg = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(15[0-3]{1})|(15[4-9]{1})|(18[0-9]{1})|(199))+\d{8})$/;
    return reg.test(phone)? { confirm: { value: true } } : null;
  };
}
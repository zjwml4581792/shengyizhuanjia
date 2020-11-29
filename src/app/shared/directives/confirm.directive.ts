/*
 * @Author: ZengJun
 * @Date: 2020-11-08 13:53:21
 * @LastEditors: ZengJun
 * @LastEditTime: 2020-11-13 00:39:05
 * @Description: 验证指令
 */
import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[zjConfirm]',
  providers:[
    {
      provide:NG_VALIDATORS,
      useExisting:ConfirmDirective,
      multi:true
    }
  ]
})
export class ConfirmDirective implements Validator{
  @Input('zjConfirm') confirm:string;
  
  constructor() { }
  validate(control:AbstractControl):ValidationErrors{
    return this.confirm?confirmValidator(this.confirm)(control):null;
  }
}

export function confirmValidator(confirm: string){
  return (control: AbstractControl): {[key: string]: any} => { // 传入绑定表单的formControl
    if ( !control.value ) { // 如果绑定未输入值，则返回 required错误
     return {required: true };
    }
  　// 如果两次输入的值不相同，则返回confirm的错误
    return control.value !== confirm ? {confirm: {value: true}} : null;
   };
}

/*
 * @Author: ZengJun
 * @Date: 2020-10-25 15:32:01
 * @LastEditors: ZengJun
 * @LastEditTime: 2020-11-10 22:55:55
 * @Description: 验证码服务
 */
import { Injectable } from '@angular/core';
import { AjaxResult } from 'src/app/shared/class/ajax-result';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationCodeService {
  /**
   * 验证码
   */
  private code: string;
  /**
   * 过期时间
   */
  private deadline: number;
  constructor() {
    this.code = '';
  }
  
  /**
   * @description: 生成指定长度的验证码
   * @param {number} count 验证码长度
   * @return {string} 验证码
   */  
  createCode(count: number): string{
    this.code = '';
    // 10分钟内有效
    this.deadline = Date.now() + 60 * 10 * 1000;
    // this.deadline = Date.now() + 10 * 1000;
    for (let i = 0; i < count; i++) {
      // 可均衡获取 0 到 9 的随机整数
      this.code += Math.floor(Math.random()*10)+"";
    }
    // this.code = '1008';
    // this.deadline = Date.now() + 60 * 10 * 1000;
    return this.code;
  }
  // 验证用户输入的短信验证码是否一致，是否过期
  validate(value: string): AjaxResult{
    const now = Date.now();
    if(now > this.deadline){
      return new AjaxResult(false,null,{message:'验证码已超时，请重新获取'});
    }else if(value !== this.code){
      return new AjaxResult(false,null,{message:'验证码错误'});
    }else{
      return new AjaxResult(true,null);
    }
  }

  outTime(){
    const now = Date.now();
    return now > this.deadline;
  }
}

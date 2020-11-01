import { Injectable } from '@angular/core';

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
    for (let i = 0; i < count; i++) {
      // 可均衡获取 0 到 9 的随机整数
      this.code += Math.floor(Math.random()*10)+"";
    }
    return this.code;
  }
  // 验证用户输入的短信验证码是否一致，是否过期
  validate(value: string): boolean{
    const now = Date.now();
    return value === this.code && now < this.deadline;
  }
}

/*
 * @Author: ZengJun
 * @Date: 2020-10-25 13:17:15
 * @LastEditTime: 2020-10-31 22:15:25
 * @LastEditors: ZengJun
 * @Description: 注册页面逻辑
 * @FilePath: \syzj-ng\src\app\pages\passport\signup\signup.page.ts
 */
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides } from '@ionic/angular';
import { Signup } from './signup';
import { AuthenticationCodeService } from './authentication-code.service'
import { PassportService } from '../passport.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  @ViewChild('signupSlides', { static: false }) signupSlides: IonSlides;
  //字符串'signupSlides'和模板中的 #signupSlides 引用变量的名称一致
  signup: Signup;
  slideIndex: number;
  submited: boolean;
  inputCode: string;
  passwordIsSame:boolean;
  isRepetitivePhone:boolean;

  // 验证码倒计时
  verifyCode: any = {
    verifyCodeTips: '获取验证码',
    code: '',
    codeLength: 4,
    countdown: 60,
    disable: true,
    fail: false// 验证失败
  };
  constructor(private authenticationCodeService: AuthenticationCodeService, private router: Router, private passportService:PassportService) { }

  ngOnInit() {
    this.signup = {
      phone: "",
      email: "",
      shopName: "",
      password: "",
      confirmPassword: "",
      code: ""
    };
    // this.signupSlides.lockSwipes(true);
    this.isRepetitivePhone = false;
    this.slideIndex = 0;
  }
  onNext() {
    this.signupSlides.lockSwipes(false);
    this.signupSlides.slideNext();
    this.signupSlides.lockSwipes(true);
  }
  onPrevious() {
    this.signupSlides.lockSwipes(false);
    this.signupSlides.slidePrev();
    this.signupSlides.lockSwipes(true);
  }

  onSlidesDidLoad($event) {
    this.signupSlides.lockSwipes(true);
    this.signupSlides.getActiveIndex().then((index) => {
      this.slideIndex = index;
    });
  }

  onSlidesDidChange($event){
    this.signupSlides.getActiveIndex().then((index) => {
      this.slideIndex = index;
    });
  }

  isPositive(index: number): boolean {
    return this.slideIndex === index;
  }
  isNegative(index: number): boolean {
    return this.slideIndex !== index;
  }
  /**
   * 判断密码和确认密码是否一致
   */
  isConfirmPassword(): boolean {
    this.passwordIsSame = this.signup.password === this.signup.confirmPassword;
    return this.signup.password === this.signup.confirmPassword;
  }
  /**
   * 提交手机表单
   * @param form 手机表单
   */
  onPhoneSubmit(form: NgForm) {
    this.submited = true;
    if (form.valid) {
      if(this.passportService.isUniquePhone(this.signup.phone)){
        this.isRepetitivePhone = false;
        this.onNext();
      }else{
        this.isRepetitivePhone = true;
      }
    }
  }
  /**
   * 发送短信，暂时只有生成验证码功能
   */
  onSendSMS() {
    // this.authenticationCodeService.createCode(4);
    let code = this.authenticationCodeService.createCode(4);
    console.log("验证码="+code);
    this.verifyCode.disable = false;
    this.settime();
  }
  /**
   * 判断验证码是否正确
   * @param code 输入的验证码
   */
  isCorrectCode(code: string) {
    return this.authenticationCodeService.validate(code)
  }
  /**
   * 验证验证码
   * @param form 验证码表单
   */
  onValidateCode(form: NgForm) {
    // console.log(form);
    if (form.valid) {
      if (this.isCorrectCode(form.value.checkCode)) {
        this.verifyCode.fail = false;
        this.onNext();
      } else {
        this.verifyCode.fail = true;
      }
    }
  }
  /**
   * 倒计时
   */
  settime() {
    if (this.verifyCode.countdown === 1) {
      this.verifyCode.countdown = 60;
      this.verifyCode.verifyCodeTips = '重新获取';
      this.verifyCode.disable = true;
      return;
    } else {
      this.verifyCode.countdown--;
    }

    this.verifyCode.verifyCodeTips = this.verifyCode.countdown +' 秒后重新获取';
    setTimeout(() => {
      this.verifyCode.verifyCodeTips = this.verifyCode.countdown +' 秒后重新获取';
      this.settime();
    }, 1000);
  }

  onRegister(){
    if(this.isConfirmPassword()){
      this.passportService.addUser(this.signup);
      this.onNext()
    }else{
      this.passwordIsSame = false;
    }
  }

  onLogin(){
    
  }
}

/*
 * @Author: ZengJun
 * @Date: 2020-11-01 14:08:45
 * @LastEditors: ZengJun
 * @LastEditTime: 2020-11-10 23:37:14
 * @Description: 登录页面显示逻辑
 */
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { PassportService } from '../passport.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private username = "";
  private password = "";
  constructor(private toastController: ToastController, private passportService: PassportService, private alertController: AlertController,private router: Router) { }

  ngOnInit() {
  }

  async onLogin(form: NgForm) {
    let toast: any;
    //判断表单验证是否正确
    if (form.invalid) {
      toast = await this.toastController.create({
        duration: 3000
      })
    }
    if (form.controls.username.errors?.required) {
      toast.message = '请输入您的手机号或者邮箱';
      toast.present();
      return;
    }
    // console.log('username=',this.username);
    // console.log('password=',this.password);
    this.passportService.login(this.username,this.password).then((ajaxResult) => {
      if(ajaxResult.success){
        this.toastController.create({
          message:'登录成功',
          duration:2000
        }).then((toast)=>{
          toast.present();
        })
        this.router.navigateByUrl('/home');
      }else{
        this.alertController.create({
          header:'警告',
          buttons:['确定']
        }).then((alert)=>{
          alert.message = ajaxResult.error.message;
          alert.present();
        });
      }
    })
  }

  onForgotPassword() {
    this.router.navigateByUrl('/passport/forgot-password');
  }
}

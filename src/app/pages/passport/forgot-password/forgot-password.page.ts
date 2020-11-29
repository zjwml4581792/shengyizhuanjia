/*
 * @Author: ZengJun
 * @Date: 2020-11-06 21:56:49
 * @LastEditors: ZengJun
 * @LastEditTime: 2020-11-29 18:08:47
 * @Description: 忘记密码页面逻辑
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  constructor(private localStorage: LocalStorageService, private alertController: AlertController,
    private navController: NavController, private toastController: ToastController,
    private router: Router) { }

  account = '';
  ngOnInit() {
  }
  async onClick() {
    const user = this.localStorage.get('TUser', '');
    for(let i=0;i<user.length;i++){
      if(this.account === user[i].phone || this.account === user[i].email){
        const toast = await this.toastController.create({
          message: '验证消息已发送，请及时查看'
        });
        toast.present();
        this.router.navigateByUrl('/passport/login');
        return;
      }
    }
    const alert = await this.alertController.create({
      header: '提示',
      message: '该账号未注册',
      buttons: ['知道了']
    });
    alert.present();
  }

}

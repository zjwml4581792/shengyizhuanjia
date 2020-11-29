/*
 * @Author: ZengJun
 * @Date: 2020-11-08 14:09:55
 * @LastEditors: ZengJun
 * @LastEditTime: 2020-11-13 00:22:35
 * @Description: 
 */
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ConfirmDirective} from 'src/app/shared/directives/confirm.directive';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
  newPassword = {
    value: ""
  };
  viewObject ={
    confirmPassword:""
  }
  constructor(private navController: NavController) { }

  ngOnInit() {
  }

  async onSave() {
    console.log('onSave');
    // const oldPass = this.userService.getPassword();
    // this.isOldPassword = oldPass == this.oldpassword ? true : false;
    // if (this.newPassword == this.checkPassword && this.isOldPassword) {
    //   this.userService.updatePassword(this.newPassword);
    //   console.log('修改成功');
    //   this.router.navigateByUrl('/setting');
    //   const toast = await this.toastCtrl.create({
    //     message: '修改成功',
    //     duration: 2000
    //   });
    //   await toast.present();
  }

  back() {
    this.navController.navigateBack('/setting');
  }
}

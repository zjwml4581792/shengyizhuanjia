/*
 * @Author: ZengJun
 * @Date: 2020-11-08 13:24:16
 * @LastEditors: ZengJun
 * @LastEditTime: 2020-11-13 18:56:43
 * @Description: 
 */
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { SettingService } from '../setting.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
})
export class ShopPage implements OnInit {
  public shop: any;
  signup: any;
  constructor(private settingService:SettingService, private navController:NavController,private localStorageService:LocalStorageService) {
    this.shop = this.localStorageService.get('user',
      {
        shopName: '',
        shortName: '',
        phone: this.localStorageService.get('user', '').phone,
        email: this. localStorageService.get('user', '').email,
        shopKeeperName: '',
        shopTel: ''
      });
    this.signup = this.localStorageService.get('user', '').createTime;
  }

  ngOnInit() {
  }

  get user():any{
    return this.settingService.user;
  }

  back(){
    this.navController.navigateBack('/setting');
  }

  ionViewWillEnter(){
    this.shop = this.localStorageService.get('user',
      {
        shopName: '',
        shortName: '',
        phone: this.localStorageService.get('user', '').phone,
        email: this. localStorageService.get('user', '').email,
        shopKeeperName: '',
        shopTel: ''
      });
    this.signup = this.localStorageService.get('signupTime', '');
  }
}

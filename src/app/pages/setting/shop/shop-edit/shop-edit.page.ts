/*
 * @Author: ZengJun
 * @Date: 2020-11-08 13:24:50
 * @LastEditors: ZengJun
 * @LastEditTime: 2020-11-13 18:54:20
 * @Description: 
 */
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { SettingService } from '../../setting.service';
import { ShopPage } from '../shop.page';

@Component({
  selector: 'app-shop-edit',
  templateUrl: './shop-edit.page.html',
  styleUrls: ['./shop-edit.page.scss'],
  encapsulation:ViewEncapsulation.None
})
export class ShopEditPage implements OnInit {

  title: string;
  property: string;
  value: string;

  constructor(private activatedRoute: ActivatedRoute, private settingService: SettingService, private navController: NavController, private toastController: ToastController, private localStorageService: LocalStorageService) {
    this.title = this.activatedRoute.snapshot.params['title'];

    this.property = this.activatedRoute.snapshot.params['property'];
  }

  ngOnInit() {
  }

  async onSave() {

    this.settingService.user[this.property] = this.value;
    this.localStorageService.set('user', this.settingService.user);
    
    let TUser = this.localStorageService.get(this.localStorageService.TUSER,"");
    for(let i=0;i<TUser.length;i++){
      if(TUser[i].id===this.settingService.user.id){
        TUser[i]=this.settingService.user;
      }
    }
    this.localStorageService.set(this.localStorageService.TUSER,TUser);

    this.value = '';
    const toast = await this.toastController.create({
      message: '保存成功',
      duration: 2000
    });
    toast.present();
    this.back();
  }
  back() {
    this.navController.navigateBack('/setting/shop');
  }
}

/*
 * @Author: ZengJun
 * @Date: 2020-11-08 13:22:38
 * @LastEditors: ZengJun
 * @LastEditTime: 2020-11-13 18:22:14
 * @Description: 
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { SettingService } from './setting.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {

  constructor(private settingService:SettingService, private navController:NavController,private localStorageService:LocalStorageService,private router:Router) { }

  ngOnInit() {
  }

  getUser():any{
    
  }

  back(){
    this.navController.navigateBack('/home');
  }

  onLogout(){
    this.localStorageService.remove(this.localStorageService.USER);
    this.localStorageService.remove(this.localStorageService.LOGIN_TIME);
    this.localStorageService.remove(this.localStorageService.OUT_TIME);
    this.router.navigateByUrl('/passport/login');
  }
  
}

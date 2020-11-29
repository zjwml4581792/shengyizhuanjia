/*
 * @Author: ZengJun
 * @Date: 2020-10-13 01:40:31
 * @LastEditors: ZengJun
 * @LastEditTime: 2020-11-29 17:11:38
 * @Description: 
 */
import { Component, OnInit } from '@angular/core';

import { MenuController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { LocalStorageService } from './shared/services/local-storage.service';
import { User} from './pages/passport/passport.service'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    { title: '开店论坛', url: '/home', icon: 'chatbox' },
    { title: '手机橱窗', url: '/home', icon: 'create' },
    { title: '邀请有礼', url: '/home', icon: 'git-merge' },
    { title: '资金账户', url: '/home', icon: 'cash' },
    { title: '反馈建议', url: '/home', icon: 'cash' },
    { title: '帮助中心', url: '/home', icon: 'cash' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  public userInfo:User;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router:Router,
    private localStorageService:LocalStorageService,
    private menuController: MenuController,
  ) {
    this.initializeApp();
    
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      //沉浸式并且悬浮透明
      // this.statusBar.overlaysWebView(true);

    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }

    try{
      this.userInfo = this.localStorageService.get(this.localStorageService.USER,{
        id:0,
        phone:123456789,
        shopName:'默认商店',
      });

      if(!this.userInfo){
        console.log('无法找到用户信息');
      }
    }catch(e){
      console.log('无法找到用户信息['+e+']');
    }
  }

  ionViewWillEnter() {
    this.menuController.enable(false);
  }

  ionViewDidLeave() {
    this.menuController.enable(true);
  }

  onSetting(){
    this.router.navigateByUrl('/setting');
  }
}

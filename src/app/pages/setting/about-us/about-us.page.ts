/*
 * @Author: ZengJun
 * @Date: 2020-11-08 14:12:41
 * @LastEditors: ZengJun
 * @LastEditTime: 2020-11-12 22:51:34
 * @Description: 
 */
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.page.html',
  styleUrls: ['./about-us.page.scss'],
})
export class AboutUsPage implements OnInit {

  constructor(private navController:NavController) { }

  ngOnInit() {
  }
  back(){
    this.navController.navigateBack('/setting');
  }
}

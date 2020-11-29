/*
 * @Author: ZengJun
 * @Date: 2020-11-15 14:29:36
 * @LastEditors: ZengJun
 * @LastEditTime: 2020-11-20 23:45:00
 * @Description: 
 */
import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavParams, Platform } from '@ionic/angular';

@Component({
  selector: 'app-category-name-edit',
  templateUrl: './category-name-edit.page.html',
  styleUrls: ['./category-name-edit.page.scss'],
})
export class CategoryNameEditPage implements OnInit {
  @Input() categoryName:string;
  name: string;
  constructor(public platform:Platform, private modalController:ModalController,private navParams:NavParams) {
    this.name = this.navParams.data['categoryName'];
  }

  /**
   * 关闭模态窗口，并把分类名称传回给分类编辑页面
   * @param {string} name
   */
  dismiss(name?: string) {
    this.modalController.dismiss(name);
  }

  /**
   * 返回参数
   */
  onSave() {
    this.dismiss(this.name);
  }

  ngOnInit() {
  }
}

/*
 * @Author: ZengJun
 * @Date: 2020-11-21 23:11:44
 * @LastEditors: ZengJun
 * @LastEditTime: 2020-11-21 23:16:16
 * @Description: 
 */
import { StylesCompileDependency } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Supply } from '../Supply';
import { SupplyService } from '../supply.service';

@Component({
  selector: 'app-select-supplier',
  templateUrl: './select-supplier.page.html',
  styleUrls: ['./select-supplier.page.scss'],
})
export class SelectSupplierPage implements OnInit {
  suppliers: Supply[];
  activeSupplier: Supply = {
    id: null,
    name: '',
    phone: null
  };

  constructor(private modalController:ModalController,private supplyService:SupplyService) {
    this.supplyService.getAll().then((data) => {
      if (data.success) {
        this.suppliers = data.data;
      } else {
        console.log('读取本地供应商数据失败');
      }
    });
  }
  /**
   * 关闭模态窗口，并把分类名称传回给分类编辑页面
   * @param {string} name
   */
  dismiss(supplier?: Supply) {
    this.modalController.dismiss(this.activeSupplier);
  }
  /**
   * 返回参数
   */
  onSave() {
    this.dismiss(this.activeSupplier);
  }

  /**
   * 选中当前供应商
   * @param {Supply} supplier
   */
  onClick(supplier: Supply) {
    this.activeSupplier = supplier;
  }

  ngOnInit() {
  }

}

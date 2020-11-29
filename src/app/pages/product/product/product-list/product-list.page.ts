/*
 * @Author: ZengJun
 * @Date: 2020-11-22 14:31:28
 * @LastEditors: ZengJun
 * @LastEditTime: 2020-11-30 00:38:18
 * @Description: 
 */
import { TypeScriptEmitter } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonInfiniteScroll, LoadingController, NavController } from '@ionic/angular';
import { Subscription, timer } from 'rxjs';
import { AjaxResult } from 'src/app/shared/class/ajax-result';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.page.html',
  styleUrls: ['./product-list.page.scss'],
})
export class ProductListPage implements OnInit {
  currentIndex: number = 0;//当前页码
  total: number = -1;//总记录数
  products: any[] = [];//
  price: number;//总价格
  queryTerm: string = '';//查询条件
  categoryId: number = -1;//商品种类id

  constructor(
    private loading: LoadingController,
    private productService: ProductService,
    private navController: NavController,
    private router: Router) {
  }

  async ngOnInit() {

    this.currentIndex = 0;
    // 自行添加初始化代码
    const loading = await this.loading.create({
      message: '正在加载数据，请稍候...',
      spinner: 'bubbles',
    });
    loading.present();

    try {
      const result: AjaxResult = await this.productService.getList(this.currentIndex, 8);

      const subscription: Subscription = timer(1000).subscribe(() => {
        loading.dismiss();
        this.total = result.data.total;
        this.products = result.data.list;
      })
    } catch (error) {
      console.log(error);
    }



    try {

      timer(1000).subscribe(() => {

      })

      // 其他代码省略  
    } catch (error) {
      console.log(error);
      // 实际开发中应记录在日志文件中
    }
  }

  noData(): boolean {
    return this.total === 0;
  }
  /**
   * 下拉刷新
   * @param event 
   */
  async onRefresh(event) {
    this.currentIndex = 1;
    const refresh = event.target;
    try {
      const ajaxResult: AjaxResult = await this.productService.getList(this.currentIndex, 10);
      this.products = ajaxResult.data;
    } catch (error) {
      console.log('出现错误');
      console.log(error);
    }
    refresh.complete();
  }
  /**
   * 上拉加载
   * @param event 
   */
  async onInfinite(event) {
    this.currentIndex++;
    if (this.currentIndex >= Math.ceil(this.total / 8)) {
      event.target.complete();
    }
    try {
      const result: AjaxResult = await this.productService.getList(this.currentIndex, 8);
      const timerSubscription: Subscription = timer(100).subscribe(() => {
        event.target.complete();
        this.total = result.data.total;
        this.products = this.products.concat(result.data.list);
      })
    } catch (error) {
      console.log(error);
    }
  }

  async onInput(event) {
    this.currentIndex = 1;
    const condition = event.target.value;
    try {
      if (condition == '') {
        this.total = 0;
      } else {
        this.categoryId = -1;
        this.currentIndex = 1;
        this.price = 0;
        const ajaxResult: AjaxResult = await this.productService.getListByCondition(this.currentIndex, 10, condition);
        this.products = ajaxResult.data;
      }
    } catch (error) {
      console.log(error);
    }
  }

  onClick() {
    this.router.navigateByUrl('/product/add');
  }

  onCategory() {
    this.router.navigateByUrl('/product/categoryList');
  }

  onBack() {
    this.navController.navigateBack('/home');
  }
}

/*
 * @Author: ZengJun
 * @Date: 2020-11-22 14:31:28
 * @LastEditors: ZengJun
 * @LastEditTime: 2020-11-29 17:33:13
 * @Description: 
 */
import { TypeScriptEmitter } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { Subscription, timer } from 'rxjs';
import { AjaxResult } from 'src/app/shared/class/ajax-result';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.page.html',
  styleUrls: ['./product-list.page.scss'],
})
export class ProductListPage implements OnInit {
  currentIndex= 0;
  total = -1;
  products:any[]=[];
  queryTerm='';
  categoryId = -1;

  constructor(private loading:LoadingController,private productService:ProductService,private navController:NavController) {
    console.log(111);
  }

  async ngOnInit() {
    console.log(11);

    this.currentIndex=0;
    // 自行添加初始化代码
    const loading = await this.loading.create({
      message: '正在加载数据，请稍候...',
      spinner: 'bubbles',
    });
    loading.present();


    try{
      const result: AjaxResult = await this.productService.getList(this.currentIndex, 8);
      const subscription:Subscription = timer(1000).subscribe(()=>{
        loading.dismiss();
        this.total = result.data.total;
        this.products = result.data.list;
      })
    }catch(error){
      console.log(error);
    }
    
    

    try {

      timer(1000).subscribe(()=>{
        
      })
      
      // 其他代码省略  
    } catch (error) {
      console.log(error);
      // 实际开发中应记录在日志文件中
    }
  }

  // noData():boolean{

  // }

  async onInfinite(event){
    this.currentIndex++;
    if(this.currentIndex>=Math.ceil(this.total/8)){
      event.target.complete();
    }
    try{
      const result:AjaxResult = await this.productService.getList(this.currentIndex,8);
      const timerSubscription:Subscription = timer(100).subscribe(()=>{
        event.target.complete();
        this.total = result.data.total;
        this.products = this.products.concat(result.data.list);
      })
    }catch(error){
      console.log(error);
    }
  }

  async onInput(event){
    console.log(event);
    return;
    this.queryTerm = event.target.getInputElement();
  }

  onBack(){
    this.navController.navigateBack('/product/categoryList');
  }
}

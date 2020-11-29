/*
 * @Author: ZengJun
 * @Date: 2020-11-15 13:35:52
 * @LastEditors: ZengJun
 * @LastEditTime: 2020-11-21 02:03:28
 * @Description: 
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { Category } from 'src/app/shared/category';
import { CategoryService } from 'src/app/pages/product/category/category.service';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.page.html',
  styleUrls: ['./category-add.page.scss'],
})
export class CategoryAddPage implements OnInit {
  headTitle: any;
  title1: any;
  category: Category;
  name1: string;
  id:number;
  subnum:number;

  constructor(private navController:NavController,private activatedRoute:ActivatedRoute, private categoryService:CategoryService, private toastController:ToastController,private router:Router) { 
    this.activatedRoute.queryParams.subscribe(queryParams => {
      console.log(queryParams);
      this.title1 = queryParams.title1;
      this.id = parseInt(queryParams.id);
      this.subnum = 1+parseInt(queryParams.subnum);
      if (this.title1 !== '大分类') {
        this.headTitle = '新增小分类';
        this.category = {
          id: this.id,
          name: '',
          children: [{
            id: this.id*10+this.subnum,
            name: '',
            children: []
          }]
        };
      } else {
        this.headTitle = '新增分类';
        this.category = {
          id: this.id,
          name: '',
          children: [{
            id: this.id*10+1,
            name: '',
            children: []
          }]
        };
      }

      
    });
  }

   /**
   * 新增商品小分类
   */
  onAddSubCategory() {
    this.subnum++;
    this.category.children.push({
    id: this.id*10+this.subnum,
    name: '',
    children: []
  });
}

/**
 * 保存新增分类
 * @returns {Promise<void>}
 */
async onSave() {
  if (this.title1 === '大分类') { // 增加商品分类
    this.category.name = this.name1;
    if (this.categoryService.insert(this.category) === true) {
      const toast = await this.toastController.create({
        message: '新增成功',
        duration: 3000
      });
      this.router.navigateByUrl('/product/categoryList');
      toast.present();
    } else {
      const toast = await this.toastController.create({
        message: '新增失败，存在相同名称',
        duration: 3000
      });
      toast.present();
    }

  } else { // 增加商品小分类
    this.category.name = this.title1;
    if (this.categoryService.insertSubCateCategory(this.category) === true) {
      const toast = await this.toastController.create({
        message: '新增成功',
        duration: 3000
      });
      this.router.navigateByUrl('/product/categoryList');
      toast.present();
    } else {
      const toast = await this.toastController.create({
        message: '新增失败，存在相同名称',
        duration: 3000
      });
      toast.present();
    }
  }
}

  ngOnInit() {
  }
  onBack() {
    this.navController.navigateBack('/product/categoryList');
  }
}

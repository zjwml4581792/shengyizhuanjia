/*
 * @Author: ZengJun
 * @Date: 2020-11-15 13:58:05
 * @LastEditors: ZengJun
 * @LastEditTime: 2020-11-21 19:28:48
 * @Description: 
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, IonItemSliding, ModalController, NavController, Platform, ToastController } from '@ionic/angular';
import { Category } from 'src/app/shared/category';
import { CategoryService } from 'src/app/pages/product/category/category.service';
import { CategoryNameEditPage } from '../category-name-edit/category-name-edit.page';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.page.html',
  styleUrls: ['./category-edit.page.scss'],
})
export class CategoryEditPage implements OnInit {

  id:any;
  category:Category;
  name:string;

  constructor(public platform:Platform, private modalController:ModalController,private categoryService:CategoryService,private alertController:AlertController,private router:Router,
    private activatedRoute:ActivatedRoute,
    private navController:NavController,private toastController:ToastController) {
      this.activatedRoute.queryParams.subscribe(queryParams => {
        this.id = queryParams.id;
        this.category = this.categoryService.findCategoryById(this.id); // 获取到商品类别
      });
    }

  ngOnInit() {
  }

  private async presentModal(name:string){
    const modal = await this.modalController.create({
      component:CategoryNameEditPage,
      componentProps:{categoryName:name}
    });

    await modal.present();
    return modal.onWillDismiss();
  }

  /**
   * 编辑商品分类名称
   * @param {ItemSliding} item
   * @returns {Promise<void>}
   */
  async onEditCategoryName(item: IonItemSliding) {
    item.close();
    const {data} = await this.presentModal(this.category.name);
    if (data) {
      this.category.name = data;
    }
  }
  /**
   * 编辑商品子分类名称
   * @param {ItemSliding} item
   * @param {Category} subCategory
   * @returns {Promise<void>}
   */
  async onEditSubCategoryName(item: IonItemSliding, subCategory: Category) {
    item.close();
    const {data} = await this.presentModal(subCategory.name);
    if (data) {
      subCategory.name = data;
    }
  }

  /**
   * 删除商品分类
   * @param {ItemSliding} item
   * @param {number} subId
   * @returns {Promise<void>}
   */
  async onDelete(item: IonItemSliding, subId?: number){
    const alert = await this.alertController.create({
      header: '你确认要删除吗!',
      message: '请先删除该类别下的所有商品记录',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'assist',
          handler: (blah) => {
            console.log('Confirm Cancel');
            item.close();
          }
        }, {
          text: '确认',
          handler: () => {
            console.log('Confirm Okay');
            if (subId != null) { // 删除商品子分类
              item.close();
              this.categoryService.deleteSubCategoryById(this.category, subId);
              this.category = this.categoryService.findCategoryById(this.id);
            } else if (this.category.children.length === 0) { // 删除商品分类
              item.close();
              this.categoryService.deleteCategoryById(this.category.id);
              this.router.navigateByUrl('/product/categoryList');
            } else {
              console.log('还有小分类，无法删除大分类');
              item.close();
            }
          }
        }
      ]
    });
    await alert.present();
  }

  /**
   * 离开页面时保存修改数据
   */
  ionViewWillLeave() {
    if (this.categoryService.modifyCategory(this.category)) {
      console.log('保存成功');
    } else {
      console.log('保存失败');
    }
  }
  onBack() {
    this.navController.navigateBack('/product/categoryList');
  }
}

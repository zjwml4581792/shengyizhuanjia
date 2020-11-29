import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, NavController } from '@ionic/angular';
import { Category } from 'src/app/shared/category';
import { CategoryService } from 'src/app/pages/product/category/category.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.page.html',
  styleUrls: ['./category-list.page.scss'],
})
export class CategoryListPage implements OnInit {

  count = 0;
  subCategories_num = 0;
  activeCategory: Category;  // 当前被选中的商品大类别
  subCategories: Category[];
  categories: Array<Category>;  // 所有的商品类别数据含大类和小类
  subscription: Subscription;


  constructor(
    private categoryService: CategoryService,
    private actionSheetController: ActionSheetController,
    private router: Router,
    private navController:NavController,
    private location:Location) {

    categoryService.getAll().then((data) => {
        this.categories = data.data;
        if (this.categories) {
            this.activeCategory = this.categories[0];  //默认当前被选中的是第一个类别
            this.subCategories = this.activeCategory.children;
        }
        this.subCategories_num = this.subCategories.length
    });
  }
  
  ionViewWillEnter() {
      this.categoryService.getAll().then((data) => {
        this.categories = data.data;
        if (this.categories) {
            this.activeCategory = this.categories[0];  //默认当前被选中的是第一个类别
            this.subCategories = this.activeCategory.children;
        }
        this.subCategories_num = this.subCategories.length
      });
  }

  ngOnInit() {
  }
  /**
   * 显示一个操作表，让用户选择编辑分类还是新增小分类
   */
  async onPresentActionSheet() {
      const actionSheet = await this.actionSheetController.create({
          header: '选择您的操作',
          buttons: [
              {
                  text: '新增小分类',
                  role: 'destructive',
                  handler: () => {
                    console.log('Destructive clicked');
                    this.onAddSubCategory();
                  }
              }, {
                  text: '编辑分类',
                  handler: () => {
                    console.log('Archive clicked');
                      this.router.navigate(['/product/category/edit'], {queryParams: {'id': this.activeCategory.id}});
                  }
              }, {
                  text: '取消',
                  role: 'cancel',
                  handler: () => {
                    console.log('Cancel clicked');
                  }
              }
          ]
      });
      await actionSheet.present();
  }
  /**
   *根据id判断是否是被选中的大类别，是返回''，否则返回'light'
   */
  getItemColor(id: number): string {
      if (id === this.activeCategory.id) {
          return '';
      } else {
          return 'light';
      }
  }
  /**
   * 选择大分类时，改变activeCategory的值，并找到该类别下的小类
   */
  onSelectCategory(id: number) {
      for (let c of this.categories) {
          if (c.id === id) {
              this.activeCategory = c;
              this.subCategories = this.activeCategory.children;
              this.subCategories_num = this.subCategories.length   
              break;
          }
      }
  }
  /**
   *选择小分类时，改变activeSubCategory的值，跳转回之前的页面
   */
  onSelectSubCategory(category: Category) {
    this.categoryService.setActiveCategory(category);
    console.log('选择了小分类',category);
    this.location.back();
  }

  onAddCategory(){
    this.router.navigate(['/product/category/add'],
    {queryParams: {'id': this.categories.length+1,'name': this.activeCategory.name,'title1':'大分类'}});
  }

  onAddSubCategory(){
    this.router.navigate(['/product/category/add'],
    {queryParams: {'id': this.categories.length,'title1':this.activeCategory.name,'subnum':this.subCategories.length}});
  }
  onBack() {
    this.navController.navigateBack('/home');
  }
}

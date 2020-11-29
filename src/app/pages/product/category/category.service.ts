import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {CATEGORIES} from "../../../shared/mock.categories";
import { Category } from '../../../shared/category';
import { AjaxResult } from '../../../shared/class/ajax-result';
import { LocalStorageService } from '../../../shared/services/local-storage.service';
import { ActiveCategory } from '../../../shared/services/active-category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  categorySubject = new Subject<ActiveCategory>();

  constructor(private localStorageService: LocalStorageService) {
    console.log('CategoryService');
  }
  async getAll(): Promise<AjaxResult> {
    try{
      const categories = this.localStorageService.get('Category', CATEGORIES);
      return {
        targetUrl: '',
        data: categories,
        success: true,
        error: null,
        unAuthorizedRequest: false
      };
    }catch(e){
      console.log(e);
    }
  }
  /**
     * 增加商品分类
     * @param {Category} category
     * @returns {boolean}
     */
  insert(category: Category): boolean {
    if (category == null) {
      return false;
    }
    if (this.isUniqueName(category) === false) {
      return false; // 子分类名称重复
    }
    const tmp = this.localStorageService.get('Category', CATEGORIES);
    tmp.push(category);
    this.localStorageService.set('Category', tmp);
    return true;
  }
  isUniqueName(category: Category): boolean {
    if (category == null || (category.name === '')) {
      return false;
    }

    for (let i = 0; i < category.children.length - 1; i++) {
      for (let j = i + 1; j < category.children.length; j++) {
        if (category.children[i].name == category.children[j].name) {
          return false; // 找到相同名称，跳出循环
        }
      }
    }
    return true;
  }

  /**
   *
   *通过名字查找
   * @param {string} name 种类名
   * @returns {number} 种类下标
   * @memberof CategoryService
   */
  findCategoryIndexByName(name: string): number {
    const cg = this.localStorageService.get('Category', CATEGORIES);
    for (let i = 0; i < cg.length; i++) {
      if (cg[i].name == name) {
        return i;
      }
    }
    return -1;
  }
  /**
   * 通过ID查找
   * @param {number} id 种类ID 
   */
  findCategoryIndexById(id: number): number {
    const cg = this.all();
    for (let i = 0; i < cg.length; i++) {
      if (cg[i].id == id) {
        return i;
      }
    }
    return -1;
  }

  /**
   * 通过id查找商品类别
   * @param {number} id
   * @returns {Category}
   */
  findCategoryById(id: number): Category {
    const cg = this.localStorageService.get('Category', CATEGORIES);
    for (let i = 0; i < cg.length; i++) {
      if (cg[i].id == id) {
        return cg[i];
      }
    }
    return null;
  }
  /**
   * 更新数据库
   * @param {Category} category
   */
  update(category: Category[]) {
    this.localStorageService.set('Category', category);
  }

  /**
   * 增加商品小分类
   * @param {Category} category
   * @returns {boolean}
   */
  insertSubCateCategory(category: Category): boolean {
    if (category === null) {
      return false;
    }
    const tmp = this.localStorageService.get('Category', CATEGORIES);
    const index = this.findCategoryIndexByName(category.name); console.log(index);
    if (index === -1) {
      return false; // 未能找到索引
    }
    for (let j = 0; j < category.children.length; j++) {
      tmp[index].children.push(category.children[j]);
    }
    if (this.isUniqueName(tmp[index]) === false) {
      return false; // 名称重复
    } else {
      this.update(tmp);
      return true;
    }
  }

  /**
   * 通过名字删除商品小分类
   * @param {Category} category
   * @param {string} name
   * @returns {boolean}
   */
  deleteSubCategoryById(category: Category, id: number): boolean {
    if (category == null) {
      return false;
    }
    for (let i = 0; i < category.children.length; i++) {
      if (category.children[i].id == id) {
        const index = this.findCategoryIndexByName(category.name);
        let tmp = this.localStorageService.get('Category', CATEGORIES);
        tmp[index].children.splice(i, 1);
        this.localStorageService.set('Category', tmp);
        return true;
      }
    }
    return false;
  }

  /**
   * 通过id删除商品分类
   * @param {string} id
   * @returns {boolean}
   */
  deleteCategoryById(id: number): boolean {
    const tmp = this.localStorageService.get('Category', CATEGORIES);
    for (let i = 0; i < tmp.length; i++) {
      if (tmp[i].id === id) {
        tmp.splice(i, 1);
        this.localStorageService.set('Category', tmp);
        return true;
      }
    }
    return false;
  }

  /**
   * 通过传入商品分类修改数据
   * @param {Category} cg
   * @returns {boolean}
   */
  modifyCategory(cg: Category): boolean {
    const index = this.findCategoryIndexById(cg.id);
    if (index === -1) {
      return false;
    }
    let tmp = this.localStorageService.get('Category', CATEGORIES);
    tmp[index] = cg;
    this.update(tmp);
    return true;
  }

  /**
   * 返回所有商品类别.
   * @returns {Category[]}
   */
  all(): Category[] {
    return this.localStorageService.get('Category', CATEGORIES);
  } 

  /**
   * 返回可观察者
   * @returns {Observable<ActiveCategory>}
   */
  watchCategory(): Observable<ActiveCategory> {
    return this.categorySubject.asObservable();
  }
  /**
   * 
   * 向订阅者发送通知，传送数据 
   */
  setActiveCategory(category: ActiveCategory) {
    this.categorySubject.next(category);
  }

  public async get(id:number){
    console.log(id);
    const data = this.getById(id);
    if(data){
      return new AjaxResult(true,data);
    }else{
      return new AjaxResult(false,null,{message:'商品类别不存在'});
    }
  }

  private getById(id:number):Category{
    return {id:1,name:'',children:[]};
  }
}

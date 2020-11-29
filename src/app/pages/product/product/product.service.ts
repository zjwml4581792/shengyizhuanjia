/*
 * @Author: ZengJun
 * @Date: 2020-11-15 15:38:26
 * @LastEditors: ZengJun
 * @LastEditTime: 2020-11-30 00:28:28
 * @Description: 
 */
import { Injectable } from '@angular/core';
import {UUID} from 'angular2-uuid';
import { AjaxResult } from 'src/app/shared/class/ajax-result';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { Product } from './product';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private localStorageService:LocalStorageService) { }

  async insert(input: Product): Promise<AjaxResult> {
    input.id = UUID.UUID(); // 自动生成ID
    const res = this.localStorageService.get(this.localStorageService.PRODUCT, []);
    res.push(input);
    this.localStorageService.set(this.localStorageService.PRODUCT, res);
    return {
      data: res,
      success: true,
    };
    
  }

  async getList(index:number,size:number):Promise<AjaxResult>{
    // console.log('getList');
    if (index < 0) {
      // 实际开发中应抛出异常类对象
      throw new Error('分页的索引应大于等于零');
    }
    if (size <= 0) {
      // 实际开发中应抛出异常类对象
      throw new Error('每页显示的记录数应大于零');
    }
    const products:any[] = this.localStorageService.get(this.localStorageService.PRODUCT,[]);
    // console.log(products);
    const list = products.slice(index*size,(index+1)*size);
    const data = {
      total:products.length,
      list:list
    }
    
    return new AjaxResult(true,
      data);
  }
  /**
   * 根据类别编号获得商品数据。
   * @param index 
   * @param size 
   * @param categoryId 类别id
   */
  async getListByCategoryId(index: number, size: number, categoryId: number): Promise<AjaxResult> {
    const productlist = this.localStorageService.get(this.localStorageService.PRODUCT, []);
    let tmp = [];
    for(const p of productlist){
      if(p.id = index){
        tmp.push(p);
      }
    }
    return {
      data: tmp,
      success: true,
      error: null,
      unAuthorizedRequest: false,
    };
  }

  /**
   * 根据条件查找商品列表
   * @param {number} index
   * @param size
   * @param input
   * @returns {Promise<AjaxResult>}
   */
  async getListByCondition(index: number, size: 10, input: any): Promise<AjaxResult> {
    const productlist = this.localStorageService.get(this.localStorageService.PRODUCT, []);
    let tmp = [];
    for (const p of productlist) {
      if (p.name == input || p.barcode == input || p.price == input) {
        tmp.push(p);
      }
    }
    const total = tmp.length;
    tmp = tmp.slice((index - 1) * size, index * size);
    return {
      targetUrl: '',
      data: tmp,
      success: true,
      error: null,
      unAuthorizedRequest: false,
    };
  }
}

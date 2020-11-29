/*
 * @Author: ZengJun
 * @Date: 2020-11-15 15:38:26
 * @LastEditors: ZengJun
 * @LastEditTime: 2020-11-29 18:00:50
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
    console.log('insert');
    input.id = UUID.UUID(); // 自动生成ID
    const res = this.localStorageService.get('product', []);
    res.push(input);
    this.localStorageService.set('product', res);
    return {
      data: res,
      success: true,
    };
    
  }

  async getList(index:number,size:number):Promise<AjaxResult>{
    console.log('getList');
    if (index < 0) {
      // 实际开发中应抛出异常类对象
      throw new Error('分页的索引应大于等于零');
    }
    if (size <= 0) {
      // 实际开发中应抛出异常类对象
      throw new Error('每页显示的记录数应大于零');
    }
    const products:any[] = this.localStorageService.get("Product",'');
    const list = products.slice(index*size,(index+1)*size);
    const data = {
      total:products.length,
      list:list
    }
    
    return new AjaxResult(false,
      data);
  }

  // getListByCategoryId(index: number, size: number, categoryId: number): Promise<AjaxResult> {
  //   return ;
  // }

  /**
   * 根据条件查找商品列表
   * @param {number} index
   * @param size
   * @param input
   * @returns {Promise<AjaxResult>}
   */
  async getListByCondition(index: number, size: 10, input: any): Promise<AjaxResult> {
    console.log('getListByCondition');
    const productlist = this.localStorageService.get('product', []);
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

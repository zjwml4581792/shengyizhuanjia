/*
 * @Author: ZengJun
 * @Date: 2020-11-21 19:38:36
 * @LastEditors: ZengJun
 * @LastEditTime: 2020-11-21 19:40:30
 * @Description: 供应商服务
 */
import { Injectable } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { AjaxResult } from 'src/app/shared/class/ajax-result';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { Supply } from './Supply';

@Injectable({
  providedIn: 'root'
})
export class SupplyService {

  constructor(private localStorageService:LocalStorageService) { }

  /**
   * 添加供应商
   * @param {Supply} supply
   * @returns {Promise<AjaxResult>}
   */
  async insert(supply: Supply): Promise<AjaxResult> {
    supply.id = UUID.UUID();
    let tmp = this.localStorageService.get('Supply', []);
    tmp.push(supply);
    this.localStorageService.set('Supply', tmp);
    return {
      targetUrl: '',
      data: tmp,
      success: true,
      error: null,
      unAuthorizedRequest: false,
    };
  }
  async getAll(): Promise<AjaxResult>{
    const tmp = this.localStorageService.get('Supply', []);
    return {
      targetUrl: '',
      data: tmp,
      success: true,
      error: null,
      unAuthorizedRequest: false,
    };
  }
}

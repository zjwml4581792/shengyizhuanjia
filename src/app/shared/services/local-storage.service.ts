/*
 * @Author: ZengJun
 * @DateTime: 2020-10-31 18:56:49
 * @LastEditors: ZengJun
 * @LastEditTime: 2020-11-30 00:27:44
 * @Description: 
 */
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private storage: any = window.localStorage;
  public LOGIN_TIME: string = 'loginTime';
  public OUT_TIME: string = 'outTime';
  public USER: string = 'user';
  public TUSER:string = 'TUser';
  public TLOGINACCOUNT = 'TLoginAccount';
  public PRODUCT:string = 'product';
  
  constructor() { }
  /**
   * 获取本地存储
   * @param key 键名
   * @param defaultValue 默认值
   */
  get(key: string, defaultValue: any): any {
    let value = this.storage.getItem(key);
    try{
      value = JSON.parse(value);
    } catch (error) {
      value = null;
    }
    if (value === null && defaultValue) {
      value = defaultValue;
    }
    return value;
  }

  set(key: string, value: any) {
    if(key){
      this.storage.setItem(key,JSON.stringify(value));
    }
    
  }

  remove(key: string) {
    if(key){
      this.storage.removeItem(key);
    }else{
      console.log('remove\'key is null');
    }
  }
}

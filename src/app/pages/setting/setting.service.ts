/*
 * @Author: ZengJun
 * @Date: 2020-11-08 13:29:14
 * @LastEditors: ZengJun
 * @LastEditTime: 2020-11-13 18:22:40
 * @Description: 
 */
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class SettingService {
  user:any = {};
  constructor(private localStorageService:LocalStorageService) {
    try{
      this.user = this.localStorageService.get(this.localStorageService.USER,"");
    }catch(e){
      console.log(e);
    }
  }

  load(){
    
  }

  getUser(){
    return this.user;
  }
}

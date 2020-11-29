/*
 * @Author: ZengJun
 * @Date: 2020-10-25 16:06:21
 * @LastEditors: ZengJun
 * @LastEditTime: 2020-11-13 18:25:04
 * @Description: 密码相关服务
 */
import { Injectable } from '@angular/core';
import { AjaxResult } from 'src/app/shared/class/ajax-result';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { Signup } from './signup/signup';

@Injectable({
  providedIn: 'root'
})
export class PassportService {

  constructor(private localStorageService:LocalStorageService) { }
  /**
   * 注册添加用户方法
   * @param signup 
   */
  async addUser(signup:Signup){
    let users: User[];
    users = this.localStorageService.get('TUser',[]);
    const user = {
      id:users.length+1,
      shopName:signup.shopName,
      phone:signup.phone,
      email:signup.email,
      createTime:new Date()
    };
    users.push(user);
    this.localStorageService.set('TUser',users);

    let accounts:LoginAccount[];
    
    accounts = this.localStorageService.get('TLoginAccount',[]);
    let account = {
      userId:accounts.length+1,
      identifier: signup.email,
      credential: signup.password
    }
    accounts.push(account);
    // accounts.push({
    //   userId:1,
    //   identifier:signup.phone,
    //   credential:signup.password
    // });
    this.localStorageService.set('TLoginAccount',accounts);
    return new AjaxResult(true,null);
  }

  isUniquePhone(phone:string){
    let users = this.localStorageService.get('TUser',[]);
    for(let i=0;i<users.length;i++){
      if(users[i].phone==phone){
        return new AjaxResult(false,null,{message:'您的手机号码已经被注册'});
      }
    }
    return new AjaxResult(true,null,{message:'您的手机号码可以注册!'});
  }
  /**
   * 登录方法
   * @param phoneOrEmain 手机号或者邮箱
   * @param password 密码
   */
  async login(phoneOrEmain:string, password:string):Promise<AjaxResult>{
    let user;
    let loginflag = false;
    const users = this.localStorageService.get(this.localStorageService.TUSER, '');
    const accounts = this.localStorageService.get(this.localStorageService.TLOGINACCOUNT,'');
    //循环判断登录帐号和密码
    for(let i =0;i<users.length;i++){
      if(users[i].email == phoneOrEmain){
        if(accounts[i].credential == password){
          user=users[i];
          loginflag = true;
        }
      }
      if(users[i].phone == phoneOrEmain){
        user=users[i];
        if(accounts[i].credential == password){
          loginflag = true;
        }
      }
    }
    //判断是否登录成功
    if(loginflag){
      //登录成功记录登录时间和过期时间
      const loginTime = new Date(+ new Date() + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
      const outTime = new Date(+ new Date() + 8 * 3600 * 1000+5*24* 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
      this.localStorageService.set(this.localStorageService.LOGIN_TIME, loginTime);
      this.localStorageService.set(this.localStorageService.OUT_TIME, outTime);
      this.localStorageService.set(this.localStorageService.USER, user);
      return new AjaxResult(true,null,{message:'登录成功'});
    }else{
      return new AjaxResult(false,null,{message:'用户名或者密码不正确'});
    }
  }
}

export interface User{
  id:number;
  phone:string;
  email:string;
  createTime:Date;
  shopName:string;
}

export interface LoginAccount{
  userId: number;
  identifier:string;
  credential:string;
}
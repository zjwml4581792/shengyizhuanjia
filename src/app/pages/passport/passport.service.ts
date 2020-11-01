/*
 * @Author: ZengJun
 * @DateTime: 2020-10-25 16:06:21
 * @LastEditors: ZengJun
 * @LastEditTime: 2020-10-31 22:17:49
 * @Description: 
 */
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { Signup } from './signup/signup';

@Injectable({
  providedIn: 'root'
})
export class PassportService {

  constructor(private localStorageService:LocalStorageService) { }

  public addUser(signup:Signup): boolean{
    let users: User[];
    users = this.localStorageService.get('TUser',[]);
    const user = {
      id:users.length+1,
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
    return true;
  }

  isUniquePhone(phone:string){
    let users = this.localStorageService.get('TUser',[]);
    for(let i=0;i<users.length;i++){
      if(users[i].phone==phone){
        return false;
      }
    }
    return true;
  }
}

export interface User{
  id:number;
  phone:string;
  email:string;
  createTime:Date;
}

export interface LoginAccount{
  userId: number;
  identifier:string;
  credential:string;
}
/*
 * @Author: ZengJun
 * @Date: 2020-10-18 15:43:17
 * @LastEditors: ZengJun
 * @LastEditTime: 2020-11-14 22:38:34
 * @Description: 
 */
import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {LocalStorageService} from '../shared/services/local-storage.service';
import {APP_KEY} from '../pages/welcome/welcome.page';
// import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StartAppGuard implements CanActivate {

  constructor(private localStorageService: LocalStorageService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const appConfig: any = this.localStorageService.get(APP_KEY, {
      launched: false,
      version: '1.0.0'
    });
    //如果未启
    if ( appConfig.launched === false ) {
      appConfig.launched = true;
      this.localStorageService.set(APP_KEY, appConfig);
      return true;
    } else {
      //如果已启动
      const loginTime = new Date(+ new Date() + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
      //如果本次启动时间超过过期时间
      if(loginTime>this.localStorageService.get(this.localStorageService.OUT_TIME,'')){
        this.localStorageService.remove(this.localStorageService.LOGIN_TIME);
        this.localStorageService.remove(this.localStorageService.OUT_TIME);
        this.localStorageService.remove(this.localStorageService.USER);
        this.router.navigateByUrl('/passport/login');
      }else{
        //如果本次启动时间未超过过期时间
        const outTime = new Date(+ new Date() + 8 * 3600 * 1000+5*24* 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
        this.localStorageService.set(this.localStorageService.LOGIN_TIME, loginTime);
        this.localStorageService.set(this.localStorageService.OUT_TIME, outTime);
        this.router.navigateByUrl('home');
      }
      // if(this.localStorageService.get('loginTime', {
      //   launched: false,
      //   version: '1.0.0'
      // }))
      
      return false;
    }
  }
}
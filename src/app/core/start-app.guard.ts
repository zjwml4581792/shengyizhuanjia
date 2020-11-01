import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {LocalStorageService} from '../shared/services/local-storage.service';
import {APP_KEY} from '../pages/welcome/welcome.page';

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
    if ( appConfig.launched === false ) {
      appConfig.launched = true;
      this.localStorageService.set(APP_KEY, appConfig);
      return true;
    } else {
      this.router.navigateByUrl('folder/hello');
      return false;
    }
  }
}
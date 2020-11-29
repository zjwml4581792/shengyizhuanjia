/*
 * @Author: ZengJun
 * @Date: 2020-10-13 01:40:31
 * @LastEditors: ZengJun
 * @LastEditTime: 2020-11-29 17:29:25
 * @Description: 
 */
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

  // enableProdMode();
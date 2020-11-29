/*
 * @Author: ZengJun
 * @Date: 2020-10-13 01:40:31
 * @LastEditors: ZengJun
 * @LastEditTime: 2020-11-29 19:17:36
 * @Description: 
 */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { LocalStorageService } from './shared/services/local-storage.service';
import { CoreModule } from './core/core.module';
import { StartAppGuard } from './core/start-app.guard';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { ImagePicker } from '@ionic-native/image-picker';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    FormsModule,
    CommonModule,
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    SharedModule,
    CoreModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    Camera,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    LocalStorageService,
    StartAppGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

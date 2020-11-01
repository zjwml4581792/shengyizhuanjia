import { NgModule } from '@angular/core';

import { WelcomePageRoutingModule } from './welcome-routing.module';

import { WelcomePage } from './welcome.page';
import { SharedModule } from './../../shared/shared.module';

@NgModule({
  imports: [
    WelcomePageRoutingModule,
    SharedModule
  ],
  declarations: [WelcomePage]
})
export class WelcomePageModule {}

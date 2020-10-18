import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from './services/local-storage.service';



@NgModule({
  declarations: [],
  providers:[
    LocalStorageService
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }

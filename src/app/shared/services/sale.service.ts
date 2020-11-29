/*
 * @Author: ZengJun
 * @Date: 2020-11-07 19:33:39
 * @LastEditors: ZengJun
 * @LastEditTime: 2020-11-07 20:34:30
 * @Description: 
 */
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  constructor() { }
  getSales(): number {
    return (Math.random() * (1000));
  }
}

/*
 * @Author: ZengJun
 * @Date: 2020-11-01 15:04:56
 * @LastEditors: ZengJun
 * @LastEditTime: 2020-11-07 17:02:43
 * @Description: 
 */
import { Component, Input, OnInit } from '@angular/core';

@Component({
  //这边要改
  selector: 'zj-copyright',
  templateUrl: './copyright.component.html',
  styleUrls: ['./copyright.component.scss'],
})
export class CopyrightComponent implements OnInit {
  //距离底部多少
  @Input() bottom:string;
  text:string;
  constructor() {
    let year = (new Date()).getFullYear();
    this.text = `2010-${year} 生意专家`;
    this.bottom = '10px';
  }

  ngOnInit() {}

}

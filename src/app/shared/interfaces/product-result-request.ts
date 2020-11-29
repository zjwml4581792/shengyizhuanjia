import { PageRequest } from './page-request';
import { SourtedRequest } from './sorted-request';

/*
 * @Author: ZengJun
 * @Date: 2020-11-22 16:04:16
 * @LastEditors: ZengJun
 * @LastEditTime: 2020-11-22 16:04:42
 * @Description: 
 */
export interface ProductResultRequest extends PageRequest, SourtedRequest{
    searchText?:string;
    searchCategoryId?:number;
}
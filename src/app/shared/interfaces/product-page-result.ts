/*
 * @Author: ZengJun
 * @Date: 2020-11-22 14:39:05
 * @LastEditors: ZengJun
 * @LastEditTime: 2020-11-29 23:34:19
 * @Description: 
 */
import { Product } from 'src/app/pages/product/product/product';

/*
 * @Author: ZengJun
 * @Date: 2020-11-22 14:39:05
 * @LastEditors: ZengJun
 * @LastEditTime: 2020-11-22 14:39:14
 * @Description: 
 */
export interface ProductPageResult {
    totalCount: number;
    products: Product[];
  }
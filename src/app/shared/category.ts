/*
 * @Author: ZengJun
 * @Date: 2020-11-08 15:35:21
 * @LastEditors: ZengJun
 * @LastEditTime: 2020-11-21 01:36:40
 * @Description: 
 */
export interface Category {
    id: number,
    name: string,
    children: Array<Category>
}
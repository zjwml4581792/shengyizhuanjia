/*
 * @Author: ZengJun
 * @Date: 2020-11-15 15:36:18
 * @LastEditors: ZengJun
 * @LastEditTime: 2020-11-21 20:24:06
 * @Description: 
 */
export class Product {
    id: string;
    name: string;
    categoryId: number;
    categoryName: string;
    category: any;
    barcode: string;
    images: string[];
    price: number;
    purchasePrice: number; // 进价
    inventory: number; // 库存
    supplier: any; // 供货商
    standard: string; // 规格
    remark: string;
}
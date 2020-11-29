/*
 * @Author: ZengJun
 * @Date: 2020-11-01 13:28:27
 * @LastEditors: ZengJun
 * @LastEditTime: 2020-11-08 15:39:03
 * @Description: 
 */
export class AjaxResult {
    constructor(
        public success: boolean,
        //20年result改成data
        public data: any,
        public error?: { message: string; details?: string; },
        public targetUrl?: string,
        public unAuthorizedRequest?: boolean) {
    }
}

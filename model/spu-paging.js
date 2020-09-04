/**
 *Created by zyt on 2020/9/3.
 **/
import {Paging} from "../utils/paging";

export class SpuPaging{
    static getLatestPaging(){
        return new Paging({
            url:`spu/latest`
        },3)
    }
}
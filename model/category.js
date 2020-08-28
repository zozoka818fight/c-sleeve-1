/**
 *Created by zyt on 2020/8/28.
 **/
import {Http} from "../utils/http";

export class Category{
    static async getGridCategory(){
        return await Http.request({
            url:`category/grid/all`
        })
    }
}


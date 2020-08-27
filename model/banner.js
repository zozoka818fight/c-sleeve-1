/**
 *Created by zyt on 2020/7/26.
 **/
import {Http} from "../utils/http";

export class Banner {
    static locationB ='b-1'
    static async getHomeLocationB(){
        return await Http.request({
            url:`banner/name/${Banner.locationB}`
        })
    }
}
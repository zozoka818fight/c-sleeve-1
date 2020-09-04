/**
 *Created by zyt on 2020/9/3.
 **/

import {Http} from "./http";
import boolean from "../miniprogram_npm/lin-ui/common/async-validator/validator/boolean";

export class Paging{

    start
    count
    req
    locker =false
    url
    moreData = true
    accumulator=[]

    constructor(req,count=10,start=0) {
        this.start = start
        this.count = count
        this.req = req
        this.url =req.url
    }

    async getMoreData() {
        //生成器 Generator
        if(!this.moreData){
            return
        }
        if (!this._getLocker()) {
            return
        }
        //获取数据
        const data = await this._actualGetData()
        this._releaseLocker()
        return data
    }

    async _actualGetData(){
        const req =this._getCurrentReq()
        //调用请求
        let paging =await Http.request(req)
        if (!paging){
            return null
        }
        if(paging.total === 0){
            return {
                empty:true,
                items:[],
                moreData:false,
                accumulator:[]
            }
        }
        this.moreData = Paging._moreData(paging.total_page,paging.page)
        if(this.moreData){
            this.start += this.count
        }
        this._accumnlator(paging.items)

        return {
            empty: false,
            items: paging.items,
            moreData: this.moreData,
            accumulator: this.accumulator
        }

    }

    _accumnlator(items){
        this.accumulator=this.accumulator.concat(items)
    }

    static _moreData(totalPage,pageNum){
        return pageNum < totalPage -1
    }

    _getCurrentReq(){
        let url =this.url
        const params = `start=${this.start}&count=${this.count}`
        if(url.includes('?')){
            url += '&' + params
        }else{
            url += '?' + params
        }
        this.req.url = url
        return this.req

    }


    _getLocker(){
        if(this.locker){
            return false
        }
        this.locker = true
        return true
    }

    _releaseLocker(){
        this.locker = false
    }

}
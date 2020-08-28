import {Http} from "../utils/http";

/**
 *Created by zyt on 2020/7/5.
 **/
//业务对象
//

export class Theme {
    static async getHomeLocationA() {
        return await Http.request({
            url: 'theme/by/names',
            data: {
                names: 't-1'
            },
        })
    }
}



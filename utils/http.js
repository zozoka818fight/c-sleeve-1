import {config} from "../config/config";
import {promisic} from "../miniprogram_npm/lin-ui/utils/util";

/**
 *Created by zyt on 2020/7/5.
 **/
export class Http {
    static async request({url, data, method = 'GET',
                         }) {
        const res = await promisic(wx.request)({
            url: `${config.apiBaseUrl}${url}`,
            data,
            method,
            header: {
                appkey: config.appkey
            },
        })
        return res.data
    }
}


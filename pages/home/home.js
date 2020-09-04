// pages/home/home.js
import {Theme} from "../../model/theme";
import {Banner} from "../../model/banner";
import {Category} from "../../model/category";
import {Activity} from "../../model/activity";
import {SpuPaging} from "../../model/spu-paging";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    themeA:null,
    bannerB:null,
    grid:[],
    activityD:null,
    themeE:null,
    themeF:null,
    bannerG:null,
    themeH:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
     await this.initAllData();
     await this.initBottomSpuList();
  },

  async initBottomSpuList(){
    const paging =await SpuPaging.getLatestPaging()
    const data =await paging.getMoreData()
    if(!data){
      return
    }
    //lin-ui调用瀑布流
    wx.lin.renderWaterFlow(data.items)
  },

  async initAllData(){
    // const themeA = await Theme.getHomeLocationA()
    const theme =new Theme();
    await theme.getThemes()

    const themeA =theme.getHomeLocationA()
    const themeE =theme.getHomeLocationE()
    const themeF =theme.getHomeLocationF()
    const themeH =theme.getHomeLocationH()
    let themeESpu = []
    if(themeE.online){
      const data = await Theme.getHomeLocationESpu()
      if (data){
        themeESpu=data.spu_list.slice(0,8)
      }
    }

    const bannerB =await Banner.getHomeLocationB()
    const grid = await Category.getHomeLocationC()
    const activityD = await Activity.getHomeLocationD()
    const bannerG =await Banner.getHomeLocationG()

    this.setData({
      themeA,
      bannerB,
      activityD,
      themeE,
      themeESpu,
      grid,
      themeF,
      bannerG,
      themeH
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
// pages/home/home.js
import {
  $wuxSelect
} from '../../dist/index'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      '../src/home-menu.jpg',
      '../src/baking-teaching.jpg',
      '../src/crayfish.jpg'
    ],
    indicatorDots: false,
    autoplay: false,
    current: 0,
    clickIndex: 0,
    interval: 5000,
    duration: 1000,
    clickData: [],
    topList: [],
    value1: '本周TOP10',
    title1: '本周TOP10',
    bannerIndex: ['家常菜', '烘焙', '小龙虾'],
    scrollTop: 0,
  },
  onClick1() {
    $wuxSelect('#wux-select1').open({
      value: this.data.value1,
      options: [
        '本周TOP10',
        '本月TOP10',
        '本年TOP10',
      ],
      onConfirm: (value, index, options) => {
        console.log('onConfirm', value, index, options)
        if (index !== -1) {
          index == 0 ? this.getApiCategoryData(226, 10) : (index == 1 ? this.getApiCategoryData(571, 10) : this.getApiCategoryData(597, 10));
          this.setData({
            value1: value,
            title1: options[index],
          })
        }
      },
    })
  },
  onClickImg: function(event) {
    wx.showLoading({
      title: '加载中',
    })
    this.getApiSearchData(event.currentTarget.dataset.gid.toString());
    console.log(event.currentTarget.dataset.gid.toString());
  },
  change: function(e) {
    this.setData({
      current: e.detail.current
    })
  },
  swipclick: function(e) {
    wx.showLoading({
      title: '加载中',
    })
    this.getApiSearchData(this.data.bannerIndex[this.data.current]);
  },
  onClickMeals: function() {
    this.getApiCategoryData(563, 50)
  },
  onClickBest: function() {
    this.getApiCategoryData(572, 50)
  },
  getApiCategoryData: function(id, num) {
    let _this = this;
    wx.request({
      url: 'https://api.jisuapi.com/recipe/byclass',
      data: {
        classid: id,
        start: 0,
        num,
        appkey: '92b3d4b54dc3a40c'
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (num != 10) {
          getApp().globalData.searchData = res.data.result.list
          wx.navigateTo({
            url: '/pages/searchResults/searchResults'
          })
        } else {
          res.data.result.list.forEach(i => {
            let tags = i.tag.split(',');
            tags.indexOf('年夜饭') > -1 ? tags.splice(tags.indexOf('年夜饭'), 1) : (tags.indexOf('粤菜') > -1 ? tags.splice(tags.indexOf('粤菜'), 1) : tags.splice(tags.indexOf('二人世界'), 1));
            i.tag = tags
          });
          _this.setData({
            topList: res.data.result.list
          }, () => wx.hideLoading())
        }
      }
    })
  },
  getApiSearchData: function(keyWord) {
    wx.request({
      url: 'https://api.jisuapi.com/recipe/search',
      data: {
        keyword: keyWord,
        num: 50,
        appkey: '92b3d4b54dc3a40c'
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        wx.hideLoading()
        getApp().globalData.searchData = res.data.result.list
        wx.navigateTo({
          url: '/pages/searchResults/searchResults'
        })
      }
    })
  },
  changeIndicatorDots: function(e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function(e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function(e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function(e) {
    this.setData({
      duration: e.detail.value
    })
  },
  onChickAll: function(e) {
    wx.switchTab({
      url: '/pages/classify/classify'
    })
  },
  openSeach: function(e) {
    wx.navigateTo({
      url: '/pages/search/search'
    })
  },
  onBoxClick: function(e) {
    this.setData({
      clickIndex: e.currentTarget.dataset.clickindex
    }, () => wx.navigateTo({
      url: '/pages/foodInfo/foodInfo'
    }))
    getApp().globalData.clickFood = this.data.topList[e.currentTarget.dataset.clickindex]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中',
    })
    this.getApiCategoryData(226, 10);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
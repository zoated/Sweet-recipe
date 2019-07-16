// pages/foodInfo/foodInfo.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    clickData: [],
    likeData: [],
  },

  getApiSearchData: function(keyWord) {
    let _this = this;
    wx.request({
      url: 'https://api.jisuapi.com/recipe/search',
      data: {
        keyword: keyWord,
        num: 3,
        appkey: '92b3d4b54dc3a40c'
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        debugger
        _this.setData({
          likeData: res.data.result.list
        })
      }
    })
  },
  onClickLike: function(e) {
    getApp().globalData.clickFood = this.data.likeData[e.currentTarget.dataset.gid]
    wx.navigateTo({
      url: '/pages/foodInfo/foodInfo'
    })
  },
  onClickAll: function (){
    wx.request({
      url: 'https://api.jisuapi.com/recipe/search',
      data: {
        keyword: app.globalData.clickFood.name.slice(-2),
        num: 50,
        appkey: '92b3d4b54dc3a40c'
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        getApp().globalData.searchData = res.data.result.list
        wx.navigateTo({
          url: '/pages/searchResults/searchResults'
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    app.globalData.clickFood.content = app.globalData.clickFood.content.replace(/[\'\"\\\/\b<br>\f\n\r\t]/g, '');
    app.globalData.clickFood.process = app.globalData.clickFood.process.map(i => {
      return ({
        pcontent: i.pcontent.replace(/[\'\"\\\/\b<br>\f\n\r\t]/g, ''),
        pic: i.pic
      })
    });
    console.log(app.globalData.clickFood)
    this.setData({
      clickData: app.globalData.clickFood
    });
    this.getApiSearchData(app.globalData.clickFood.name.slice(-2));
    wx.setNavigationBarTitle({
      title: app.globalData.clickFood.name
    })
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
    console.log(this.app)

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
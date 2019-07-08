// pages/home/home.js
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
    interval: 5000,
    duration: 1000,
    animationData: {},
    animationData2: {},
    bannerIndex: ['香芋蒸排骨','宫保鸡丁','干烧黄花鱼']
  },
  change: function(e){
    this.setData({
      current: e.detail.current
    })
  },
  swipclick: function(e){
    wx.request({
      url: 'http://apis.juhe.cn/cook/query.php',
      data: {
        menu: this.data.bannerIndex[this.data.current],
        key: 'cc2c336e5d6ba320bb10ee365e273036'
      },
      method :'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
      }
    })
  },
  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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
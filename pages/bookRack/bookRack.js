// pages/bookRack/bookRack.js
import utils from '../../utils/utils'
import api from '../../http/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    animation: '',
    anima: false,
    data: '',
    url: api.STATIC_HOST,
    show: false
  },
  // 去帮助
  gohelf() {
    // 非底部导航栏跳转
    wx.navigateTo({
      url: '/pages/terms/terms',
    })
  },
  /**
   * 旋转
   */
  // 动画效果
  rotate() {
    this.setData({
      //输出动画
      show: !this.data.show
    })
    // this.setData({
    //   anima: !this.data.anima,
    //   //输出动画
    //   animation: '',
    //   show: !this.data.show
    // })
    // if (this.data.anima) {
    //   console.log(11)
    //   //实例化一个动画
    //   this.animation = wx.createAnimation({
    //     // 动画持续时间，单位ms，默认值 400
    //     delay: 0,
    //     duration: 2000,
    //     timingFunction: 'linear',
    //     transformOrigin: '%50 %50  0',
    //   })

    //   // 建立标识(用于循环)
    //   var next = true;
    //   // 持续动画
    //   setInterval(() => {
    //     if (next) {
    //       this.animation.rotate(2).rotate(0).rotate(-2).step()
    //       this.animation.rotate(-2).rotate(0).rotate(2).step()
    //       next = !next
    //     } else {
    //       this.animation.rotate(2).rotate(0).rotate(-2).step()
    //       this.animation.rotate(-2).rotate(0).rotate(2).step()
    //       next = !next
    //     }
    //     this.setData({
    //       //输出动画
    //       animation: this.animation.export()
    //     })
    //   }, 2000);
    // } else {
    //   console.log(222)
    //   this.setData({
    //     //输出动画
    //     animation: this.animation.export()
    //   })
    //   this.animation = wx.createAnimation({
    //     // 动画持续时间，单位ms，默认值 400
    //     delay: 0,
    //     duration: 0,
    //     timingFunction: 'linear',
    //     transformOrigin: '%50 %50  0',
    //   })
    // }

  },
  // 删除书籍
  delBook(e) {
    let book = e.currentTarget.dataset.item
    console.log(e.currentTarget.dataset.item)
    // 删除记录
    utils.delHistoryOne({
      key: 'rack',
      value: book,
      id: '_id'
    })
    this.setData({
      data: utils.getHistory(
        'rack'
      )
    })
  },
  // 去详情
  click(e) {
    // console.log(e.currentTarget.dataset.item)
    wx.navigateTo({
      url: '/pages/details/details',
    })
    wx.setStorageSync('details', e.currentTarget.dataset.item)
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
    this.setData({
      data: utils.getHistory("rack")
    })
    // console.log(this.data.data)
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
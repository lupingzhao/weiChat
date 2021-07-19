// pages/racking/racking.js
import api from '../../http/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ranking:"",
    list: null,
    title: '',
    active: 0,
    id: ''
  },
  // 标题点击事件
  switch (e) {
    this.setData({
      id: this.data.ranking[e.currentTarget.dataset.index],
      active: e.currentTarget.dataset.index
    })
    this.rack() 
  },
  // 排行接口
  rack() {
    api.rank.rankInfo(this.data.id).then(res => {
      console.log(res)
      if (res.ok) {
        this.setData({
          list: res.ranking.books,
          title: ['周榜', '月榜', '总榜']
        })
      }
    }).catch()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: wx.getStorageSync('key')[1]
    })
    this.setData({
      id: wx.getStorageSync('key')[0]
    })
    api.rank.rankInfo(this.data.id).then(res => {  
      if (res.ok) {
        this.setData({
          ranking:[res.ranking.id,res.ranking.monthRank,res.ranking.totalRank],
          list: res.ranking.books,
          title: ['周榜', '月榜', '总榜']
        })
      }
      if(!res.ranking.monthRank&&!res.ranking.totalRank){
        this.setData({
          title: ''
        })
      }
      console.log(this.data.ranking)
    }).catch()

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
  onShareAppMessage: function () {}
})
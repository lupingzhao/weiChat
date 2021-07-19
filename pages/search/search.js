// pages/search/search.js
import api from '../../http/api'
import utils from '../../utils/utils'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    close: true,
    true1: true,
    // 输入框的值
    value: '',
    // 搜索结果
    list: [],
  },
  // 点击搜索历史
// 子组件传递的数据
  send(e) {
    this.setData({
      value: e.detail
    })
    this.search()
  },
  // 搜索接口
  search() {
    // 输入值不为空
    if (this.data.value) {
      this.setData({
        close: false,
        show: false
      })
      api.book.bookSearch(this.data.value).then(res => {
        this.setData({
          list: res.books
        })
        // console.log(this.data.list)
      }).catch()
      // 存搜索记录
      utils.saveHistory({
        key: 'search',
        data: this.data.value,
      })
    } else {
      this.setData({
        close: true,
        show: true,
        searchHistroy: utils.getHistory('search')
      })
    }
  },
  // 清除输入框的值
  delValue() {
    this.setData({
      value: '',
      close: true,
      show: true,
      list: '',
      searchHistroy: utils.getHistory('search')
    })
  },

  // 监听输入框的值
  bindKeyInput(e) {
    this.setData({
      value: e.detail.value
    })
    if (!e.detail.value) {
      this.setData({
        close: true,
        show: true,
        searchHistroy: utils.getHistory('search')
      })

    } else {
      this.search()
    }

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
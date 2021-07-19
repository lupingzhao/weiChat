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
    // 热词
    hot: null,
    // 随机数组
    a: [],
    searchHistroy: null
  },
  // 生成随机数的方法
  random() {
    let rgb = []
    for (let i = 0; i < 8; i++) {
      rgb.push([Math.floor(Math.random() * 255), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)])
    }
    this.setData({
      a: rgb
    })
  },
  // 热词点击
  hotword(e) {
    wx.navigateTo({
      url: '/pages/details/details',
    })
    console.log(e.currentTarget.dataset.id)
    wx.setStorageSync('details', e.currentTarget.dataset.id)
  },
  // 热搜词
  hot() {
    // 热搜词
    api.book.hotWord().then(res => {
      // console.log(res.newHotWords)
      this.setData({
        hot: res.newHotWords
      })
    }).catch()
  },
  // 换一换
  change() {
    // 生成随机数
    let a = Math.floor(Math.random() * this.data.hot.length)
    if (this.data.hot.length > 1) {
      this.setData({
        hot: this.data.hot.slice(a)
      })
    } else {
      this.hot()
    }
  },
  // 点击搜索历史
  searchHistroy(e) {
    // console.log(e.currentTarget.dataset.item)
    this.setData({
      value: e.currentTarget.dataset.item
    })
    this.search()
  },
  //删除单个历史
  delSingle(e) {
    let index = e.currentTarget.dataset.index
    utils.delHistoryOne({
      key: 'search',
      value: index,
    })
    this.setData({
      searchHistroy: utils.getHistory('search')
    })
    // this.setData({searchHistroy:this.data.searchHistroy.splice(index,1)})

  },
  // 清空全部记录
  delAll() {
    console.log(2222)
    wx.removeStorageSync('searchHistory')
    this.setData({
      searchHistroy: utils.getHistory('search')
    })
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
  // 清楚输入框的值
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
  bindKeyInput: function (e) {
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
    this.hot()
    // 调用生成随机数
    this.random()
    // 获取搜索记录
    if (wx.getStorageSync('user')) {
      this.setData({
        searchHistroy: utils.getHistory('search')
      })
    }else{
      this.setData({
        searchHistroy: ''
      })
    }

    // console.log(this.data.searchHistroy)
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
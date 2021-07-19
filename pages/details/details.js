// pages/details/details.js
import api from '../../http/api'
import utils from '../../utils/utils'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    add: '加入书架',
    add1: false,
    sum: 5,
    title: ['详情', '评价(0)'],
    activeindex: 0,
    data: '',
    url: api.STATIC_HOST,
    // 全部推荐
    recommended: '',
    // 三个推荐
    recommendedBook: '',
    // 推荐id
    id: '',
    comment: [],
    show1: false,
    page: 1,
    total: 0
  },
  swictth(e) {
    this.setData({
      activeindex: e.currentTarget.dataset.index
    })
  },
  // 推荐去详情
  goDetails(e) {
    this.setData({
      id: e.currentTarget.dataset.item._id
    })
    this.one()

  },
  // 详情
  one() {
    // 书籍详情接口
    // 书籍详情接口
    api.book.bookInfo(this.data.id).then(res => {
      // console.log(res)
      this.setData({
        data: res,
      })
      wx.setNavigationBarTitle({
        title: res.title,
      })
      this.rateSum(res.rating.score)
      this.RecommendedBooks()
      this.comment()
    }).catch()
  },
  // 相关推荐
  RecommendedBooks() {
    api.book.relatedRecommendedBooks(this.data.id).then(res => {
      // console.log(res)
      this.setData({
        recommended: res.books
      })
      this.setData({
        recommendedBook: this.data.recommended.slice(0, 3)
      })
    }).catch()
  },
  // 评分
  rateSum(a) {
    // console.log( Math.ceil(a)/2)
    this.setData({
      sum: parseInt(Math.ceil(a) / 2)
    })
  },
  // 评价
  comment() {
    api.comment.shortReviews(this.data.id, this.data.page).then(res => {
      console.log(res)
      this.setData({
        comment: this.data.comment.concat(res.docs),
        total: res.total,
        title: ['详情', `评价(${res.total})`],
      })
    }).catch()
  },
  // 标签点击 加入书架
  click() {
    this.setData({
      add1: !this.data.add1
    })
    if (this.data.add1) {
      // 为真存
      utils.saveHistory({
        key: 'rack',
        data: this.data.data,
        attr: '_id'
      })
      this.setData({
        add: '已加入书架'
      })
    } else {
      // 删除记录
      utils.delHistoryOne({
        key: 'rack',
        value: this.data.data,
        id: '_id'
      })
      this.setData({
        add: '加入书架'
      })
    }

  },
  // 换一换
  change() {
    // 生成随机数
    let a = Math.floor(Math.random() * (this.data.recommended.length - 2))
    // console.log(this.data.recommended.slice(17, 20))
    this.setData({
      recommendedBook: this.data.recommended.slice(a, a + 3)
    })
  },
  // 保存图片到本地
  save(e) {
    // console.log(e.currentTarget.dataset.item)
    wx.showActionSheet({
      itemList: ['保存图片至本地'],
      success(res) {
        wx.downloadFile({
          url: e.currentTarget.dataset.item,
          success(res) {
            // console.log(res)
            wx.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
              success: (res) => {
                wx.showToast({
                  title: '已保存到相册',
                })
              },
              fail: (res) => {
                // console.log(res);
              }
            })
          }
        })
      },
      fail(res) {}
    })

  },
  // 遮罩层
  show1() {
    this.setData({
      show1: !this.data.show1
    })
  },
  // 评论触底 加载更多
  commentBottom(e) {
    if (this.data.activeindex === 1) {
      this.data.page++
      if (this.data.total >= this.data.comment.length) {
        this.comment()
      }
    }
  },
  // 判断是否已加入书架
  check() {
    let data = wx.getStorageSync('rackHistory')
    data.map(a => {
      if (a._id === this.data.id) {
        this.setData({
          add:'已加入书架',
          add1:true
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(wx.getStorageSync('details'))
    this.setData({
      id: wx.getStorageSync('details')
    })
    this.one()
    this.check()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},
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
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
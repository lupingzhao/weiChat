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
    data: '',
    url: api.STATIC_HOST,
    // 推荐id
    id: "",
    show1: false,
  },
  // 去阅读
  goRead() {
    wx.navigateTo({
      url: `/pages/read/read?name=${this.data.data.title}&id=${this.data.id}`,
    })
  },
  // 推荐去详情
  goDetails(e) {
    // console.log(e.detail)
    this.setData({
      id: e.detail
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
      // 检查是否已加入书架
      this.check()
      wx.setNavigationBarTitle({
        title: res.title,
      })
      this.rateSum(res.rating.score)

    }).catch()
  },
  // 评分
  rateSum(a) {
    // console.log( Math.ceil(a)/2)
    this.setData({
      sum: parseInt(Math.ceil(a) / 2)
    })
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
  // 判断是否已加入书架
  check() {
    let data = wx.getStorageSync('rackHistory')
    // let flag=false
    if(data.length>0){
      data.map(a => {
        if (a._id === this.data.id) {
          this.setData({
            add: '已加入书架',
            add1: true
          })  
        }else{
          this.setData({
            add: '加入书架',
            add1: false
          })  
        }
      })
    }
   
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
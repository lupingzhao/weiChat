// pages/categoryClassification/categoryClassification.js
import api from '../../http/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: [],
    list: null,
    // 小分类
    category1:['全部'],
    // 路由传递的值
    data1: null,
    typeList: null,
    categoryActive: 0,
    category1Active: 0,
    gender: null,
    type: null,
    major: null,
    minor: null,
    start: null,
    total: 0,
    msg: '',
  },
  getData() {
    // console.log(this.data.start)
    // 页面数据
    api.classification.getCatsBooks(this.data.gender, this.data.type, this.data.major, this.data.minor, this.data.start).then((res) => {   
        console.log(res)
        this.setData({
          data: this.data.data.concat(res.books),
          total: res.total
        })
        if (res.total === 0) {
          this.setData({
            msg: '暂无数据'
          })
        } else {
          if (this.data.data.length >= res.total) {
            this.setData({
              msg: '已加载完毕'
            })
          }
        }
        // console.log(this.data.data)
      })
      .catch()
  },
  // 大分类点击事件
  categoryActive(e) {
    // console.log(e.currentTarget.dataset.index)
    this.setData({
      categoryActive: e.currentTarget.dataset.index[1],
      data: [],
      type: e.currentTarget.dataset.index[0],
      msg:''
    })
    this.getData()
  },
  // 小分类点击事件
  category1Active(e) {
    // console.log(e.currentTarget.dataset.index)

    this.setData({
      category1Active: e.currentTarget.dataset.index,
      data: [],
      msg:''
      // minor: this.data.category1[this.data.category1Active],
    })
    if(e.currentTarget.dataset.index>0){
      this.setData({
        minor: this.data.category1[this.data.category1Active],
      })
    }else{
      this.setData({
        minor:'',
      })
    }
    // console.log(this.data.category1Active)/
    // 类型
    // console.log(this.data.type)
    // console.log(this.data.major)
    // console.log(this.data.minor)
    // console.log(this.data.start)
    this.getData()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 路由传参
    this.setData({
      data1: JSON.parse(options.data)
    })
        // 大小分类
        api.classification.getMinor().then(res => {
          // console.log(res)
          this.setData({
            list: [{
                title: 'male',
                data: res.male
              },
              {
                title: "female",
                data: res.female
              },
              {
                title: "press",
                data: res.press
              },
              {
                title: "picture",
                data: res.picture
              }
            ],
            typeList: [{
                id: 'hot',
                name: '热门'
              },
              {
                id: 'new',
                name: '新书'
              },
              {
                id: 'reputation',
                name: '好评'
              },
              {
                id: 'over',
                name: '完结'
              },
              {
                id: 'monthly',
                name: 'VIP'
              }
            ],
          })
          let index = this.data.data1.item
          // 获取详细的分类
          this.setData({
            category1: this.data.category1.concat(this.data.list[index[0]].data[index[2]].mins)
          })
          this.setData({
            // category1:this.data.category1.unshift('全部')
    
          })
          // 路由传递的数据 默认请求全部不传minor 为空
          this.setData({
            gender: this.data.list[index[0]].title,
            type: this.data.typeList[this.data.categoryActive].id,
            // 玄幻 上个页面传过来的大分类
            major: index[1],
            start: 1
          })
          // 导航栏标题
          wx.setNavigationBarTitle({
            title: index[1]
          })
          // 调用页面数据请求
          this.getData()
    
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
    // 导航栏loading
    wx.showNavigationBarLoading()
    this.getData()
    // 取消loading
    setTimeout(() => {
      wx.hideNavigationBarLoading()
      // 取消下拉刷新
      wx.stopPullDownRefresh()
    }, 2000)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.data.start++
    if (this.data.total > this.data.data.length) {
      this.getData()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
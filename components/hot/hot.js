// components/hot/hot.js
import api from '../../http/api'
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    // 热词
    hot: null,
    // 随机色
    a: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
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
    // 热词点击
    hotword(e) {
      wx.navigateTo({
        url: '/pages/details/details',
      })
      // console.log(e.currentTarget.dataset.id)
      wx.setStorageSync('details', e.currentTarget.dataset.id)
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
  },
  lifetimes: {
    ready() {
      this.hot()
      this.random()
    }
  }
})
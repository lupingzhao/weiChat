// components/goods/goods.js
import api from '../../http/api'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: Array
    },
    total: {
      type: Number
    },
    msg: {
      type: String,
    },
    true1:{
      type:Boolean,
      value:false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    imagesPath: api.STATIC_HOST,
    rgb:[],
    msg:"暂无数据"
  },

  /**
   * 组件的方法列表
   */
  methods: {
    click(e) {

      // console.log(e.currentTarget.dataset.item)
      wx.navigateTo({
        url: '/pages/details/details',
      })
      wx.setStorageSync('details', e.currentTarget.dataset.item)
    }
  },
  lifetimes: {     
    ready() {
      console.log(this.properties.list)
      // console.log(this.data.imagesPath)
      // 随机标签色
      let rgb = []
      for (let i = 0; i < 3; i++) {
        rgb.push([Math.floor(Math.random() * 255), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)])
      }
      this.setData({
        rgb: rgb
      })
    }
  }
})
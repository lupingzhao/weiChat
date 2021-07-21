// components/searchHistory/searchHistory.js
import utils from '../../utils/utils'
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
    searchHistroy: '',
    show:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击搜索历史
    searchHistroy(e) {
      // console.log(e.currentTarget.dataset.item)
      // 分发事件
      this.triggerEvent('send', e.currentTarget.dataset.item)

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
  },
  lifetimes: {
    ready() {
      // 获取搜索记录
      if (wx.getStorageSync('user')) {
        this.setData({
          searchHistroy: utils.getHistory('search'),
          show:true
        })
      } else {
        this.setData({
          searchHistroy: '',
          show:false

        })
      }
    }
  }
})
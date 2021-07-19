// components/cityChild/cityChild.js
// 引入 请求
import api from '../../http/api'

Component({
  /**
   * 组件的属性列表
   */
  // 接收从父组件传递的值
  properties: {
    activeindex: {
      type: Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    list: [],
    category: [],
    ranking:[],
    imagesPath:api.STATIC_HOST
  },

  /**
   * 组件的方法列表
   */
  methods: {
    categrory(e){
      wx.navigateTo({
        url: `/pages/categoryClassification/categoryClassification?data=${JSON.stringify(e.currentTarget.dataset)}`,
      })
    },
    // 排行点击事件
    rank(e){
      // console.log(e.currentTarget.dataset.item)
      wx.navigateTo({
        url: '/pages/racking/racking',
      })
      let rank=e.currentTarget.dataset.item
      wx.setStorageSync('key',  rank) 
     
    }
 
  },
  // 页面一进来就会加载
  lifetimes: {
    ready() {
      api.classification.getCats().then(res => {
          this.setData({
            list: [{
                title: '男生',
                data: res.male
              },
              {
                title: "女生",
                data: res.female
              },
              {
                title: "出版",
                data: res.press
              },
              {
                title: "玄幻",
                data: res.picture
              }
            ],
            category: res.press

          })
          // console.log(res)
        }).catch(),
        // 排行
        api.rank.rankCategory().then(res=>{
          // console.log(res)
          this.setData({
            ranking:[
              {
                name:'总排行',
                data:res.epub     
              },
              {
                name:'男生',
                data:res.male.slice(0,6)
              },
              {
                name:'女生',
                data:res.female.slice(0,6)   
              }
            ]
          })
        }).catch()
    }
  }
  
})

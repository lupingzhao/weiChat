// components/comments/comments.js
import api from '../../http/api'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    longIntro: {
      type: String
    },
    chaptersCount: {
      type: String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    page: 1,
    total: 0,
    comment: [],
    id: '',
    activeindex: 0,
    url: api.STATIC_HOST,
    // 全部推荐
    recommended: '',
    // 三个推荐
    recommendedBook: '',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    swictth(e) {
      this.setData({
        activeindex: e.currentTarget.dataset.index
      })
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

    // 评论触底 加载更多
    commentBottom(e) {
      if (this.data.activeindex === 1) {
        this.data.page++
        if (this.data.total >= this.data.comment.length) {
          this.comment()
        }
      }
    },
    // 评价
    comment() {
      api.comment.shortReviews(this.data.id, this.data.page).then(res => {
        this.setData({
          comment: this.data.comment.concat(res.docs),
          total: res.total,
          title: ['详情', `评价(${res.total})`],
        })
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
    // 推荐去详情
    goDetails(e) {
      this.setData({
        id: e.currentTarget.dataset.item._id,
        comment:[]
      })
      this.triggerEvent('goDetails', this.data.id)
      // 调评价
      this.comment()
      this.RecommendedBooks()
    },
  },
  lifetimes: {
    ready() {
      // console.log(this.data)
      this.setData({
        id: wx.getStorageSync('details')
      })
      this.comment()
      this.RecommendedBooks()
    }
  }

})
Page({
  data: {
    userInfo: '',
  },
  login() {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        let user = [res.userInfo.nickName, res.userInfo.avatarUrl]
        wx.setStorageSync('user', user)
        this.setData({
          userInfo: wx.getStorageSync('user')
        })
      }
    })


  },
  // 设置
  clrea() {
    let _this = this
    wx.showActionSheet({
      itemList: ['清楚缓存', '退出登陆'],
      success(res) {
        if (res.tapIndex === 0) {
          let data = ['details', 'searchHistory', 'rackHistory']
          data.map(a => {
            // console.log(a)
            wx.removeStorage({
              key: a,
            })
          })
        } else {
          wx.removeStorage({
            key: 'user',
          })
          _this.setData({
            userInfo: ""
          })
        }
      },
      fail(res) {}
    })
  },
  onLoad: function (options) {
    // this.setData({
    //   userInfo: wx.getStorageSync('user')
    // })
    // 页面初始化 options为页面跳转所带来的参数
    // 登陆
    // App({
    //   onLaunch: function () {
    //     wx.login({
    //       success: function (res) {
    //         if (res.code) {
    //           // console.log(res)
    //           //发起网络请求

    //           wx.request({
    //             // appid 小程序的唯一标识
    //             // 发起请求 将获取登陆的code传给微信官方
    //             url: `https://api.weixin.qq.com/sns/jscode2session?appid=wx9ba35d376585aa74
    //             &secret=b6a965c54eb3f07fe46287c733147865&js_code=${res.code}&grant_type=authorization_code`,

    //             // this.auth.code2Session
    //           })
    //         } else {
    //           console.log('获取用户登录态失败！' + res.errMsg)
    //         }
    //       }
    //     });
    //   }
    // })

  },
  onReady: function () {
    // 页面渲染完成

  },



  onShow: function () {
    // 页面显示
  
    this.setData({
      userInfo: wx.getStorageSync('user')
    })
    // console.log(wx.getStorageSync('user'))
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})
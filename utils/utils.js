// 封装公共的方法
export default {
  // 保存历史记录
  saveHistory({
    key,
    data,
    attr
  }) {
    // key是名字 data是保存的数据, 
    // attr是属性名 用来判断是否重复 属性名是一个字符串 不是变量
    //  让名字格式化
    let name = key + 'History'
    // 获取该名字的记录
    let history = wx.getStorageSync(name)
    // 无数据为null 或undefind
    // 存储获取到的值
    let stu;
    // 是否存在这个数据名 
    if (history) {
      //检测搜索记录存在时
      stu = wx.getStorageSync(name)
      // 将新数据加入
      stu.unshift(data);
    } else {
      //不存在时
      stu = []; //存储数据形式
      stu.unshift(data);
    }
    //是否有传判断参数进来
    if (attr) {
      const res = new Map();
      stu = stu.filter(stu => !res.has(stu[attr]) && res.set(stu[attr], 1))
    } else {
      stu = Array.from(new Set(stu))
    }
    // localStorage[name] = stuStr;
    wx.setStorageSync(name, stu)

  },

  // 删除单个记录
  delHistoryOne({
    key,
    value,
    // id判断额属性名是字符串
    id
  }) {
    // key 数据名 value 数据值 id判断额属性名是字符串
    let name = key + 'History'
    let   stu =wx.getStorageSync(name)
    if (stu) {
      if (id) {
        stu = stu.filter((a) => {
          return a[id] !== value[id];
        });
      } else {
        stu = stu.filter((a) => {
          return a !== value;
        });
      }
      if (stu.length === 0) {
        wx.removeStorageSync(name)
      } else {
        wx.setStorageSync(name, stu)
      }                                                                                                                             
    } else {
      return
    }
  },

  // 获取记录
  // key；储存的名字
  getHistory(
    key
  ) {
    let name = key + 'History'
    let arr = wx.getStorageSync(name)
    if (arr) return arr
    else return null
  },
}
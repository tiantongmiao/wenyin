// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    
  },
  // 事件处理函数
  onLoad() {
    
  },
  toIndex() {
    // 跳转至首页
    wx.switchTab({
      url: '/pages/center/index',
    })
  }
})

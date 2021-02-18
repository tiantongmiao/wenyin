// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    
  },
  // 事件处理函数
  toApply() {
    const url = '/pages/work/apply'
    wx.redirectTo({url})
  }
})

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
    console.log(1)
    wx.request({
      url: 'http://192.168.31.147:8089/pas/wx/login', //仅为示例，并非真实的接口地址
      method: 'POST',
      header: {
        //设置参数内容类型为x-www-form-urlencoded
        'content-type':'application/json',
        'Accept': 'application/json'
      },
      data: {
        loginName: '',
        password: ''
      },
      success (res) {
        console.log(res.data)
      }
    })
    // 跳转至首页
    // wx.switchTab({
    //   url: '/pages/center/index',
    // })
  },
  toRegister() {
    wx.navigateTo({
      url: '/pages/login/register',
    })
  }
})

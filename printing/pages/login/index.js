// index.js
// 获取应用实例
const app = getApp()
const ip = app.globalData.host
const path = ip + "/pas/wx"

Page({
    data: {
        loginName: '',
        password: ''
    },
    // 事件处理函数
    onLoad() {
    },
    bindNameInput(e) {
        this.setData({
            loginName: e.detail.value
        })
    },
    bindPassWordInput(e) {
        this.setData({
            password: e.detail.value
        })
    },
    toIndex() {
        wx.request({
            url: path + '/login',
            method: 'POST',
            header: {
                //设置参数内容类型为x-www-form-urlencoded
                'content-type': 'application/json',
                'Accept': 'application/json'
            },
            data: {
                loginName: this.data.loginName,
                password: this.data.password
            },
            success(res) {
                if (res.data.code == 0) {
                    // 跳转至首页
                    wx.switchTab({
                        url: '/pages/center/index',
                    })
                } else {
                    wx.showModal({
                        title: '登录失败',
                        content: res.data.msg,
                        showCancel: false
                    })
                }
            }
        })
    },
    toRegister() {
        wx.navigateTo({
            url: '/pages/login/register',
        })
    }
})

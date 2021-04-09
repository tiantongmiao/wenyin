// index.js
// 获取应用实例
import { wxPath, request, setCookie } from '../../utils/util'

Page({
    data: {
        loginName: 'director1',
        password: '11111'
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
        let this_ = this
        request({
            url: wxPath + '/login',
            method: 'POST',
            header: {
                //设置参数内容类型为x-www-form-urlencoded
                'content-type': 'application/json',
                'Accept': 'application/json'
            },
            data: {
                loginName: this.data.loginName,
                password: this.data.password
            }
        }).then(res => {
            if (res.code == 0) {
                setCookie('role', res.data.role)
                // 跳转至首页
                wx.switchTab({
                    url: '/pages/work/index',
                })
            } else {
                wx.showModal({
                    title: '登录失败',
                    content: res.msg,
                    showCancel: false
                })
            }
        })
    },
    toRegister() {
        wx.navigateTo({
            url: '/pages/login/register',
        })
    }
})

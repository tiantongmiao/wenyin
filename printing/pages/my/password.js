import { wxPath, path, request } from '../../utils/util'
Page({
    data: {
        sexs: ['请选择性别', '男', '女'],
        formData: {
            oldPassword: '',
            password: '',
            confirm: '',
        },
        show: true,
        rules: [
            {
                name: 'oldPassword',
                rules: { required: true, message: '旧密码必填' },
            }, 
            {
                name: 'password',
                rules: { required: true, message: '密码必填' },
            }, 
            {
                name: 'confirm',
                rules: { required: true, message: '确认密码必填' },
            }, 
        ]
    },
    // 事件处理函数
    onLoad() {
        wx.setNavigationBarTitle({
            title: '修改密码'
        });
        this.init();
    },
    changeCheck(e) {
        this.setData({
            show: !e.currentTarget.dataset.checked
        })
    },
    init() {
        request({
          url: wxPath + '/login-user-info',
          method: 'GET',
          header: {
              //设置参数内容类型为x-www-form-urlencoded
              'content-type': 'application/json',
              'Accept': 'application/json'
          },
          data: {
          }
        }).then(res => {
          if (res.code == 0) {
              // 跳转至首页
              this.setData({
                  userId: res.data.user.userId,
                  loginName: res.data.user.loginName,
              })
          } else {
              wx.showModal({
                  title: '操作失败',
                  content: res.msg,
                  showCancel: false
              })
          }
        })
      },
    formInputChange(e) {
        const { field } = e.currentTarget.dataset
        this.setData({
            [`formData.${field}`]: e.detail.value
        })
    },
    bindSexChange(e) {
        this.setData({
            [`formData.sex`]: e.detail.value
        })
    },
    submitForm() {
        let c = this.selectComponent('#apply')
        c.validate((valid, errors) => {
            //console.log('valid', valid, errors)
            if (!valid) {
                const firstError = Object.keys(errors)
                if (firstError.length) {
                    this.setData({
                        error: errors[firstError[0]].message
                    })
                }
            } else {
                //保存编辑的资料
                request({
                    url: path + '/system/user/profile/checkPassword',
                    method: 'GET',
                    data: {
                        oldPassword: this.data.formData.oldPassword,
                        password: this.data.formData.oldPassword,
                    }
                }).then(res => {
                    if (res) {
                        // 密码校验通过更新密码
                        request({
                            url: path + '/system/user/profile/resetPwd',
                            method: 'POST',
                            data: {
                                userId: this.data.userId,
                                loginName: this.data.loginName,
                                oldPassword: this.data.formData.oldPassword,
                                password: this.data.formData.oldPassword,
                                confirm: this.data.formData.confirm,
                            }
                        }).then(res => {
                            if (res.code == 0) {
                                // 密码保存成功
                                wx.switchTab({
                                    url: '/pages/my/index',
                                })
                            } else {
                                this.setData({
                                    error: '密码修改失败'
                                })
                            }
                        })
                    } else {
                        this.setData({
                            error: '旧密码填写错误'
                        })
                    }
                })
            }
        })
    },
    back() {
        wx.navigateBack()
    }
})
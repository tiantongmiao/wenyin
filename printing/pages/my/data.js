import { wxPath, path, request } from '../../utils/util'
Page({
    data: {
        sexs: ['请选择性别', '男', '女'],
        formData: {
        },
        rules: [
            {
                name: 'userName',
                rules: { required: true, message: '姓名必填' },
            }, 
            {
                name: 'sex',
                rules: { required: true, message: '性别必填' },
            }, 
            {
                name: 'email',
                rules: { required: true, email:true, message: '请输入有效的电子邮箱' },
            }, 
            {
                name: 'phonenumber',
                rules: { required: true, mobile: true, message: '必填' },
            }, 
            {
                name: 'wechat',
                rules: { 
                    required: true, 
                    message: '微信号必填',
                },
            }, 
            {
                name: 'qq',
                rules: { required: true, message: 'QQ号必填' },
            }
        ]
    },
    // 事件处理函数
    onLoad() {
        wx.setNavigationBarTitle({
            title: '编辑资料'
        });
        //获取个人信息
        this.init()
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
                    [`formData.userId`]: res.data.user.userId,
                    [`formData.deptId`]: res.data.user.deptId,
                    [`formData.userName`]: res.data.user.userName,
                    [`formData.sex`]: res.data.user.sex=='男'?1:( res.data.user.sex=='女' ? 2 : 0),
                    [`formData.email`]: res.data.user.email,
                    [`formData.phonenumber`]: res.data.user.phonenumber,
                    [`formData.wechat`]: res.data.user.wechat,
                    [`formData.qq`]: res.data.user.qq,
                    [`formData.status`]: res.data.user.status,
                    [`formData.postIds`]: res.data.user.postIds ? res.data.user.postIds : '',
                    [`formData.classIds`]: res.data.user.classIds ? res.data.user.classIds :'',
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
            if (!valid) {
                const firstError = Object.keys(errors)
                if (firstError.length) {
                    this.setData({
                        error: errors[firstError[0]].message
                    })
                }
            } else {
                //保存编辑的资料
                let _data = this.data.formData;
                _data.sex = _data.sex - 1;
                request({
                    url: path + '/system/user/profile/update',
                    method: 'POST',
                    data: this.data.formData
                }).then(res => {
                    if (res.code == 0) {
                        // 跳转至首页
                        wx.switchTab({
                            url: '/pages/my/index',
                        })
                    } else {
                        wx.showModal({
                            title: '获取信息失败',
                            content: res.msg,
                            showCancel: false
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
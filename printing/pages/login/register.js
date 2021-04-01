
import { wxPath, request } from '../../utils/util'

Page({
    data: {
        sexs: ['请选择性别', '男', '女'],
        sexIndex: 0,

        depts: [{deptName: '请选择学校'}],
        deptIndex: 0,

        classes: [{deptName: '请先选择学校'}],

        subjects: [{dictLabel: '请选择学科'}],
        subjectIndex: 0,

        roles: [{roleName: '请选择角色'}],
        roleIndex: 0,

        formData: {},
        rules: [
            {
                name: 'loginName',
                rules: {
                    required: true, 
                    rangelength: [2,8], 
                    message: '登录名必填且大于2个字小于8个字'
                },
            }, {
                name: 'password',
                rules: { 
                    required: true, 
                    message: '密码必填',
                    validator: (rule, value, param, models) => {
                        if (!/[0-9A-Za-z]{4,10}/.test(value)) {
                            return "密码由英文字母和数字组成的4-10位字符"
                        }
                    }
                },
            }, 
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
            }, {
                name: 'deptId',
                rules: { required: true, message: '学校必填' },
            }, {
                name: 'classIds',
                rules: { required: true, message: '部门必填' },
            }, {
                name: 'subject',
                rules: { required: true, message: '学科必填' },
            }, {
                name: 'roleIds',
                rules: { required: true, message: '角色必填' },
            }
        ]
    },
    // 事件处理函数
    onLoad() {
        wx.setNavigationBarTitle({
            title: '用户注册'
        });
        this.queryDepts()
        this.querySubjects()
        this.queryRoles()
    },
    formInputChange(e) {
        const { field } = e.currentTarget.dataset
        this.setData({
            [`formData.${field}`]: e.detail.value
        })
    },
    bindSexChange(e) {
        this.setData({
            sexIndex: e.detail.value,
            [`formData.sex`]: e.detail.value - 1
        })
    },
    queryDepts() {
        let that = this
        request({
            url: wxPath + '/dept/list',
            header: {
                //设置参数内容类型为x-www-form-urlencoded
                'content-type': 'application/json',
                'Accept': 'application/json'
            },
        }).then(res => {
            if (res.code == 0) {
                let _depts = [{deptName:'请选择学校'}].concat(res.data)
                that.setData({
                    depts: _depts
                })
            } else {
                wx.showModal({
                    title: '获取信息失败',
                    content: res.msg,
                    showCancel: false
                })
            }
        })
    },
    bindDeptChange(e) {
        let deptId = this.data.depts[e.detail.value].deptId
        this.setData({
            deptIndex: e.detail.value,
            [`formData.deptId`]: deptId
        })
        this.queryClasses(deptId)
    },
    queryClasses(deptId) {
        if (!deptId) {
            this.data.classes = [{deptName: '请先选择学校'}]
            return
        }
        let that = this
        request({
            url: wxPath + '/dept/classes',
            method: 'POST',
            header: {
                //设置参数内容类型为x-www-form-urlencoded
                'content-type': 'application/json',
                'Accept': 'application/json'
            },
            data: {
                parentId: deptId,
                typeId: '1'
            },
        }).then(res => {
            if (res.code == 0) {
                that.setData({
                    classes: res.data
                })
            } else {
                wx.showModal({
                    title: '获取信息失败',
                    content: res.msg,
                    showCancel: false
                })
            }
        })
        
    },
    querySubjects() {
        let that = this
        request({
            url: wxPath + '/dic/data-by-type/subject_type',
            header: {
                //设置参数内容类型为x-www-form-urlencoded
                'content-type': 'application/json',
                'Accept': 'application/json'
            },
        }).then((res) => {
            if (res.code == 0) {
                let _subjects = [{dictLabel: '请选择学科'}].concat(res.data)
                that.setData({
                    subjects: _subjects
                })
            }
        })
    },
    bindSubjectChange(e) {
        let subject = this.data.subjects[e.detail.value].dictValue
        this.setData({
            subjectIndex: e.detail.value,
            [`formData.subject`]: subject
        })
    },
    queryRoles() {
        let that = this
        request({
            url: wxPath + '/role/list',
            header: {
                //设置参数内容类型为x-www-form-urlencoded
                'content-type': 'application/json',
                'Accept': 'application/json'
            },
        }).then((res) =>{
                if (res.code == 0) {
                    let _roles = [{roleName: '请选择角色'}].concat(res.data)
                    that.setData({
                        roles: _roles
                    })
                }
            })
    },
    bindRoleChange(e) {
        let roleId = this.data.roles[e.detail.value].roleId
        this.setData({
            roleIndex: e.detail.value,
            [`formData.roleIds`]: [roleId]
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
                request({
                    url: wxPath + '/register',
                    method: 'POST',
                    header: {
                        //设置参数内容类型为x-www-form-urlencoded
                        'content-type': 'application/json',
                        'Accept': 'application/json'
                    },
                    data: this.data.formData,
                }).then((res) => {
                        if (res.data.code == 0) {
                            // 跳转至首页
                            wx.reLaunch({
                                url: '/pages/login/index',
                            })
                        } else {
                            wx.showModal({
                                title: '注册失败',
                                content: res.data.msg,
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
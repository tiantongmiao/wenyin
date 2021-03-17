// 获取应用实例
const app = getApp()
const ip = app.globalData.host
const path = ip + "/pas/wx"

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
                rules: { required: true, message: '必填' },
            }, {
                name: 'password',
                rules: { required: true, message: '必填' },
            }, {
                name: 'userName',
                rules: { required: true, message: '必填' },
            }, {
                name: 'sex',
                rules: { required: true, message: '必填' },
            }, {
                name: 'email',
                rules: { required: true, message: '必填' },
            }, {
                name: 'phonenumber',
                rules: { required: true, message: '必填' },
            }, {
                name: 'wechat',
                rules: { required: true, message: '必填' },
            }, {
                name: 'qq',
                rules: { required: true, message: '必填' },
            }, {
                name: 'deptId',
                rules: { required: true, message: '必填' },
            }, {
                name: 'classIds',
                rules: { required: true, message: '必填' },
            }, {
                name: 'subject',
                rules: { required: true, message: '必填' },
            }, {
                name: 'roleIds',
                rules: { required: true, message: '必填' },
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
        wx.request({
            url: path + '/dept/list',
            success(res) {
                if (res.data.code == 0) {
                    let _depts = [{deptName:'请选择学校'}].concat(res.data.data)
                    that.setData({
                        depts: _depts
                    })
                }
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
        wx.request({
            url: path + '/dept/classes',
            method: 'POST',
            header: {
                'content-type': 'application/json',
                'Accept': 'application/json'
            },
            data: {
                parentId: deptId,
                typeId: '1'
            },
            success(res) {
                if (res.data.code == 0) {
                    that.setData({
                        classes: res.data.data
                    })
                }
            }
        })
    },
    querySubjects() {
        let that = this
        wx.request({
            url: path + '/dic/data-by-type/subject_type',
            success(res) {
                if (res.data.code == 0) {
                    let _subjects = [{dictLabel: '请选择学科'}].concat(res.data.data)
                    that.setData({
                        subjects: _subjects
                    })
                }
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
        wx.request({
            url: path + '/role/list',
            success(res) {
                if (res.data.code == 0) {
                    let _roles = [{roleName: '请选择角色'}].concat(res.data.data)
                    that.setData({
                        roles: _roles
                    })
                }
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
            console.log('valid', valid, errors)
            if (!valid) {
                const firstError = Object.keys(errors)
                if (firstError.length) {
                    this.setData({
                        error: errors[firstError[0]].message
                    })
                }
            } else {
                console.log(this.data.formData)
                wx.showToast({
                    title: '校验通过'
                })
            }
        })
    },
    back() {
        wx.navigateBack()
    }
})
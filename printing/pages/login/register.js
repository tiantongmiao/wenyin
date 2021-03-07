Page({
    data: {
        sexIndex: 0,
        sexs: ['请选择性别', '男', '女'],
        schoolIndex: 0,
        schools: ['请选择学校']
    },
    // 事件处理函数
    onLoad() {
        wx.setNavigationBarTitle({
            title: '用户注册'
        });
    },
    bindSexChange(e) {
        this.setData({
            sexIndex: e.detail.value,
        })
    },
    bindSchoolChange(e) {
        this.setData({
            sexIndex: e.detail.value,
        })
    }
})
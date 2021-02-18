Page({
    data: {
        tabActive: 'info',
        departmentIndex: 0,
        departments: ['请选择','一年级'],
        date: '请选择',
    },
    tabClick(e) {
        this.setData({
            tabActive: e.currentTarget.dataset.name
        })
    },
    bindCountryChange(e) {
        console.log('picker country 发生选择改变，携带值为', e.detail.value);
        this.setData({
            departmentIndex: e.detail.value
        })
    },
    bindDateChange(e) {
        this.setData({
            date: e.detail.value,
        })
    }
})
Page({
    data: {
        tabActive: 'progress',
        departmentIndex: 0,
        departments: ['请选择','一年级'],
        date: '请选择',
        materailIndex: 0,
        materails: ['请选择'],
        printingIndex: 0,
        printings: ['请选择'],
    },
    tabClick(e) {
        this.setData({
            tabActive: e.currentTarget.dataset.name
        })
    },
    bindCountryChange(e) {
        this.setData({
            departmentIndex: e.detail.value
        })
    },
    bindDateChange(e) {
        this.setData({
            date: e.detail.value,
        })
    },
    onUpLoad(res) {
        wx.chooseMessageFile({
            success (res) {
                const tempFilePaths = res.tempFiles
                wx.uploadFile({
                  url: 'https://example.weixin.qq.com/upload', //仅为示例，非真实的接口地址
                  filePath: tempFilePaths[0],
                  name: 'file',
                  formData: {
                  },
                  success (res){
                    const data = res.data
                    //do something
                  }
                })
              }
        })
    }
})
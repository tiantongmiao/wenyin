const app = getApp();
Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    list: [
      {
        "pagePath": "/pages/center/index",
        "iconPath": "/image/index/processingcenter.png",
        "selectedIconPath": "/image/index/processingcenter.png",
        "text": "处理中心"
      },
      {
          "pagePath": "/pages/work/index",
          "iconPath": "/image/index/workbench.png",
          "selectedIconPath": "/image/index/workbench.png",
          "text": "工作台"
      },
      {
          "pagePath": "/pages/mail/index",
          "iconPath": "/image/index/maillist.png",
          "selectedIconPath": "/image/index/maillist.png",
          "text": "通讯录"
      },
      {
          "pagePath": "/pages/my/index",
          "iconPath": "/image/index/my.png",
          "selectedIconPath": "/image/index/my.png",
          "text": "我的"
      }
    ]
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
      this.setData({
        selected: data.index
      })
    }
  }
})
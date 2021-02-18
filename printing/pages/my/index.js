// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    activeAccordion: 0,
    passBtn: [{text: '修改密码'}],
    clearBtn: [{text: '确定'}, {text: '取消'}],
    tipBtn: [{text: '确定'}],
  },
  showAccordion(e) {
    if(e.currentTarget.dataset.index != 1) {
      if(e.currentTarget.dataset.index == 2){
        this.setData({
          showPassDialog: true
        })
      } else if(e.currentTarget.dataset.index == 3){
        const url = '/pages/my/card'
        wx.redirectTo({url})
      } else if(e.currentTarget.dataset.index == 4){
        this.setData({
          showTipDialog: true
        })
      } else if(e.currentTarget.dataset.index == 5){
        this.setData({
          showClearDialog: true
        })
      }
    } else{
      let index = 0
      if(e.currentTarget.dataset.index != this.data.activeAccordion) {
        index = e.currentTarget.dataset.index
      }
      this.setData({
        activeAccordion: index
      })
    }
  },
  passConfirm() {
    this.setData({
      showPassDialog: false
    })
  },
  clearConfirm(detail) {
    if(detail.detail.index == 0) {
      // 确认清除缓存

    }
    this.setData({
      showClearDialog: false
    })
  },
  tipConfirm() {
    this.setData({
      showTipDialog: false
    })
  },
})

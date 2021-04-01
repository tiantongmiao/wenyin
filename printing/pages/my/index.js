import { wxPath, request } from '../../utils/util'
Component({
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' && this.getTabBar()) {
        this.getTabBar().setData({
          selected: 3
        })
      }
    }
  },
  data: {
    activeAccordion: 0,
    passBtn: [{text: '修改密码'}],
    clearBtn: [{text: '确定'}, {text: '取消'}],
    tipBtn: [{text: '确定'}],
    formData: {}
  },
  methods: {
    showAccordion(e) {
      if(e.currentTarget.dataset.index != 1) {
        if(e.currentTarget.dataset.index == 2){
          wx.navigateTo({
            url: '/pages/my/password',
          })
        } else if(e.currentTarget.dataset.index == 3){
          const url = '/pages/my/card'
          wx.navigateTo({url})
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
        this.init();
      }
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
                [`formData.sex`]: res.data.user.sex,
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
    toEdit() {
      const url = '/pages/my/data'
      wx.navigateTo({url})
    }
  }
})

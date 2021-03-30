// index.js
// 获取应用实例
import {path, request} from '../../utils/util'
Component({
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' && this.getTabBar()) {
        this.getTabBar().setData({
          selected: 0
        })
        this.getData('/print/printdata')
      }
    }
  },
  data: {
    inputShowed: false,
    inputVal: "",
    tabActive: 'wait',
    page: 0
  },
  // 事件处理函数
  onLoad() {
    this.setData({
      search: this.search.bind(this)
    })
  },
  methods: {
    
    search: function (value) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([{text: '搜索结果', value: 1}, {text: '搜索结果2', value: 2}])
        }, 200)
      })
    },
    selectResult: function (e) {
      console.log('select result', e.detail)
    },
    getData(_url) {
      let that = this
      request({
        url: path + _url,
        method: 'POST',
        data: {
          'order': 'asc',
          'offset': this.data.page  * 20,
          'limit': 20,
          'params[dataType]': -1
        }
      }).then(res => {
        if (res.code == 0) {
          that.setData({
            listData: res.rows
          })
        } else {
          wx.showModal({
            title: '获取数据失败',
            content: res.msg,
            showCancel: false
          })
        }
    })
    },
    tabClick(e) {
      this.setData({
        tabActive: e.currentTarget.dataset.name,
        page: 0
      })
      let _url = '';
      if(e.currentTarget.dataset.name == 'wait') {
        _url = '/print/printdata'
      } else {
        _url = '/print/donedata'
      }
      this.getData(_url)
    }
  }
})

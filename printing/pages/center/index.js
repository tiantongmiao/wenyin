// index.js
// 获取应用实例
const app = getApp()
Component({
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' && this.getTabBar()) {
        this.getTabBar().setData({
          selected: 0
        })
      }
    }
  },
  data: {
    inputShowed: false,
    inputVal: "",
    tabActive: 'wait'
  },
  // 事件处理函数
  onLoad() {
    this.setData({
      search: this.search.bind(this)
    })
  },
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
  tabClick(e) {
    this.setData({
      tabActive: e.currentTarget.dataset.name
    })
  }
})

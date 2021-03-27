// index.js
// 获取应用实例
const app = getApp()
const ip = app.globalData.host
const path = ip + "/pas/wx"
Component({
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' && this.getTabBar()) {
        this.getTabBar().setData({
          selected: 0
        })
        this.getData('/email-check')
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
      wx.request({
        url: path + _url,
        method: 'POST',
        header: {
            //设置参数内容类型为x-www-form-urlencoded
            'content-type': 'application/json',
            'Accept': 'application/json'
        },
        data: {
          // 'order': 'asc',
          // 'offset': this.data.page  * 20,
          // 'limit': 20,
          // 'params[dataType]': -1
        },
        success(res) {
            if (res.data.code == 0) {
                // 加载数据
                this.listData = res.data.rows;
            } else {
                wx.showModal({
                    title: '获取数据失败',
                    content: res.data.msg,
                    showCancel: false
                })
            }
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
        _url = '/printdata'
      } else {
        _url = '/donedata'
      }
      this.getData(_url)
    }
  }
})

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
        this.getData()
      }
    }
  },
  data: {
    inputShowed: false,
    inputVal: "",
    tabActive: 'wait',
    page: 0,
    listData: [],
    loading: false,
    showMore: true,
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
    getData() {
      let that = this;
      console.log(that.data.page)
      let _url = '';
      that.setData({
        loading: true
      })
      if(that.data.tabActive == 'wait') {
        _url = '/print/printdata'
      } else {
        _url = '/print/donedata'
      }
      request({
        url: path + _url,
        method: 'POST',
        data: {
          'order': 'asc',
          'offset': that.data.page  * 20,
          'limit': 20,
          'params[dataType]': -1
        }
      }).then(res => {
        if (res.code == 0) {
          that.setData({
            listData: [...that.data.listData, ...res.rows],
            loading: false
          })
          if(that.data.listData.length >= res.total) {
            that.setData({
              showMore: false
            })
          }
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
        listData: [],
        page: 0,
        showMore: true,
        loading: false,
      })
      this.getData()
    },
    getMore() {
      this.setData({
        page: this.data.page + 1
      });
      this.getData();
    }
  }
})

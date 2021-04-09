// index.js
// 获取应用实例
var wxCharts = require('../../utils/wxcharts.js');
import { wxPath, request, path, getCookieValue } from '../../utils/util'
Component({
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' && this.getTabBar()) {
        this.getTabBar().setData({
          selected: 1
        })
      }
    }
  },
  data: {
    startDate: '',
    endDate: '',
    printCount: 0
  },
  ready() {
    this.getChartsData()
    if (['teacher', 'director'].indexOf(getCookieValue('role')) >= 0) {
      this.getPrintCount()
      setInterval(() => {
        this.getPrintCount()
      }, 30000);
    }
  },
  methods: {
    getPrintCount() {
      request({
        url: path + '/print/getNotify',
        method: 'POST'
      }).then(res => {
        if (res.code == 0) {
          this.setData({
            printCount: res.count
          })
        }
      }).catch(res => {
        // console.log(res)
      })
    },
    // 事件处理函数
    getChartsData() {
      //获取柱状图数据
      request({
        url: wxPath + '/print/copies',
        method: 'POST',
        header: {
          //设置参数内容类型为x-www-form-urlencoded
          'content-type': 'application/json',
          'Accept': 'application/json'
        },
        data: {
          startDate: this.data.startDate,
          endDate: this.data.endDate
        }
      }).then((res) => {
        if (res.code == 0) {
          let _data = [], _date = [];
          if (res.data.length > 0) {
            res.data.forEach(c => {
              _data.push(c.mySum);
              _date.push(c.applicationDate)
            })
          } else {
            _data = [0]
            _date = ['']
          }
          this.initCharts(_date, _data)
        }
      })
    },
    initCharts(dates, data) {
      let max = Math.max(...data)
      max <= 0 && (max = 5)
      const _windowWidth = wx.getSystemInfoSync().windowWidth
      new wxCharts({
        canvasId: 'columnCanvas',
        type: 'column',
        yAxis: {
          min: 0,
          max: max
        },
        categories: dates,
        series: [
          {
            name: '份数',
            data: data
          }
        ],
        width: _windowWidth,
        height: 250,
        dataLabel: true
      }, this);
    },
    toApply() {
      const url = '/pages/work/apply'
      wx.navigateTo({ url })
    },
    toApproval() {
      const url = '/pages/center/index'
      wx.switchTab({ url })
    },
    bindDateChange(e) {
      const { field } = e.currentTarget.dataset
      this.setData({
        [`${field}`]: e.detail.value,
      })
    }
  },
})

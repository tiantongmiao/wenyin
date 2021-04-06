// index.js
// 获取应用实例
var wxCharts = require('../../utils/wxcharts.js');
import { wxPath, request } from '../../utils/util'
const app = getApp();
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
    year: '2021',
    startdate: '',
    enddate: '',
  },
  ready(){
    this.getChartsData();
  },
  methods: {
    // 事件处理函数
    getChartsData() {
      //获取柱状图数据
      const _windowWidth = wx.getSystemInfoSync().windowWidth;
      const that = this;
      request({
        url: wxPath + '/print/copies',
        method: 'POST',
        header: {
            //设置参数内容类型为x-www-form-urlencoded
            'content-type': 'application/json',
            'Accept': 'application/json'
        },
        data: {
          startDate: '',
          endDate: ''
        }
      }).then((res) => {
          if (res.code == 0) {
            let _data = [], _date = [];
            if(this.data.length > 0) {
              res.data.forEach(c=> {
                _data.push(c.mySum);
                _date.push(c.applicationDate);
              })
            } else {
              _data = [0]
              _date = ['']
            }
            
            new wxCharts({
              canvasId: 'columnCanvas',
              type: 'column',
              yAxis: {
                min: 0
              },
              categories: _date,
              series: [
                {
                  name: '份数',
                  data: _data
                }
              ],
              width: _windowWidth,
              height: 250,
              dataLabel: false
            },this);
          }
      })
    },
    toApply() {
      const url = '/pages/work/apply'
      wx.navigateTo({url})
    },
    toApproval() {
      const url = '/pages/work/approval'
      wx.navigateTo({url})
    },
    bindStartDateChange(e) {
      this.setData({
        startdate: e.detail.value,
      })
    },
    bindEndDateChange(e) {
      this.setData({
        enddate: e.detail.value,
      })
    },
  },
})

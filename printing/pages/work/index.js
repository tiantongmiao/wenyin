// index.js
// 获取应用实例
var wxCharts = require('../../utils/wxcharts.js');
var chartData = {
  main: {
      title: '总成交量',
      data: [15, 20, 45, 37],
      categories: ['2012', '2013', '2014', '2015']
  },
  sub: [{
      title: '2012年度成交量',
      data: [70, 40, 65, 100, 34, 18],
      categories: ['1', '2', '3', '4', '5', '6']
  }, {
      title: '2013年度成交量',
      data: [55, 30, 45, 36, 56, 13],
      categories: ['1', '2', '3', '4', '5', '6']
  }, {
      title: '2014年度成交量',
      data: [76, 45, 32, 74, 54, 35],
      categories: ['1', '2', '3', '4', '5', '6']                
  }, {
      title: '2015年度成交量',
      data: [76, 54, 23, 12, 45, 65],
      categories: ['1', '2', '3', '4', '5', '6']
  }]
};
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
    
  },
  ready(){
    new wxCharts({
      canvasId: 'columnCanvas',
      type: 'column',
      categories: ['2016-08', '2016-09', '2016-10', '2016-11', '2016-12', '2017'],
      series: [{
          name: '成交量1',
          data: [15, 20, 45, 37, 4, 80]
      }, {
          name: '成交量2',
          data: [70, 40, 65, 100, 34, 18]
      }, {
          name: '成交量3',
          data: [70, 40, 65, 100, 34, 18]
      }, {
          name: '成交量4',
          data: [70, 40, 65, 100, 34, 18]
      }],
      yAxis: {
          format: function (val) {
              return val + '万';
          }
      },
      width: 320,
      height: 300,
      dataLabel: false
  },this);
  },
  methods: {
    // 事件处理函数
    toApply() {
      const url = '/pages/work/apply'
      wx.navigateTo({url})
    },
    toApproval() {
      const url = '/pages/work/approval'
      wx.navigateTo({url})
    },
    backToMainChart: function () {
      this.setData({
          chartTitle: chartData.main.title,
          isMainChartDisplay: true
      });
      columnChart.updateData({
          categories: chartData.main.categories,
          series: [{
              name: '成交量',
              data: chartData.main.data,
              format: function (val, name) {
                  return val.toFixed(2) + '万';
              }
          }]
      });
  },
  touchHandler: function (e) {
      var index = columnChart.getCurrentDataIndex(e);
      if (index > -1 && index < chartData.sub.length && this.data.isMainChartDisplay) {
          this.setData({
              chartTitle: chartData.sub[index].title,
              isMainChartDisplay: false
          });
          columnChart.updateData({
              categories: chartData.sub[index].categories,
              series: [{
                  name: '成交量',
                  data: chartData.sub[index].data,
                  format: function (val, name) {
                      return val.toFixed(2) + '万';
                  }
              }]
          });

      }
  },
  },
})

// index.js
// 获取应用实例
import * as echarts from '../../ec-canvas/echarts';
const app = getApp();
var xData = [], 
    yData = [], chart, charts, pc=0, mobile=0;
function initChart(canvas, width, height) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);
  var option = {
    // color: ["#37A2DA"],
    // xAxis: {
    //   type: 'category',
    //   boundaryGap: false,
    //   data: xData,
    // },
    // yAxis: {
    //   x: 'center',
    //   type: 'value'
    // },
    // series: [{
    //   type: 'line',
    //   smooth: true,
    //   data: yData
    // }]
    tooltip: {},
    legend: {
        data:['销量']
    },
    xAxis: {
        data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
    },
    yAxis: {},
    series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
    }]
  };
  chart.setOption(option);
  return chart;
}

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
    ec: {
      onInit: initChart
    }
  },
  onload: function(){
    this.getData();
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
    getData() {
      wx.showLoading({
        title: '加载中...',
      });
      let that = this;
      barChart.setOption({
        title: {
            text: '第一个 ECharts 实例'
        },
        tooltip: {},
        legend: {
            data:['销量']
        },
        xAxis: {
            data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
        },
        yAxis: {},
        series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
        }]
      });
      // wx.request({
      //   url: 'https://list',
      //   method: 'get',
      //   data: {
      //     year: that.data.year
      //   },
      //   dataType: 'jsonp',
      //   success: function (res) {
      //     wx.hideLoading();
      //     console.log(res);
      //     var data = JSON.parse(res.data);
      //     var datas = [3,4,3,5,6,7,7,6,8,9,2,2];
      //       // datas = [data[0].value1, data[0].value2, data[0].value3,
      //       // data[0].value4, data[0].value5, data[0].value6, data[0].value7,
      //       // data[0].value8, data[0].value9, data[0].value10, data[0].value11,
      //       // data[0].value12,];
            
      //     var monthstr = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
      //     console.log(datas);
      //     barChart.setOption({
      //       title: {
      //         text: "标题标题标题",
      //         left: 'center'
      //       },
      //       xAxis: {
      //         type: 'category',
      //         data: monthstr,
      //         axisLabel: {
      //           interval: 0
      //         }
      //       },
      //       yAxis: {
      //         type: 'value'
      //       },
      //       series: [{
      //         data: datas,
      //         type: 'bar',
      //         itemStyle: {
      //           normal: {
      //             label: {
      //               show: true,
      //               position: 'top',
      //               textStyle: {
      //                 color: 'black'
      //               },
      //               formatter: '{c}'
      //             }
      //           }
      //         }
      //       }],
      //     });
          
      //   },
      //   fail: function (res) {
      //     console.log("执行失败：" + res);
      //   }
      // })
   
    },
  },
})

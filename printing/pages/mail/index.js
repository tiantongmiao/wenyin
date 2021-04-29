import { wxPath, request, getUser } from '../../utils/util'
Component({
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' && this.getTabBar()) {
        this.getTabBar().setData({
          selected: 2
        })
        this.setData({
          letter: ['A', 'B', 'C', 'D', 'E', 'F',' G', 'H', 'I', 'J', 'K', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
          inputShowed: false,
          inputVal: "",
          page: 1,
          listData: [],
          loading: false,
          showMore: true,
        })
        this.getUserList()
      } else {
        
      }
    }
  },
  data: {
    letter: ['A', 'B', 'C', 'D', 'E', 'F',' G', 'H', 'I', 'J', 'K', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
    inputShowed: false,
    inputVal: "",
    page: 1,
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
    search(value) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([{text: '搜索结果', value: 1}, {text: '搜索结果2', value: 2}])
        }, 200)
      })
    },
    selectResult(e) {
      // console.log('select result', e.detail)
    },
    getUserList() {
      let data = {
        'pageSize': 20,
        'pageNum': this.data.page,
        'orderByColumn': 'createTime',
        'isAsc': 'desc'
      }
      getUser() && getUser('user').deptId && (data['deptId'] = getUser('user').deptId)
      request({
          url: wxPath + '/user/list',
          method: 'POST',
          data: data
        }).then(res => {
          if (res.code == 0) {
            this.setData({
              listData: [...this.data.listData, ...res.rows],
              loading: false
            })
            if(this.data.listData.length >= res.total) {
              this.setData({
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
    callNumber(e) {
      wx.makePhoneCall({
        phoneNumber: e.currentTarget.dataset['number'],
        success: (e) => {
          // console.log(e)
        }
      })
    },
    getMore() {
      this.setData({
        page: this.data.page + 1
      });
      this.getUserList();
    }
  }
})

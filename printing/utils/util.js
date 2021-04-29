const app = getApp()
const ip = app.globalData.host
const wxPath = ip + "/pas/wx"
const path = ip + '/pas'
const tokenKey = 'JSESSIONID'
let user = app.globalData.user

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

const setCookies = cookies => {
  let cookieArr = cookies.split(";")
  cookieArr.map(item => {
    if (item.indexOf('=') > 0) {
      setCookie(item.split('=')[0], item.split('=')[1])
    }
  })
}

const setCookie = (key, value) => {
  wx.setStorageSync(key, value)
}

const getCookie = (key) => {
  return key + '=' + getCookieValue(key)
}

const getCookieValue = (key) => {
  return wx.getStorageSync(key)
}

let request = ({header, method, url, data}) => {
  let promise = new Promise((resolve, reject) => {
    let token = getCookie(tokenKey)
    let header_ = {'content-type': 'application/x-www-form-urlencoded'}
    if (token) {
      header_['Cookie'] = token
    }
    header_ = header ? Object.assign(header_, header) : header_
    wx.request({
      url: url,
      header: header_,
      method: method ? method : 'GET',
      data: data || {},
      success: function (res) {
        if (res.header['Set-Cookie']) {
          setCookies(res.header['Set-Cookie']);
        }
        resolve(res.data)
      },
      error: function (e) {
        reject(e)
      }
    })
  })
  return promise
}

let upload = ({url, filePath, name, header, data,}) => {
  let promise = new Promise((resolve, reject) => {
    let token = getCookie(tokenKey)
    let header_ = {}
    if (token) {
      header_['Cookie'] = token
    }
    header_ = header ? Object.assign(header_, header) : header_
    wx.uploadFile({
      url: url,
      filePath: filePath,
      header: header_,
      name: name,
      formData: data,
      success: function (res) {
        if (res.header['Set-Cookie']) {
          setCookies(res.header['Set-Cookie']);
        }
        resolve(JSON.parse(res.data))
      },
      error: function (e) {
        reject(e)
      }
    })
  })
  return promise

}

let setUser = (user) => {
  app.globalData.user = user
}

let getUser = () => {
  return app.globalData.user
}

module.exports = {
  request,
  upload,
  wxPath,
  path,
  tokenKey,
  formatTime,
  formatNumber,
  setCookies,
  setCookie,
  getCookie,
  getCookieValue,
  setUser,
  getUser
}

window.$aw = {};

(function ($) {
  $.isPc = function () {
    return (!navigator.userAgent.match(/(iPhone|iPod|Android|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone)/i))
  }

  // localStorage 相关方法封装
  $.getStorage = function (key) {
    let ls = window.localStorage
    if (!ls) {
      console.error('window.localStorage is not defined')
    }
    let value = ls.getItem(key)
    if (value !== undefined && value !== 'undefined') {
      value = JSON.parse(value)
    }
    return value
  }

  $.setStorage = function (key, value) {
    let ls = window.localStorage
    if (!ls) {
      console.error('window.localStorage is not defined')
    }
    if (value !== undefined) {
      value = JSON.stringify(value)
    }
    ls.setItem(key, value)
  }

  $.removeStorage = function (key) {
    let ls = window.localStorage
    if (!ls) {
      console.error('window.localStorage is not defined')
    }
    return ls.removeItem(key)
  }

  $.clearStorage = function () {
    let ls = window.localStorage
    if (!ls) {
      console.error('window.localStorage is not defined')
    }
    return ls.clear()
  }
})(window.$aw)

// eslint-disable-next-line no-extend-native
Date.prototype.format = function (fmt) {
  if (fmt === null || fmt === undefined || fmt.trim() === '') {
    fmt = 'yyyy-MM-dd HH:mm' // 默认不到秒
  }
  let o = {
    'M+': this.getMonth() + 1, // 月份
    'd+': this.getDate(), // 日
    'H+': this.getHours(), // 小时
    'm+': this.getMinutes(), // 分
    's+': this.getSeconds(), // 秒
    'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
    'S': this.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) { fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length)) }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) { fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length))) }
  }
  return fmt
}

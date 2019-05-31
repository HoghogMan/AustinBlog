export function strReverse (str) {
  return str.split('').reverse().join('')
}

export function parseTime (time, cFormat) {
  if (arguments.length === 0 || time == null || isNaN(time) || time == 0) {
    return ''
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    time = Math.floor(time)
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

export function formatTime (time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000
  console.log(d, now, diff)
  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) { // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
  }
}

export function removeDuplicatedArr (arr, isObject, id) { // 数组去重,第二个参数true表示数组中元素是对象，false元素为值,第三个参数依赖第二参数为true
  var tmp = {},
    ret = []

  for (var i = 0, j = arr.length; i < j; i++) {
    if (isObject) {
      if (!tmp[arr[i][id]]) {
        tmp[arr[i][id]] = 1
        ret.push(arr[i])
      }
    } else {
      if (!tmp[arr[i]]) {
        tmp[arr[i]] = 1
        ret.push(arr[i])
      }
    }
  }
  return ret
}

/**
 * [sortCountryArray 排序数组]
 * @param  {[array]}    arr      [排序数组对象]
 * @param  {[string]}   element  [排序的属性元素]
 * @param  {[boolean]}  bool     [true表示是一维数组，元素为对象；false表示是对象，需要合并再排序]
 * @return {[array]}             [按某元素排序后的数组]
 */
export function sortCountryArray (arr, element = 'country', bool) {
  function sortBy (field) {
    return function (a, b) {
      return a[field].toUpperCase() < b[field].toUpperCase() ? -1 : 1
    }
  }
  if (bool) {
    return arr.sort(sortBy(element))
  } else {
    let newArr = []
    for (let key in arr) {
      newArr = newArr.concat(arr[key])
    }
    return newArr.sort(sortBy(element))
  }
}

export default {
  strReverse,
  parseTime,
  formatTime,
  removeDuplicatedArr,
  sortCountryArray
}

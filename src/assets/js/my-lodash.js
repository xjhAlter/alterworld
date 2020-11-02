window.$my = {};

(function ($) {
  /**
   * 数组 Array
   */

  /**
   * 将数组（array）拆分成多个 size 长度的区块，并将这些区块组成一个新数组。 如果array 无法被分割成全部等长的区块，那么最后剩余的元素将组成一个区块。
   * @param array
   * @param size
   * @returns {Array}
   * 例子：chunk(['a', 'b', 'c', 'd'], 2); => [['a', 'b'], ['c', 'd']]
   */
  $.chunk = function (array, size = 1) {
    if (!array.length || size < 1) {
      return []
    }
    let result = []
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size))
    }
    return result
  }

  /**
   * 创建一个新数组，包含原数组中所有的非假值元素。例如false, null, 0, "", undefined, 和 NaN 都是被认为是“假值”。
   * @param array
   * @returns {Array}
   * 例子：compact([0, 1, false, 2, '', 3]); => [1, 2, 3]
   */
  $.compact = function (array) {
    if (!array.length) {
      return []
    }
    return array.filter(i => !!i)
  }

  /**
   * 创建一个新数组，将array与任何数组 或 值连接在一起。
   * @param array
   * @returns {Array}
   * 例子：concat([1], 2, [3], [[4]]); => [1, 2, 3, [4]]
   */
  $.concat = function (array) {
    let result = []
    result.push(...array)
    for (let i = 1; i < arguments.length; i++) {
      let value = arguments[i]
      if (value instanceof Array) {
        result.push(...value)
      } else {
        result.push(value)
      }
    }
    return result
  }

  /**
   * 创建一个新数组，这个数组中的值，为第一个数字（array 参数）排除了给定数组中的值。
   * @param array
   * @returns {Array}
   * 例子：difference([3, 2, 1], [4, 2]); => [3, 1]
   */
  $.difference = function (array) {
    if (!array.length) {
      return []
    }
    let filterArr = []
    for (let i = 1; i < arguments.length; i++) {
      let value = arguments[i]
      if (value instanceof Array) {
        filterArr.push(...value)
      }
    }
    return array.filter(i => !filterArr.includes(i))
  }

  /**
   * 这个方法类似difference ，除了它接受一个 iteratee （注：迭代器）， 调用array 和 values 中的每个元素以产生比较的标准。 结果值是从第一数组中选择。
   * iteratee 会调用一个参数：(value)。（注：首先使用迭代器分别迭代array 和 values中的每个元素，返回的值作为比较值）。
   * @param array
   * @returns {Array}
   * 例子：differenceBy([3.1, 2.2, 1.3], [4.4, 2.5], Math.floor); => [3.1, 1.3]
   * // The `_.property` iteratee shorthand.
   * differenceBy([{ 'x': 2 }, { 'x': 1 }], [{ 'x': 1 }], 'x'); => [{ 'x': 2 }] //todo 暂未实现该方式
   */
  $.differenceBy = function (array) {
    if (!array.length) {
      return []
    }
    let iteratee = arguments[arguments.length - 1] // 取最后一个参数作为迭代器
    let filterArr = []
    if (typeof iteratee === 'function') {
      for (let i = 1; i < arguments.length - 1; i++) {
        let value = arguments[i]
        if (value instanceof Array) {
          filterArr.push(...(value.map(v => iteratee(v))))
        } else {
          filterArr.push(iteratee(value))
        }
      }
    }
    return array.filter(i => !filterArr.includes(iteratee(i)))
  }

  /**
   * 这个方法类似difference ，除了它接受一个 comparator （注：比较器），它调用比较array，values中的元素。 结果值是从第一数组中选择。comparator 调用参数有两个：(arrVal, othVal)。
   * @param array
   * @returns {Array}
   * 例子：differenceWith([{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }], [{ 'x': 1, 'y': 2 }], isEqual); => [{ 'x': 2, 'y': 1 }]
   */
  $.differenceWith = function (array) {
    console.log('differenceWith 暂未实现')
    return array || []
  }

  /**
   * 创建一个切片数组，去除array前面的n个元素。（n默认值为1。）
   * @param array
   * @param n
   * @returns {Array}
   * 例子：drop([1, 2, 3], 2); => [3]
   */
  $.drop = function (array, n = 1) {
    if (Object.prototype.toString.call(array) !== '[object Array]' || !array.length || n < 1) {
      return []
    } else {
      return array.slice(n, array.length)
    }
  }

  /**
   * 创建一个切片数组，去除array尾部的n个元素。（n默认值为1。）
   * @param array
   * @param n
   * @returns {Array}
   * 例子：dropRight([1, 2, 3], 2); => [1]
   */
  $.dropRight = function (array, n = 1) {
    if (Object.prototype.toString.call(array) !== '[object Array]' || !array.length || n >= array.length) {
      return []
    } else {
      return array.slice(0, array.length - n)
    }
  }

  /**
   * 创建一个切片数组，去除array中从 predicate 返回假值开始到尾部(从右到左)的部分。predicate 只实现了函数类型
   * @param array
   * @param predicate
   * @returns {Array}
   * 例子：
   * var users = [
   * { 'user': 'barney',  'active': true },
   * { 'user': 'fred',    'active': false },
   * { 'user': 'pebbles', 'active': false }
   * ];
   * dropRightWhile(users, function(o) { return !o.active; }); => objects for ['barney']
   */
  $.dropRightWhile = function (array, predicate) {
    if (Object.prototype.toString.call(array) !== '[object Array]' || !array.length) {
      return []
    }
    let index = array.length
    let flag = true
    if (typeof predicate === 'function') {
      while (flag && index >= 0) {
        index--
        flag = predicate(array[index])
      }
    }
    return array.slice(0, index + 1)
  }

  /**
   * 创建一个切片数组，去除array中从起点开始到 predicate 返回假值结束部分（从左到右）。predicate 只实现了函数类型
   * @param array
   * @param predicate
   * @returns {Array}
   * 例子：
   * var users = [
   * { 'user': 'barney',  'active': false },
   * { 'user': 'fred',    'active': false },
   * { 'user': 'pebbles', 'active': true }
   * ];
   * dropRightWhile(users, function(o) { return !o.active; }); => objects for ['pebbles']
   */
  $.dropWhile = function (array, predicate) {
    if (Object.prototype.toString.call(array) !== '[object Array]' || !array.length) {
      return []
    }
    let index = 0
    let flag = true
    if (typeof predicate === 'function') {
      while (flag && index < array.length) {
        flag = predicate(array[index])
        if (flag) {
          index++
        }
      }
    }
    return array.slice(index, array.length)
  }
})(window.$my)

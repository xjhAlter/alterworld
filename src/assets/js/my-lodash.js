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

  /**
   * 使用 value 值来填充（替换） array，从start位置开始, 到end位置结束（但不包含end位置）。(改变原数组)
   * @param array
   * @param value
   * @param start
   * @param end
   */
  $.fill = function (array = [], value = '', start = 0, end = array.length) {
    if (Object.prototype.toString.call(array) === '[object Array]' && array.length && end > start) {
      let count = end - start
      array.splice(start, count, ...(Array(count).fill(value)))
    }
    return array
  }

  /**
   * 该方法返回第一个通过 predicate 判断为真值的元素的索引值（index），而不是元素本身。
   * @param array
   * @param predicate
   * @param fromIndex
   * @returns {number}
   * 例子：
   * var users = [
   * { 'user': 'barney',  'active': false },
   * { 'user': 'fred',    'active': false },
   * { 'user': 'pebbles', 'active': true }
   * ];
   * findIndex(users, function(o) { return o.user == 'barney'; }); => 0
   * findIndex(users, { 'user': 'fred', 'active': false }); => 1
   * findIndex(users, ['active', false]); => 0
   * findIndex(users, 'active'); => 2
   */
  $.findIndex = function (array, predicate, fromIndex = 0) {
    if (Object.prototype.toString.call(array) === '[object Array]' && array.length) {
      for (let i = fromIndex; i < array.length; i++) {
        if ($.baseIteratee(array[i], predicate)) {
          return i
        }
      }
    }
    return -1
  }

  /**
   * 返回第一个通过 predicate 判断为真值的元素的索引值（index）,从右到左的迭代集合array中的元素。
   * @param array
   * @param predicate
   * @param fromIndex
   * @returns {number}
   * 例子：同findIndex类似
   */
  $.findLastIndex = function (array, predicate, fromIndex = array.length - 1) {
    if (Object.prototype.toString.call(array) === '[object Array]' && array.length) {
      for (let i = fromIndex; i >= 0; i--) {
        if ($.baseIteratee(array[i], predicate)) {
          return i
        }
      }
    }
    return -1
  }

  /**
   * 获取数组 array 的第一个元素。
   * @param array
   * @returns {*}
   */
  $.head = $.first = function (array) {
    if (Object.prototype.toString.call(array) === '[object Array]' && array.length) {
      return array[0]
    }
    return undefined
  }

  /**
   * 减少一级array嵌套深度。返回新的数组
   * @param array
   * @returns {Array}
   * 例子：flatten([1, [2, [3, [4]], 5]]); => [1, 2, [3, [4]], 5]
   */
  $.flatten = function (array) {
    let result = []
    if (Object.prototype.toString.call(array) === '[object Array]' && array.length) {
      for (let i = 0; i < array.length; i++) {
        if (Object.prototype.toString.call(array[i]) === '[object Array]') {
          result.push(...array[i])
        } else {
          result.push(array[i])
        }
      }
    }
    return result
  }

  /**
   * 将array递归为一维数组。返回新的数组
   * @param array
   * @returns {Array}
   * 例子：flattenDeep([1, [2, [3, [4]], 5]]); => [1, 2, 3, 4, 5]
   */
  $.flattenDeep = function (array) {
    if (Object.prototype.toString.call(array) === '[object Array]' && array.length) {
      let result = array
      while (result.some(i => Object.prototype.toString.call(i) === '[object Array]')) {
        result = $.flatten(result)
      }
      return result
    } else {
      return []
    }
  }

  /**
   * 根据 depth 递归减少 array 的嵌套层级,返回新的数组
   * @param array
   * @param depth
   * @returns {Array}
   * 例子：flattenDepth([1, [2, [3, [4]], 5]], 2); => [1, 2, 3, [4], 5]
   */
  $.flattenDepth = function (array, depth = 1) {
    if (Object.prototype.toString.call(array) !== '[object Array]' || !array.length || depth < 1) {
      return []
    } else {
      let result = array
      while (result.some(i => Object.prototype.toString.call(i) === '[object Array]') && depth >= 1) {
        result = $.flatten(result)
        depth--
      }
      return result
    }
  }

  /**
   * 返回一个由键值对pairs构成的对象
   * @param pairs
   * @returns {Object}
   * 例子：fromPairs([['fred', 30], ['barney', 40]]); => { 'fred': 30, 'barney': 40 }
   */
  $.fromPairs = function (pairs) {
    let obj = {}
    if (Object.prototype.toString.call(pairs) === '[object Array]' && pairs.length) {
      for (let kv of pairs) {
        if (Object.prototype.toString.call(kv) === '[object Array]') {
          let [k, v] = kv
          obj[k] = v
        } else {
          obj[kv] = undefined
        }
      }
    }
    return obj
  }

  /**
   * 等值比较，返回首次 value 在数组array中被找到的 索引值， 如果 fromIndex 为负值，将从数组array尾端索引进行匹配。
   * @param array
   * @param value
   * @param fromIndex
   * @returns {number}
   * 例子：indexOf([1, 2, 1, 2], 2); => 1
   */
  $.indexOf = function (array, value, fromIndex = 0) {
    if (Object.prototype.toString.call(array) !== '[object Array]' || !array.length) {
      return -1
    } else {
      if (fromIndex < 0) {
        for (let i = array.length - 1; i >= 0; i--) {
          if (array[i] === value) {
            return i
          }
        }
      } else {
        for (let i = fromIndex; i < array.length; i++) {
          if (array[i] === value) {
            return i
          }
        }
      }
      return -1
    }
  }

  /**
   * 获取数组array中除了最后一个元素之外的所有元素（注：去除数组array中的最后一个元素）。
   * @param array
   * @returns {Array}
   * initial([1, 2, 3]); => [1, 2]
   */
  $.initial = function (array) {
    if (Object.prototype.toString.call(array) !== '[object Array]' || array.length < 2) {
      return []
    }
    return array.slice(0, array.length - 1)
  }

  /**
   * 创建唯一值的数组，这个数组包含所有给定数组都包含的元素
   * @param arrays
   * @returns {Array}
   * 例子：intersection([2, 1], [4, 2], [1, 2]); => [2]
   */
  $.intersection = function (...arrays) {
    arrays = arrays.filter(i => Object.prototype.toString.call(i) === '[object Array]' && i.length > 0)
    if (!arrays.length) {
      return []
    } else {
      let result = []
      let first = arrays[0]
      for (let i = 0; i < first.length; i++) {
        let value = first[i]
        let flag = true
        for (let j = 0; j < arrays.length; j++) {
          if (!arrays[j].includes(value)) {
            flag = false
            break
          }
        }
        if (flag) {
          result.push(value)
        }
      }
      return result
    }
  }

  /**
   * 这个方法类似 intersection，区别是它接受一个 iteratee 调用每一个arrays的每个值以产生一个值，通过产生的值进行了比较。结果值是从第一数组中选择。iteratee 会传入一个参数：(value)。
   * @param arrays
   * @returns {Array}
   */
  $.intersectionBy = function (...arrays) {
    // 取arrays最后一个元素作为iteratee
    console.log('暂未实现')
  }

  /**
   * 这个方法类似 intersection，区别是它接受一个 comparator 调用比较arrays中的元素。结果值是从第一数组中选择。comparator 会传入两个参数：(arrVal, othVal)。
   * @param arrays
   * @returns {Array}
   */
  $.intersectionWith = function (...arrays) {
    // 取arrays最后一个元素作为comparator
    console.log('暂未实现')
  }

  /**
   * 将 array 中的所有元素转换为由 separator 分隔的字符串。
   * @param array
   * @param separator
   * @returns {string}
   * 例子：join(['a', 'b', 'c'], '~'); => 'a~b~c'
   */
  $.join = function (array, separator = ',') {
    if (Object.prototype.toString.call(array) !== '[object Array]' || !array.length) {
      return ''
    }
    return array.join(separator)
  }

  /**
   * 获取array中的最后一个元素。
   * @param array
   * @returns {*}
   * 例子：last([1, 2, 3]); => 3
   */
  $.last = function (array) {
    if (Object.prototype.toString.call(array) !== '[object Array]' || !array.length) {
      return undefined
    }
    return array[array.length - 1]
  }

  /**
   * 这个方法类似 indexOf ，区别是它是从右到左遍历array的元素。
   * @param array
   * @param value
   * @param fromIndex
   * @returns {number}
   * 例子：lastIndexOf([1, 2, 1, 2], 2, 2); => 1
   */
  $.lastIndexOf = function (array, value, fromIndex = array.length - 1) {
    if (Object.prototype.toString.call(array) !== '[object Array]' || !array.length) {
      return -1
    } else {
      for (let i = fromIndex; i >= 0; i--) {
        if (array[i] === value) {
          return i
        }
      }
      return -1
    }
  }

  /**
   * 其他
   */

  /**
   * 根据迭代器类型返回布尔值
   * @param value
   * @param iteratee
   * @returns {Boolean}
   */
  $.baseIteratee = function (value, iteratee) {
    if (Object.prototype.toString.call(iteratee) === '[object Function]') {
      return iteratee(value)
    } else if (Object.prototype.toString.call(iteratee) === '[object Object]') {
      for (let key in iteratee) {
        // 只判断一层
        if (iteratee[key] !== value[key]) {
          return false
        }
      }
      return true
    } else if (Object.prototype.toString.call(iteratee) === '[object Array]') {
      let [k, v] = iteratee // 只判断一组
      return value[k] === v
    } else if (Object.prototype.toString.call(iteratee) === '[object String]' || Object.prototype.toString.call(iteratee) === '[object Number]') {
      return !!value[iteratee]
    }
  }
})(window.$my)

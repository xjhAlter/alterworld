<template>
  <div class="progress-circle" :style="circleStyle">
    <div v-for="(item,index) in items" :key="index" class="progress-line" :style="progressStyle(item)"></div>
  </div>
</template>

<script>
export default {
  name: 'progress-circle',
  props: {
    values: {
      type: Array,
      default () {
        // {title: 'title',value: 100, color: '#409eff'}
        return []
      },
      require: true
    },
    // 圆的半径
    radius: {
      type: Number,
      default () {
        return 50
      }
    },
    // 圆环的宽度
    width: {
      type: Number,
      default () {
        return 10
      }
    },
    // 背景颜色
    bgColor: {
      type: String,
      default () {
        return 'transparent'
      }
    }
  },
  data () {
    return {

    }
  },
  created () {

  },
  methods: {
    getColor (index) {
      let colors = ['lightblue', 'lightgreen', 'lightcoral', 'lightyellow', 'lightskyblue', 'lightseagreen', 'lightgoldenrodyellow', 'lightpink']
      return colors[index ? index % colors.length : 0]
    },

    // 找出绘制坐标
    getPoints (radius, startX, startY, endX, endY) {
      let max = +(radius * 2).toFixed(2)
      let corners = [`${max}px 0px`, `${max}px ${max}px`, `0px ${max}px`, `0px 0px`]
      let isOrigin = endX === radius && endY === 0 // 末尾坐标是否回到原点
      let points = [`${radius}px ${radius}px`]
      let startQ = this.getQuadrant(radius, startX, startY)
      let endQ = this.getQuadrant(radius, endX, endY)

      // 起始坐标
      points.push(`${startX}px ${startY}px`)
      switch (startQ) {
        case 1: points.push(`${startX}px 0px`); break
        case 2: points.push(`${max}px ${startY}px`); break
        case 3: points.push(`${startX}px ${max}px`); break
        case 4: points.push(`0px ${startY}px`); break
      }

      // 经过边界坐标点
      points.push(...corners.slice(startQ - 1, isOrigin ? 4 : endQ))

      // 末尾坐标
      switch (endQ) {
        case 1: points.push(`${max}px ${endY}px`); break
        case 2: points.push(`${endX}px ${max}px`); break
        case 3: points.push(`0px ${endY}px`); break
        case 4: points.push(`${endX}px 0px`); break
      }
      points.push(`${endX}px ${endY}px`)

      console.log(points)
      return points
    },

    // 获取所在区域（按顺时针顺序）
    getQuadrant (radius, x, y) {
      if (x >= radius && y <= radius) {
        return 1
      } else if (x >= radius && y >= radius) {
        return 2
      } else if (x <= radius && y >= radius) {
        return 3
      } else if (x <= radius && y <= radius) {
        return 4
      }
    }
  },
  computed: {
    total () {
      let sum = 0
      this.values.forEach(item => {
        sum += (+item.value)
      })
      return sum
    },
    items () {
      const total = this.total
      let result = []
      let start = 0
      this.values.forEach((item, index) => {
        let value = +item.value
        let data = {
          index: index,
          startProportion: start ? start / total : 0,
          proportion: value ? value / total : 0
        }
        result.push(Object.assign(data, item))
        start += value
      })
      console.log(result)
      return result
    },
    size () {
      return this.radius * 2
    },
    circleStyle () {
      return {
        'width': this.size + 'px',
        'height': this.size + 'px',
        'background-color': this.bgColor
      }
    },
    progressStyle () {
      return (item) => {
        let {startProportion, proportion} = item
        let endProportion = startProportion + proportion
        let isZero = proportion === 0
        let size = isZero ? 0 : this.size
        let radius = this.radius
        // 2 * Math.PI = 360 * Math.PI / 2
        let startDegrees = 2 * Math.PI * startProportion
        let endDegrees = 2 * Math.PI * endProportion
        let startX, startY, endX, endY
        startX = +(radius + radius * Math.sin(startDegrees)).toFixed(2)
        startY = +(radius + radius * (-Math.cos(startDegrees))).toFixed(2)
        endX = +(radius + radius * Math.sin(endDegrees)).toFixed(2)
        endY = +(radius + radius * (-Math.cos(endDegrees))).toFixed(2)

        return {
          'width': size + 'px',
          'height': size + 'px',
          'border-width': (isZero ? 0 : this.width) + 'px',
          'border-color': item.color || this.getColor(item.index),
          'background-color': this.bgColor,
          'clip-path': isZero ? 'unset' : `polygon(${this.getPoints(radius, startX, startY, endX, endY).join(',')})`
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .progress-circle{
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    .progress-line{
      border-radius: 50%;
      border-style: solid;
      cursor: pointer;
      position: absolute;
      transition: ease all .2s;
      &:hover{
        transform: scale(1.2);
      }
    }
  }
</style>

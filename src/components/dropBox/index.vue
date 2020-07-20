<template>
  <div class="drop-box" :style="getBoxStyle()" @mousedown="eleMouseDown($event)">
    <div class="handle-dot">
      <em :class="'dot '+dotName"
          v-for="(dotName,index) in dots"
          :key="index"
          :style="{cursor:cursorObject[dotName]}"></em>
      <em class="dot link-rb"
          v-if="hotspot"
          :style="{cursor:cursorObject['link-rb']}"></em>
      <em class="dot rotate"></em>
    </div>
  </div>
</template>

<script>
/***
 * eleScale 目前缩放存在问题
 */
export default {
  name: 'dropBox',
  props: {
    box: {
      type: Object,
      default () {
        return {
          status: {
            width: 200,
            height: 200,
            left: 0,
            top: 0,
            opacity: 1,
            rotate: 0
          }
        }
      },
      require: true
    },
    // dropBox的父元素
    parentBox: {
      type: String
    },
    // 热区模式
    hotspot: {
      type: Boolean,
      default () {
        return false
      }
    }
  },
  data () {
    return {
      status: {},
      dots: ['lt', 'mt', 'rt', 'lm', 'rm', 'lb', 'mb', 'rb'],
      cursorObject: {
        lt: 'nw-resize',
        mt: 'n-resize',
        rt: 'ne-resize',
        lm: 'w-resize',
        rm: 'e-resize',
        lb: 'sw-resize',
        mb: 's-resize',
        rb: 'se-resize',
        'link-rb': 'se-resize'
      }
    }
  },
  methods: {
    /**
       * drop-box 基本样式
       */
    getBoxStyle () {
      const status = this.box.status
      return {
        position: 'absolute',
        width: status.width + 'px',
        height: status.height + 'px',
        left: status.left + 'px',
        top: status.top + 'px',
        opacity: status.opacity,
        transform: `rotate(${status.rotate}deg)`
      }
    },

    eleMouseDown (e) {
      if (e.shiftKey) {
        console.log(e.shiftKey)
      } else {
        this.elMouseDownInit(e)
      }
    },

    elMouseDownInit (e) {
      let box = this.box
      let workbench = this.workbench
      let status = {
        startModuleLeft: box.status.left,
        startModuleTop: box.status.top,
        startPointX: e.clientX,
        startPointY: e.clientY,
        lastMouseE: e, // 记录下鼠标在拖动过程中最后停留点
        startScrollTop: workbench.scrollTop,
        startScrollLeft: workbench.scrollLeft
      }
      this.$set(this, 'status', status)

      let currentDot = null
      let currentClasses = e.target.className

      // dots 处理
      this.dots.forEach(dotName => {
        if (currentClasses.indexOf('dot ' + dotName) !== -1) {
          currentDot = dotName
        }
      })
      if (currentClasses === 'dot link-rb') {
        currentDot = 'link-rb'
      }
      let isRotate = currentClasses.indexOf('rotate') !== -1
      this.status.currentDot = currentDot
      this.status.isRotate = isRotate

      document.addEventListener('mousemove', this.eleMouseMove)
      workbench.addEventListener('scroll', this.benchScroll)
      document.addEventListener('mouseup', this.elMouseUp)
    },

    eleMouseMove (e) {
      e.preventDefault()
      let {status} = this
      if (!status) return
      if (status.currentDot) {
        this.eleScale(e, status)
      } else if (status.isRotate) {
        this.eleRotate(e)
      } else {
        this.eleMove(e, status)
      }
    },

    elMouseUp () {
      this.status = null
      document.removeEventListener('mousemove', this.eleMouseMove)
      document.removeEventListener('mouseup', this.elMouseUp)
      this.workbench.removeEventListener('scroll', this.benchScroll)
    },

    eleScale (e, status) {
      let {currentDot} = status
      let box = this.box
      let boxStatus = box.status

      if (currentDot === 'link-rb') {
        let coordinateX = boxStatus.width + e.clientX - status.startPointX
        let coordinateY = boxStatus.height + e.clientY - status.startPointY
        if (coordinateX <= 10) {
          coordinateX = 10
        }
        if (coordinateY <= 15) {
          coordinateY = 15
        }

        boxStatus.width = coordinateX
        boxStatus.height = coordinateY
        return
      }

      let flag = 1
      let testRotate = parseInt(boxStatus.rotate) * Math.PI / 180
      let k = Math.tan(Math.PI / 2 - testRotate)
      if (['mt', 'mb'].includes(currentDot)) {
        k = Math.tan(-testRotate)
      }
      // coordinateX、Y为x/y坐标实际增加的量（/this.viewerSize就可以加到数据上）
      let coordinateX = e.clientX - status.startPointX
      let coordinateY = status.startPointY - e.clientY
      // 原来length1还除以了 / Math.sin(this.kDia),导致高度增加而宽度不变时 此值无限接近0，拖动mb/bt时高度飞速变化
      let length1 = Math.abs(k * coordinateX - coordinateY) / Math.sqrt(Math.pow(k, 2) + 1)
      let testY = k * (e.clientX - status.startPointX)

      if (['mt', 'mb'].includes(currentDot)) {
        flag = (status.startPointY - e.clientY) < testY ? flag : -flag
        flag = (Math.cos(testRotate) < 0) ? -flag : flag
        flag = ['mt'].includes(currentDot) ? -flag : flag
      } else {
        flag = (status.startPointY - e.clientY) < testY ? flag : -flag
        flag = (testRotate > Math.PI) ? -flag : flag
        flag = ['lt', 'lb', 'lm'].includes(currentDot) ? -flag : flag
      }
      // 如果kDia不存在，就用 bound记录的原始kDia
      let kDia = this.kDia || Math.atan(boxStatus.width / boxStatus.height)
      // 如果是斜轴拖放，kDia永远是 bound中记录的值
      if (['rt', 'rb', 'lt', 'lb'].includes(currentDot)) {
        kDia = Math.atan(boxStatus.width / boxStatus.height)
      }
      // offsetX/offsetY单位为 rem
      let offsetX = Math.sin(kDia) * length1 * flag
      let offsetY = Math.cos(kDia) * length1 * flag

      // 以下几行代码自定义了 宽度拖放和高度拖放的行为，所以他们可以随意改变kDia
      if (['rm', 'lm'].includes(currentDot)) {
        offsetY = 0
        offsetX = length1 * flag
        if (offsetX + boxStatus.width <= 1) offsetX = -boxStatus.width + 1
      } else if (['mt', 'mb'].includes(currentDot)) {
        offsetX = 0
        offsetY = length1 * flag
        if (offsetY + boxStatus.height <= 1) offsetY = -boxStatus.height + 1
      } else {
        // 这里是斜轴拖放，某轴小于1，就把该轴置为1，另一轴等比
        if (offsetX + boxStatus.width <= 1) {
          offsetX = -boxStatus.width + 1
          offsetY = offsetX / Math.tan(kDia)
        } else if (offsetY + boxStatus.height <= 1) {
          offsetY = -boxStatus.height + 1
          offsetX = offsetY * Math.tan(kDia)
        }
      }

      // 1、宽高变
      boxStatus.height = boxStatus.height + offsetY
      boxStatus.width = boxStatus.width + offsetX

      if (boxStatus.width < 0 || boxStatus.height < 0) return
      // 2、横纵轴变
      if (['rm', 'lm', 'mt', 'mb'].includes(currentDot)) {
        // 这里的top/left区域的改变 还要修改
        let testR1 = Math.sqrt(Math.pow(boxStatus.width, 2) + Math.pow(boxStatus.height, 2))
        let testR2 = Math.sqrt(Math.pow(boxStatus.width, 2) + Math.pow(boxStatus.height, 2))

        let testZ1 = Math.atan(boxStatus.width / boxStatus.height) - testRotate / 2
        let testZ2 = Math.atan(boxStatus.width / boxStatus.height) - testRotate / 2
        let testL1 = 2 * Math.sin(testRotate / 2) * testR1 / 2
        let testL2 = 2 * Math.sin(testRotate / 2) * testR2 / 2
        let offsetLeft = testL2 * Math.cos(testZ2) - testL1 * Math.cos(testZ1)
        let offsetTop = testL2 * Math.sin(testZ2) - testL1 * Math.sin(testZ1)
        let newLeft = boxStatus.left - offsetLeft
        let newTop = boxStatus.top + offsetTop
        if (['lm'].includes(currentDot)) {
          newLeft -= offsetX * Math.cos(testRotate)
          newTop -= offsetX * Math.sin(testRotate)
        } else if (['mt'].includes(currentDot)) {
          newLeft += offsetY * Math.sin(testRotate)
          newTop -= offsetY * Math.cos(testRotate)
        }
        boxStatus.left = newLeft
        boxStatus.top = newTop
      } else if (['rb', 'rt', 'lb', 'lt'].includes(currentDot)) {
        // 3、斜轴变
        let testR1 = Math.sqrt(Math.pow(boxStatus.width, 2) + Math.pow(boxStatus.height, 2))
        let testR2 = testR1 + length1 * flag
        let xOffset1 = testR1 * Math.sin(testRotate / 2) * Math.cos(kDia - testRotate / 2)
        let xOffset2 = testR2 * Math.sin(testRotate / 2) * Math.cos(kDia - testRotate / 2)
        let yOffset1 = testR1 * Math.sin(testRotate / 2) * Math.sin(kDia - testRotate / 2)
        let yOffset2 = testR2 * Math.sin(testRotate / 2) * Math.sin(kDia - testRotate / 2)
        let newLeft = boxStatus.left - (xOffset2 - xOffset1)
        let newTop = boxStatus.top + (yOffset2 - yOffset1)
        if (['lb'].includes(currentDot)) {
          newLeft -= offsetX * Math.cos(testRotate)
          newTop -= offsetX * Math.sin(testRotate)
        } else if (['rt'].includes(currentDot)) {
          newLeft += offsetY * Math.sin(testRotate)
          newTop -= offsetY * Math.cos(testRotate)
        } else if (['lt'].includes(currentDot)) {
          newLeft -= length1 * flag * Math.cos(testRotate + Math.PI / 2 - kDia)
          newTop -= length1 * flag * Math.sin(testRotate + Math.PI / 2 - kDia)
        }
        boxStatus.left = newLeft
        boxStatus.top = newTop
      }
    },

    eleRotate (e) {
      let realAreaBounding = this.workbench.getBoundingClientRect()
      let boxStatus = this.box.status
      let center = {
        x: (boxStatus.left + boxStatus.width / 2),
        y: (boxStatus.top + boxStatus.height / 2)
      }
      let moveEvent = {
        x: e.clientX - realAreaBounding.left,
        y: e.clientY - realAreaBounding.top
      }
      let length1 = Math.sqrt(Math.pow(moveEvent.x - center.x, 2) + Math.pow(moveEvent.y - center.y, 2))
      let length2 = Math.abs(moveEvent.x - center.x)
      let angle = Math.asin(length2 / length1) * 180 / Math.PI
      if (moveEvent.y < center.y && moveEvent.x <= center.x) {
        angle = 180 - angle
      } else if (moveEvent.x > center.x) {
        if (moveEvent.y <= center.y) {
          angle = 180 + angle
        } else {
          angle = 360 - angle
        }
      }
      // 30° 吸附
      let integer = Math.round(angle / 30)
      if (Math.abs(angle - integer * 30) <= 2) angle = integer * 30
      boxStatus.rotate = angle
    },

    eleMove (e, status) {
      status.lastMouseE = e
      let boxStatus = this.box.status
      let xOffset = e.clientX - status.startPointX + (this.workbench.scrollLeft - status.startScrollLeft)
      let yOffset = e.clientY - status.startPointY + (this.workbench.scrollTop - status.startScrollTop)
      boxStatus.left = status.startModuleLeft + xOffset
      boxStatus.top = status.startModuleTop + yOffset
    },

    benchScroll () {
      if (!this.status) return
      let status = this.status
      // 手动调用move
      this.eleMove(status.lastMouseE, status)
    }
  },
  computed: {
    workbench () {
      let el = this.parentBox || 'body'
      return document.querySelector(el)
    },
    kDia () {
      return Math.atan(this.box.status.width / this.box.status.height)
    }
  }
}
</script>

<style lang="scss" scoped>
  @mixin dashedBorder {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    left: -1px;
    top: -1px;
  }

  @mixin allBorderPseudo{
    /* 白色实线 */
    &::before {
      @include dashedBorder;
      border: 1px solid #fff;
      pointer-events: none;
    }
    /* 虚线 */
    &::after {
      @include dashedBorder;
      border: 1px dashed #666;
      pointer-events: none;
    }
  }
  .dev{
    position: relative;
    /*overflow: hidden;*/
    .drop-box{
      touch-action: none;
      user-select: none;
      background-color: rgba(64,158,255,.3);
      cursor: move;
      @include allBorderPseudo;
      .handle-dot {
        display: block;
        cursor: move;
        pointer-events: auto;
        .dot {
          position: absolute;
          display: inline-block;
          border: 1px solid #666;
          background: #fff;
          width: 8px;
          height: 8px;
          z-index: 2;
          &.lt {
            top: -5px;
            left: -5px;
            cursor: nw-resize;
          }
          &.mt {
            top: -5px;
            left: calc(50% - 5px);
            cursor: n-resize;
          }
          &.rt {
            top: -5px;
            right: -5px;
            cursor: ne-resize;
          }
          &.lm {
            top: calc(50% - 5px);
            left: -5px;
            cursor: w-resize;
          }
          &.rm {
            top: calc(50% - 5px);
            right: -5px;
            cursor: e-resize;
          }
          &.lb {
            bottom: -5px;
            left: -5px;
            cursor: sw-resize;
          }
          &.mb {
            bottom: -5px;
            left: calc(50% - 5px);
            cursor: s-resize;
          }
          &.rb {
            bottom: -5px;
            right: -5px;
            cursor: se-resize;
          }
          &.link-rb{
            width: 20px;
            height: 20px;
            background-color: #409eff;
            background-image:url(https://res.cxb123.com/lottery-editor/img/imgeditor-back.png);
            background-position: -270px -400px;
            border: none;
            border-radius: 10px;
            bottom: -10px;
            right: -10px;
            cursor: se-resize;
          }
          &.rotate {
            background: url("data:image/svg+xml;charset=utf-8,<svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 18 18' fill='%23757575'><circle fill='%23fff' cx='9' cy='9' r='8'/><path d='M13.864 3.82a.22.22 0 0 0-.24.048L12.5 4.992a5.26 5.26 0 0 0-3.432-1.268 5.25 5.25 0 0 0-3.731 1.545A5.25 5.25 0 0 0 3.792 9a5.25 5.25 0 0 0 1.545 3.731 5.25 5.25 0 0 0 3.731 1.545 5.25 5.25 0 0 0 3.731-1.545.794.794 0 0 0-1.123-1.123 3.663 3.663 0 0 1-2.608 1.08C7.035 12.688 5.38 11.034 5.38 9s1.654-3.688 3.688-3.688c.848 0 1.652.284 2.304.808l-1.057 1.057a.22.22 0 0 0 .156.376h3.309a.22.22 0 0 0 .22-.221V4.024a.221.221 0 0 0-.136-.204z'/></svg>");
            bottom: 0;
            left: 50%;
            background-size: 100%;
            width: 18px;
            height: 18px;
            cursor: pointer;
            border: none;
            transform: translate(-50%, calc(100% + 20px));
            z-index: 1;
            @mixin rotateLine {
              content: ' ';
              position: absolute;
              height: 20px;
              left: 50%;
              top: 0;
              transform: translate(-50%, -20px);
            }
            &::before {
              @include rotateLine;
              border-left: 1px solid #fff;
              z-index: 1;
            }
            &::after {
              @include rotateLine;
              border-left: 1px dashed #666;
              z-index: 2;
            }
          }
        }
      }
    }
  }
</style>

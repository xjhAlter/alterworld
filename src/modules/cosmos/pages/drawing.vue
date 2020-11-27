<template>
  <div class="drawing">
    <div class="header">
      <div>
        <div class="iconfont menu cursor-pointer left-tool-icon" :style="{color: leftToolShow ? '#409eff' : ''}" v-if="!isPc" @click="showLeftTool"></div>
      </div>
      <div>
        <button class="aw-btn" @click="save">保存到本地</button>
        <button class="aw-btn" @click="redraw">撤销</button>
        <button class="aw-btn" @click="clear(true)">清空</button>
      </div>
    </div>
    <div class="left-tool" :class="{'mobile-left-tool' : !isPc && !leftToolShow, 'mlt-show' : !!leftToolShow}">
      <div class="tool-row">
        <div class="tool-title">图形</div>
        <div class="tool-content type-content">
          <div class="type-box" :class="{'active': drawData.type === 'pencil'}" @click="changeType('pencil')"><span class="iconfont pencil"></span></div>
          <div class="type-box" :class="{'active': drawData.type === 'line'}" @click="changeType('line')"><span class="iconfont line"></span></div>
          <div class="type-box" :class="{'active': drawData.type === 'rectangle'}" @click="changeType('rectangle')"><span class="iconfont rectangle"></span></div>
          <div class="type-box" :class="{'active': drawData.type === 'circle'}" @click="changeType('circle')"><span class="iconfont circle"></span></div>
        </div>
      </div>
      <div class="tool-row">
        <div class="tool-title">颜色</div>
        <div class="tool-content color-content">
          <div class="color-row">
            <label>轮廓</label>
            <el-color-picker v-model="drawData.strokeStyle" size="medium" show-alpha></el-color-picker>
          </div>
          <div class="color-row">
            <label>填充</label>
            <el-color-picker v-model="drawData.fillStyle" size="medium" show-alpha></el-color-picker>
          </div>
          <div class="color-row">
            <el-checkbox v-model="drawData.fill">填充图形</el-checkbox>
          </div>
        </div>
      </div>
      <div class="tool-row">
        <div class="tool-title">画板</div>
        <div class="tool-content color-content">
          <div class="color-row">
            <label>宽度</label>
            <el-input v-model="canvasSize.width" placeholder="宽度"></el-input>
          </div>
          <div class="color-row">
            <label>高度</label>
            <el-input v-model="canvasSize.height" placeholder="高度"></el-input>
          </div>
        </div>
      </div>
    </div>
    <div class="workbench" :class="isPc ? '' : 'mobile-workbench'">
      <div class="canvas-wrapper" :style="{width: canvasSize.width + 'px',height: canvasSize.height + 'px'}">
        <canvas id="canvas" :width="canvasSize.width" :height="canvasSize.height"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'drawing',
  data () {
    return {
      canvas: null,
      ctx: null,
      canvasSize: {
        width: 1366,
        height: 768
      },
      drawData: {
        type: 'pencil', // 枚举值：['pencil','line','rectangle','circle']
        startX: 0,
        startY: 0,
        endX: 0,
        endY: 0,
        fill: false,
        fillStyle: '#fff',
        strokeStyle: '#333'
      },
      moving: false,
      cacheImage: null,
      history: [],
      leftToolShow: false
    }
  },
  mounted () {
    this.initCanvas()
    window.onresize = this.initCanvas
    setTimeout(() => {
      let canvas = document.getElementById('canvas')
      let ctx = canvas.getContext('2d')
      this.$set(this, 'canvas', canvas)
      this.$set(this, 'ctx', ctx)
      if (this.isPc) {
        canvas.addEventListener('mousedown', this.mousedown)
        canvas.addEventListener('mousemove', this.mousemove)
        document.body.addEventListener('keydown', this.keydown)
      } else {
        canvas.addEventListener('touchstart', this.touchstart)
        canvas.addEventListener('touchmove', this.touchmove)
      }
    }, 0)
  },
  beforeDestroy () {
    document.body.removeEventListener('keydown', this.keydown)
  },
  methods: {
    initCanvas () {
      let {innerWidth, innerHeight} = window
      if (innerWidth <= 1550) {
        this.$set(this.canvasSize, 'width', innerWidth - (this.isPc ? 180 : 0) - 60)
      }
      if (innerHeight <= 840) {
        this.$set(this.canvasSize, 'height', innerHeight - 70 - 60)
      }
    },
    changeType (type) {
      this.$set(this.drawData, 'type', type)
      if (this.leftToolShow) {
        this.showLeftTool()
      }
    },
    mousedown (e) {
      this.moving = true
      this.drawData.startX = e.offsetX
      this.drawData.startY = e.offsetY
      this.cacheImage = this.ctx.getImageData(0, 0, this.canvasSize.width, this.canvasSize.height)
      if (this.drawData.type === 'pencil') {
        this.ctx.beginPath()
        this.ctx.moveTo(this.drawData.startX, this.drawData.startY)
      }
      document.body.addEventListener('mouseup', this.mouseup)
    },
    mousemove (e) {
      if (this.moving) {
        this.drawData.endX = e.offsetX
        this.drawData.endY = e.offsetY
        this.draw(this.drawData)
      }
    },
    mouseup () {
      if (this.moving) {
        this.moving = false
        // 将此次操作存入history数组
        this.history.push(JSON.parse(JSON.stringify(this.drawData)))
      }
      document.body.removeEventListener('mouseup', this.mouseup)
    },
    draw (drawData, isRedraw) {
      let {type, startX, startY, endX, endY, fill, fillStyle, strokeStyle} = drawData
      this.ctx.strokeStyle = strokeStyle
      if (fill) {
        this.ctx.fillStyle = fillStyle
      }
      if (!isRedraw && type !== 'pencil') {
        this.ctx.putImageData(this.cacheImage, 0, 0)
      }
      if (type === 'pencil') {
        this.ctx.lineTo(endX, endY)
        this.ctx.stroke()
        if (!isRedraw) {
          this.history.push(JSON.parse(JSON.stringify(drawData)))
        }
      } else if (type === 'line') {
        this.ctx.beginPath()
        this.ctx.moveTo(startX, startY)
        this.ctx.lineTo(endX, endY)
        this.ctx.stroke()
      } else if (type === 'rectangle') {
        this.ctx.strokeRect(startX, startY, endX - startX, endY - startY)
        if (fill) {
          this.ctx.fillRect(startX, startY, endX - startX, endY - startY)
        }
      } else if (type === 'circle') {
        this.ctx.beginPath()
        let rx = (endX - startX) / 2
        let ry = (endY - startY) / 2
        let r = Math.sqrt(rx * rx + ry * ry)
        this.ctx.arc(rx + startX, ry + startY, r, 0, Math.PI * 2) // 第6个参数默认是false-顺时针
        if (fill) {
          this.ctx.fill()
        }
        this.ctx.stroke()
      }
    },
    clear (isManual) {
      this.ctx.clearRect(0, 0, this.canvasSize.width, this.canvasSize.height)
      if (isManual) {
        // 手动的清空，记录到历史中
        this.history.push(JSON.parse(JSON.stringify({type: 'clear'})))
      }
    },
    redraw () {
      this.clear()
      if (this.history.length) {
        let popDraw = this.history.pop()
        if (popDraw.type === 'pencil') {
          let lastDraw = this.history[this.history.length - 1]
          while (this.history.length && lastDraw.type === 'pencil' && lastDraw.startX === popDraw.startX && lastDraw.startY === popDraw.startY) {
            this.history.pop()
            lastDraw = this.history[this.history.length - 1]
          }
        }
      }
      if (this.history.length) {
        let startX = -100
        let startY = -100
        this.history.forEach(data => {
          if (data.type === 'clear') {
            this.clear()
          } else {
            if (data.type === 'pencil' && data.startX !== startX && data.startY !== startY) {
              this.ctx.beginPath()
              this.ctx.moveTo(data.startX, data.startY)
            }
            startX = data.startX
            startY = data.startY
            this.draw(data, true)
          }
        })
      }
    },
    keydown (e) {
      // 监听Ctrl + z
      if (e.ctrlKey && e.keyCode === 90) {
        this.redraw()
      }
    },
    save () {
      let link = document.createElement('a')
      let imgData = this.canvas.toDataURL({format: 'png', quality: 1, width: this.canvasSize.width, height: this.canvasSize.height})
      let blob = dataURLtoBlob(imgData)
      link.download = `draw_${new Date().format()}.png`
      link.href = URL.createObjectURL(blob)
      link.click()

      function dataURLtoBlob (dataUrl) {
        let arr = dataUrl.split(',')
        let mime = arr[0].match(/:(.*?);/)[1]
        let bStr = atob(arr[1])
        let n = bStr.length
        let u8arr = new Uint8Array(n)
        while (n--) {
          u8arr[n] = bStr.charCodeAt(n)
        }
        return new Blob([u8arr], {type: mime})
      }
    },

    /**
     * 以下是手机端使用
     */
    touchstart (e) {
      let {left = 0, top = 0} = this.getCanvasRect()
      this.moving = true
      this.drawData.startX = e.touches[0].pageX - left
      this.drawData.startY = e.touches[0].pageY - top
      this.cacheImage = this.ctx.getImageData(0, 0, this.canvasSize.width, this.canvasSize.height)
      if (this.drawData.type === 'pencil') {
        this.ctx.beginPath()
        this.ctx.moveTo(this.drawData.startX, this.drawData.startY)
      }
      this.canvas.addEventListener('touchend', this.touchend)
    },
    touchmove (e) {
      if (this.moving) {
        let {left = 0, top = 0} = this.getCanvasRect()
        this.drawData.endX = e.touches[0].pageX - left
        this.drawData.endY = e.touches[0].pageY - top
        this.draw(this.drawData)
      }
    },
    touchend () {
      if (this.moving) {
        this.moving = false
        // 将此次操作存入history数组
        this.history.push(JSON.parse(JSON.stringify(this.drawData)))
      }
      this.canvas.removeEventListener('touchend', this.touchend)
    },
    getCanvasRect () {
      if (this.canvas) {
        return this.canvas.getBoundingClientRect()
      } else {
        return {}
      }
    },
    showLeftTool () {
      this.$set(this, 'leftToolShow', !this.leftToolShow)
      if (this.leftToolShow) {
        document.body.ontouchstart = _listenTouch.bind(this)
      } else {
        document.body.removeEventListener('touchstart', _listenTouch)
      }

      function _listenTouch (e) {
        let eventPath = e.path || (e.composedPath && e.composedPath())
        if (eventPath) {
          let closeFlag = true
          for (let el of eventPath) {
            if (el.className && (el.className.indexOf('left-tool') > -1 || el.className.indexOf('el-color') > -1)) {
              closeFlag = false
              break
            }
          }
          if (closeFlag) {
            this.$set(this, 'leftToolShow', false)
            document.body.removeEventListener('touchstart', _listenTouch)
          }
        }
      }
    }
  },
  computed: {
    isPc () {
      // eslint-disable-next-line no-undef
      return $aw ? $aw.isPc() : true
    }
  }
}
</script>

<style lang="scss" scoped>
  .drawing {
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    .header {
      width: 100vw;
      height: 70px;
      background-color: #fff;
      border-bottom: 1px solid #d8d8d8;
      position: absolute;
      left: 0;
      top: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px;
    }
    .left-tool {
      width: 180px;
      height: calc(100vh - 70px);
      background-color: #fff;
      border-right: 1px solid #d8d8d8;
      position: absolute;
      left: 0;
      top: 70px;
      transition: left ease .5s;
      z-index: 1;
      &.mobile-left-tool {
        left: -185px;
      }
      .tool-row {
        display: flex;
        flex-direction: column;
        .tool-title {
          width: 100%;
          height: 44px;
          display: flex;
          justify-content: center;
          align-items: center;
          border-bottom: 1px solid #d8d8d8;
          position: relative;
          &::after {
            content: '';
            width: 100px;
            height: 2px;
            background-color: #409eff;
            position: absolute;
            left: 50%;
            bottom: -1px;
            transform: translateX(-50%);
          }
        }
        .tool-content {
          padding: 20px;
          &.type-content {
            display: flex;
            flex-wrap: wrap;
            .type-box {
              width: 58px;
              height: 58px;
              border: 1px solid #d8d8d8;
              border-radius: 4px;
              margin-bottom: 20px;
              cursor: pointer;
              display: flex;
              justify-content: center;
              align-items: center;
              &:nth-child(2n){
                margin-left: 20px;
              }
              span {
                font-size: 30px;
              }
              &:hover,&.active {
                border: 1px solid #409eff;
                span {
                  color: #409eff;
                }
              }
            }
          }
          &.color-content {
            display: flex;
            flex-direction: column;
            .color-row {
              display: flex;
              align-items: center;
              justify-content: flex-start;
              margin-bottom: 10px;
              label {
                font-size: 14px;
                color: #333;
                margin-right: 10px;
                flex: 0 0 auto;
              }
            }
          }
        }
      }
    }
    .workbench {
      width: calc(100vw - 180px);
      height: calc(100vh - 70px);
      position: absolute;
      left: 180px;
      top: 70px;
      background-color: #f7f7f7;
      display: flex;
      justify-content: center;
      align-items: center;
      &.mobile-workbench {
        width: calc(100vw - 60px);
        left: 50%;
        transform: translateX(-50%);
      }
      .canvas-wrapper {
        background-color: #fff;
        outline: 1px solid #d8d8d8;
        overflow: hidden;
        /*background-size: 16px 16px;*/
        /*background-color: #fff;*/
        /*background-position: 0 0, 8px 8px;*/
        /*background-image: linear-gradient(to top right, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%, #ccc), linear-gradient(to top right, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%, #ccc);*/
      }
    }
  }
</style>

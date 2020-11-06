<template>
  <div class="drawing">
    <div class="header">

    </div>
    <div class="left-tool">
      <div @click="changeType('pencil')">pencil</div>
      <div @click="changeType('line')">line</div>
      <div @click="changeType('rectangle')">rectangle</div>
      <div @click="changeType('circle')">circle</div>
    </div>
    <div class="workbench">
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
        type: 'pencil', // 枚举值：['background','pencil','line','rectangle','circle']
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
      history: []
    }
  },
  mounted () {
    let canvas = document.getElementById('canvas')
    canvas.addEventListener('mousedown', this.mousedown)
    canvas.addEventListener('mousemove', this.mousemove)
    document.body.addEventListener('keydown', this.keydown)
    let ctx = canvas.getContext('2d')
    ctx.fillStyle = '#fff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    this.$set(this, 'canvas', canvas)
    this.$set(this, 'ctx', ctx)
  },
  beforeDestroy () {
    document.body.removeEventListener('keydown', this.keydown)
  },
  methods: {
    changeType (type) {
      this.$set(this.drawData, 'type', type)
    },
    mousedown (e) {
      this.moving = true
      this.drawData.startX = e.offsetX
      this.drawData.startY = e.offsetY
      this.cacheImage = this.ctx.getImageData(0, 0, this.canvasSize.width, this.canvasSize.height)
      if (this.drawData.type === 'pencil') {
        this.ctx.beginPath()
        this.ctx.moveTo(e.offsetX, e.offsetY)
      }
      document.body.addEventListener('mouseup', this.mouseup)
    },
    mousemove (e) {
      if (this.moving) {
        // 铅笔
        // this.ctx.lineTo(e.offsetX, e.offsetY)
        // this.ctx.stroke()

        // 直线
        // this.ctx.putImageData(this.cacheImage, 0, 0)
        // this.ctx.beginPath()
        // this.ctx.moveTo(this.drawData.startX, this.drawData.startY)
        // this.ctx.lineTo(e.offsetX, e.offsetY)
        // this.ctx.stroke()

        // 矩形
        // this.ctx.putImageData(this.cacheImage, 0, 0)
        // this.ctx.strokeRect(this.drawData.startX, this.drawData.startY, e.offsetX - this.drawData.startX, e.offsetY - this.drawData.startY)

        // 圆
        // this.ctx.putImageData(this.cacheImage, 0, 0)
        // this.ctx.beginPath()
        // let rx = (e.offsetX - this.drawData.startX) / 2
        // let ry = (e.offsetY - this.drawData.startY) / 2
        // let r = Math.sqrt(rx * rx + ry * ry)
        // this.ctx.arc(rx + this.drawData.startX, ry + this.drawData.startY, r, 0, Math.PI * 2) // 第6个参数默认是false-顺时针
        // this.ctx.stroke()

        this.drawData.endX = e.offsetX
        this.drawData.endY = e.offsetY
        this.draw(this.drawData)
      }
    },
    mouseup () {
      this.moving = false
      document.body.removeEventListener('mouseup', this.mouseup)
      // 将此次操作存入history数组
      this.history.push(JSON.parse(JSON.stringify(this.drawData)))
    },
    draw (drawData, isRedraw) {
      let {type, startX, startY, endX, endY, fill, fillStyle, strokeStyle} = drawData
      if (type === 'pencil') {
        // 有bug
        if (isRedraw) {
          this.ctx.moveTo(startX, startY)
        }
        this.ctx.lineTo(endX, endY)
        this.ctx.stroke()
        if (!isRedraw) {
          this.history.push(JSON.parse(JSON.stringify(drawData)))
        }
      } else if (type === 'line') {
        if (!isRedraw) {
          this.ctx.putImageData(this.cacheImage, 0, 0)
        }
        this.ctx.beginPath()
        this.ctx.moveTo(startX, startY)
        this.ctx.lineTo(endX, endY)
        this.ctx.stroke()
      } else if (type === 'circle') {
        if (!isRedraw) {
          this.ctx.putImageData(this.cacheImage, 0, 0)
        }
        this.ctx.beginPath()
        let rx = (endX - startX) / 2
        let ry = (endY - startY) / 2
        let r = Math.sqrt(rx * rx + ry * ry)
        this.ctx.arc(rx + startX, ry + startY, r, 0, Math.PI * 2) // 第6个参数默认是false-顺时针
        this.ctx.stroke()
      }
    },
    clear () {
      this.ctx.clearRect(0, 0, this.canvasSize.width, this.canvasSize.height)
      this.ctx.fillStyle = '#fff'
      this.ctx.fillRect(0, 0, this.canvasSize.width, this.canvasSize.height)
    },
    keydown (e) {
      // 监听Ctrl + z
      if (e.ctrlKey && e.keyCode === 90) {
        this.clear()
        this.history.pop()
        this.history.forEach(data => {
          this.draw(data, true)
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .drawing {
    position: relative;
    width: 100vw;
    height: 100vh;
    .header {
      width: 100vw;
      height: 70px;
      background-color: #fff;
      border-bottom: 1px solid #d8d8d8;
      position: absolute;
      left: 0;
      top: 0;
    }
    .left-tool {
      width: 180px;
      height: calc(100vh - 70px);
      background-color: #fff;
      border-right: 1px solid #d8d8d8;
      position: absolute;
      left: 0;
      top: 70px;
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
      .canvas-wrapper {
        background-size: 16px 16px;
        background-color: #fff;
        background-position: 0 0, 8px 8px;
        background-image: linear-gradient(to top right, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%, #ccc), linear-gradient(to top right, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%, #ccc);
        canvas {
          outline: 1px solid #d8d8d8;
        }
      }
    }
  }
</style>

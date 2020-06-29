<template>
  <div id="fkw">
    <div class="swiper-container">
      <div class="swiper-wrapper" :style="swiperStyle">
        <div class="swiper-item" id="swi-1">
          <div class="page-header flex">
            <div class="header-inner">
              <img class="header-logo" src="http://jz.faisys.com/image/baiduHome/v2/pro11_logo.png?v=201706221635" alt=""/>
              <img class="header-logo-text" src="http://jz.faisys.com/image/baiduHome/proVersion/proVer5/logo_tx.png?v=201706221635" alt=""/>
            </div>
          </div>
          <div v-show="currentPage === 1" class="page-content flex flex-column">
            <span class="main-text">3000套模板免费任换</span>
            <span class="sub-text">建站只要快.好.省</span>
            <div class="btn" @click="openPage">
              <span>免费注册</span>
            </div>
          </div>
        </div>
        <div class="swiper-item" id="swi-2">
          <div class="page-content"></div>
        </div>
        <div class="swiper-item" id="swi-3"></div>
        <div class="swiper-item" id="swi-4"></div>
        <div class="swiper-item" id="swi-5"></div>
        <div class="swiper-item" id="swi-6"></div>
        <div class="swiper-item" id="swi-7"></div>
      </div>
      <div class="swiper-pagination">
        <div class="swiper-page" :class="{'active-page': currentPage === i}" v-for="i in 7" @click="changePage(i)" :key="i">
          <div class="swiper-select"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/***
 * 源地址： https://ajz.fkw.com/pro11.html?_ta=310&kw=400&bd_vid=7936748617262039255
 */
export default {
  name: 'fkw',
  data () {
    return {
      clientHeight: 0, // 网页可见高度
      currentPage: 1, // 当前页
      scrollTimer: null
    }
  },
  mounted () {
    window.addEventListener('mousewheel', this.onScroll, false)
    this.clientHeight = document.body.clientHeight
  },
  methods: {
    /**
     * 监听鼠标滚轮滚动事件
     * @param e
     */
    onScroll (e) {
      if (!this.scrollTimer) {
        this.scrollTimer = setTimeout(() => {
          this.scrollTimer = null
        }, 500)
        // let direction = e.deltaY > 0 ? 'down' : 'up' // 该语句可以用来判断滚轮是向上滑动还是向下
        let index = this.currentPage
        if (e.deltaY > 0) {
          index = index < 7 ? index + 1 : 7
        } else {
          index = index > 1 ? index - 1 : 1
        }
        this.changePage(index)
      }
    },
    /**
     * 切换swiper
     * @param index
     */
    changePage (index) {
      this.$set(this, 'currentPage', index)
    },
    /**
     * 打开其他页面
     */
    openPage () {
      window.open('https://ajz.fkw.com/reg.html?bizType=0', '_blank')
    }
  },
  computed: {
    swiperStyle () {
      let offset = this.clientHeight * (this.currentPage - 1)
      return `transform: translate3d(0px, -${offset}px, 0px);`
    }
  }
}
</script>

<style lang="scss" scoped>
  #fkw{
    width: 100vw;
    position: relative;
    font-family: "微软雅黑", serif;
    @keyframes slideTop {
      0%{
        opacity: 0;
        transform: translateY(200px);
      }
      100%{
        opacity: 1;
        transform: translateY(0);
      }
    }
    @keyframes zoomIn {
      from{
        width: 0;
        height: 0;
        background-color: #3153ff;
      }
      to{
        width: 190px;
        height: 190px;
        background-color: transparent;
      }
    }
    .swiper-container{
      width: 100%;
      height: 100vh;
      overflow: hidden;
      position: relative;
      .swiper-wrapper{
        width: 100%;
        transition: ease all .5s;
        .swiper-item{
          width: 100%;
          height: 100vh;
          &#swi-1{
            background: url('http://jz.faisys.com/image/baiduHome/proVersion/proVer5/proBg1.jpg?v=201707170955') center 0 no-repeat;
            .page-header{
              width: 100%;
              height: 70px;
              background-color: #fff;
              flex: 0 0 auto;
              .header-inner{
                width: 1200px;
                height: 70px;
                display: flex;
                justify-content: space-between;
                align-items: center;
              }
            }
            .page-content{
              display: flex;
              flex: 1;
              color: #fff;
              animation: slideTop ease 1s forwards;
              .main-text{
                font-size: 60px;
                margin-top: 150px;
              }
              .sub-text{
                font-size: 28px;
                font-family: 宋体,serif;
              }
              .btn{
                width: 190px;
                height: 46px;
                border-radius: 10px;
                border: 1px solid #fff;
                font-size: 18px;
                text-align: center;
                line-height: 44px;
                margin-top: 60px;
                cursor: pointer;
                overflow: hidden;
                position: relative;
                &::after{
                  content: '';
                  width: 0;
                  height: 0;
                  border-radius: 50%;
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                  animation: zoomIn ease 1s infinite;
                }
                span{
                  position: relative;
                  z-index: 1;
                }
              }
            }
          }
          &#swi-2{
            background: url('http://jz.faisys.com/image/baiduHome/proVersion/proVer5/proBg2.jpg?v=201707170954') center 0 no-repeat;
          }
          &#swi-3{
            background-color: #fff;
          }
          &#swi-4{
            background-color: #fff;
          }
          &#swi-5{
            background-color: #fff;
          }
          &#swi-6{
            background-color: #fff;
          }
          &#swi-7{
            background: url('http://jz.faisys.com/image/baiduHome/proVersion/proVer5/proBg7.jpg?v=201707170954') center 0 no-repeat;
          }
        }
      }
      .swiper-pagination{
        display: flex;
        flex-direction: column;
        position: fixed;
        right: 70px;
        top: 50%;
        transform: translateY(-50%);
        .swiper-page{
          width: 14px;
          height: 14px;
          margin: 5px 0;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          border-radius: 50%;
          border: 1px solid transparent;
          .swiper-select{
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: #4b8de6;
          }
          &.active-page{
            border-color: #fdfdfd;
            .swiper-select{
              background-color: #c6deff;
            }
          }
        }
      }
    }
  }
</style>

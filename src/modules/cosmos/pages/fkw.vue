<template>
  <div id="fkw">
    <div class="swiper-container">
      <div class="swiper-wrapper" id="swiper" :style="swiperStyle">
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
          <div class="page-content flex flex-column">
            <span class="main-text" v-show="currentPage === 2">一套模板&nbsp;=&nbsp;三个网站</span>
            <span class="sub-text" v-show="currentPage === 2">电脑网站+手机网站+微网站</span>
            <div class="device-wrapper">
              <div class="mac-wrapper">
                <div class="mac-content" v-show="currentPage === 2">
                  <div class="scroll-img"></div>
                </div>
              </div>
              <div class="phone-wrapper">
                <div class="phone-content" v-show="currentPage === 2">
                  <div class="scroll-img"></div>
                </div>
              </div>
              <div class="wechat-wrapper"></div>
            </div>
            <div class="btn" @click="openPage" v-show="currentPage === 2">
              <span>免费注册</span>
            </div>
          </div>
        </div>
        <div class="swiper-item" id="swi-3">
          <div class="page-content flex flex-column">
            <div class="content-title flex" v-show="currentPage === 3">
              <div class="page-step step-1"></div>
              <div class="flex flex-column">
                <span class="main-text">企业官网模板</span>
                <span class="sub-text">高端大气的企业门面</span>
              </div>
            </div>
            <div class="pics-wrapper">
              <div class="pic pic-1" style="background-image: url('//jz.faisys.com/image/baiduHome/proVersion/proVer5/monitors_1_1.png?v=201707171524')"></div>
              <div class="pic pic-2" style="background-image: url('//jz.faisys.com/image/baiduHome/proVersion/proVer5/monitors_1_2.png?v=201707171524')"></div>
              <div class="pic pic-3" style="background-image: url('//jz.faisys.com/image/baiduHome/proVersion/proVer5/monitors_1_3.png?v=201707171524')"></div>
              <div class="pic pic-4" style="background-image: url('//jz.faisys.com/image/baiduHome/proVersion/proVer5/monitors_1_4.png?v=201707171524')"></div>
              <div class="pic pic-5" style="background-image: url('//jz.faisys.com/image/baiduHome/proVersion/proVer5/monitors_1_5.png?v=201707171524')"></div>
              <div class="pic pic-6" style="background-image: url('//jz.faisys.com/image/baiduHome/proVersion/proVer5/monitors_1_6.png?v=201707171524')"></div>
              <div class="flex more" @click="openPage">
                <div class="more-icon"></div>
                <span>了解更多</span>
              </div>
            </div>
            <div class="btn" @click="openPage" v-show="currentPage === 3">
              <span>免费使用</span>
            </div>
          </div>
        </div>
        <div class="swiper-item" id="swi-4">
          <div class="page-content flex flex-column">
            <div class="content-title flex" v-show="currentPage === 4">
              <div class="page-step step-2"></div>
              <div class="flex flex-column">
                <span class="main-text">营销型网站模板</span>
                <span class="sub-text">轻松获取更多订单</span>
              </div>
            </div>
            <div class="pics-wrapper">
              <div class="pic pic-1" style="background-image: url('//jz.faisys.com/image/baiduHome/proVersion/proVer5/monitors_2_1.png?v=201707171524')"></div>
              <div class="pic pic-2" style="background-image: url('//jz.faisys.com/image/baiduHome/proVersion/proVer5/monitors_2_2.png?v=201707171524')"></div>
              <div class="pic pic-3" style="background-image: url('//jz.faisys.com/image/baiduHome/proVersion/proVer5/monitors_2_3.png?v=201707171524')"></div>
              <div class="pic pic-4" style="background-image: url('//jz.faisys.com/image/baiduHome/proVersion/proVer5/monitors_2_4.png?v=201707171524')"></div>
              <div class="pic pic-5" style="background-image: url('//jz.faisys.com/image/baiduHome/proVersion/proVer5/monitors_2_5.png?v=201707171524')"></div>
              <div class="pic pic-6" style="background-image: url('//jz.faisys.com/image/baiduHome/proVersion/proVer5/monitors_2_6.png?v=201707171524')"></div>
              <div class="flex more" @click="openPage">
                <div class="more-icon"></div>
                <span>了解更多</span>
              </div>
            </div>
            <div class="btn" @click="openPage" v-show="currentPage === 4">
              <span>免费使用</span>
            </div>
          </div>
        </div>
        <div class="swiper-item" id="swi-5">
          <div class="page-content flex flex-column">
            <div class="content-title flex" v-show="currentPage === 5">
              <div class="page-step step-3"></div>
              <div class="flex flex-column">
                <span class="main-text">在线商城模板</span>
                <span class="sub-text">在线交易一站式全搞定</span>
              </div>
            </div>
            <div class="pics-wrapper">
              <div class="pic pic-1" style="background-image: url('//jz.faisys.com/image/baiduHome/proVersion/proVer5/monitors_3_1.png?v=201707171524')"></div>
              <div class="pic pic-2" style="background-image: url('//jz.faisys.com/image/baiduHome/proVersion/proVer5/monitors_3_2.png?v=201707171524')"></div>
              <div class="pic pic-3" style="background-image: url('//jz.faisys.com/image/baiduHome/proVersion/proVer5/monitors_3_3.png?v=201707171524')"></div>
              <div class="pic pic-4" style="background-image: url('//jz.faisys.com/image/baiduHome/proVersion/proVer5/monitors_3_4.png?v=201707171524')"></div>
              <div class="pic pic-5" style="background-image: url('//jz.faisys.com/image/baiduHome/proVersion/proVer5/monitors_3_5.png?v=201707171524')"></div>
              <div class="pic pic-6" style="background-image: url('//jz.faisys.com/image/baiduHome/proVersion/proVer5/monitors_3_6.png?v=201707171524')"></div>
              <div class="flex more" @click="openPage">
                <div class="more-icon"></div>
                <span>了解更多</span>
              </div>
            </div>
            <div class="btn" @click="openPage" v-show="currentPage === 5">
              <span>免费使用</span>
            </div>
          </div>
        </div>
        <div class="swiper-item" id="swi-6">
          <div class="page-content flex flex-column">
            <div class="content-title flex" v-show="currentPage === 6">
              <div class="page-step step-4"></div>
              <div class="flex flex-column">
                <span class="main-text">通用型网站模板</span>
                <span class="sub-text">只为找到适合你的那一款</span>
              </div>
            </div>
            <div class="pics-wrapper">
              <div class="pic pic-1" style="background-image: url('//jz.faisys.com/image/baiduHome/proVersion/proVer5/monitors_4_1.png?v=201707171524')"></div>
              <div class="pic pic-2" style="background-image: url('//jz.faisys.com/image/baiduHome/proVersion/proVer5/monitors_4_2.png?v=201707171524')"></div>
              <div class="pic pic-3" style="background-image: url('//jz.faisys.com/image/baiduHome/proVersion/proVer5/monitors_4_3.png?v=201707171524')"></div>
              <div class="pic pic-4" style="background-image: url('//jz.faisys.com/image/baiduHome/proVersion/proVer5/monitors_4_4.png?v=201707171524')"></div>
              <div class="pic pic-5" style="background-image: url('//jz.faisys.com/image/baiduHome/proVersion/proVer5/monitors_4_5.png?v=201707171524')"></div>
              <div class="pic pic-6" style="background-image: url('//jz.faisys.com/image/baiduHome/proVersion/proVer5/monitors_4_6.png?v=201707171524')"></div>
              <div class="flex more" @click="openPage">
                <div class="more-icon"></div>
                <span>了解更多</span>
              </div>
            </div>
            <div class="btn" @click="openPage" v-show="currentPage === 6">
              <span>更多免费模板</span>
            </div>
          </div>
        </div>
        <div class="swiper-item" id="swi-7">
          <div class="page-content flex flex-column">
            <span class="main-text" v-show="currentPage === 7">一键获取属于您的网站</span>
            <div class="steps-wrapper flex justify-between">
              <div class="step-wrapper flex flex-column justify-start">
                <div class="step-icon-wrapper flex">
                  <div class="account-icon"></div>
                </div>
                <span class="step-main-text">注册账号</span>
                <span class="step-sub-text">10秒注册，即拥有免费域名，<br/>免费空间，免费网站</span>
              </div>
              <div class="arrow-icon"></div>
              <div class="step-wrapper flex flex-column justify-start">
                <div class="step-icon-wrapper flex">
                  <div class="document-icon"></div>
                </div>
                <span class="step-main-text">选择模板</span>
                <span class="step-sub-text">全行业覆盖，3000套成品<br/>模板，一站式免费</span>
              </div>
              <div class="arrow-icon"></div>
              <div class="step-wrapper flex flex-column justify-start">
                <div class="step-icon-wrapper flex">
                  <div class="pc-icon"></div>
                </div>
                <span class="step-main-text">生成网站</span>
                <span class="step-sub-text">自由拖拽功能模板，随时修<br/>改网站内容</span>
              </div>
            </div>
            <div class="btn" @click="openPage" v-show="currentPage === 7">
              <span>免费获取</span>
            </div>
            <div class="footer">
              <span>Copyright © 2010-2020 仅供学习参考</span>
            </div>
          </div>
        </div>
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
      scrollTimer: null,
      startx: 0,
      starty: 0
    }
  },
  mounted () {
    window.addEventListener('mousewheel', this.onScroll, false)
    this.clientHeight = document.body.clientHeight

    // 适配移动端的滑动 (参考链接：https://blog.csdn.net/qq_39198420/article/details/76502267)
    let swiper = document.getElementById('swiper')

    // 获得角度
    function getAngle (angx, angy) {
      return Math.atan2(angy, angx) * 180 / Math.PI
    }

    // 根据起点终点返回方向 1向上 2向下 3向左 4向右 0未滑动
    function getDirection (startx, starty, endx, endy) {
      let angx = endx - startx
      let angy = endy - starty
      let result = 0
      // 如果滑动距离太短
      if (Math.abs(angx) < 2 && Math.abs(angy) < 2) {
        return result
      }
      let angle = getAngle(angx, angy)
      if (angle >= -135 && angle <= -45) {
        result = 1
      } else if (angle > 45 && angle < 135) {
        result = 2
      } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
        result = 3
      } else if (angle >= -45 && angle <= 45) {
        result = 4
      }
      return result
    }

    // 手指接触屏幕
    swiper.addEventListener('touchstart', (e) => {
      this.startx = e.touches[0].pageX
      this.starty = e.touches[0].pageY
    }, false)

    // 手指离开屏幕
    swiper.addEventListener('touchend', (e) => {
      let endx, endy
      endx = e.changedTouches[0].pageX
      endy = e.changedTouches[0].pageY
      let direction = getDirection(this.startx, this.starty, endx, endy)
      let index = this.currentPage
      if (direction === 1) {
        index = index < 7 ? index + 1 : 7
      } else if (direction === 2) {
        index = index > 1 ? index - 1 : 1
      }
      this.changePage(index)
    }, false)
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
      // window.open('https://ajz.fkw.com/reg.html?bizType=0', '_blank')
      // 打开源地址
      window.open('https://ajz.fkw.com/pro11.html?_ta=310&kw=400&bd_vid=7936748617262039255', '_blank')
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
      50%{
        opacity: 0;
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
        background-color: #004393;
      }
      to{
        width: 190px;
        height: 190px;
        background-color: transparent;
      }
    }
    @keyframes pcImgScroll {
      0%,10%{
        top: 0;
      }
      50%,55%{
        top: -1412px;
      }
      100%{
        top: 0;
      }
    }
    @keyframes imgScroll {
      0%,10%{
        top: 0;
      }
      50%,55%{
        top: -998px;
      }
      100%{
        top: 0;
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
          .btn{
            width: 190px;
            height: 46px;
            border-radius: 10px;
            border: 1px solid #fff;
            color: #fff;
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
            }
          }
          &#swi-2{
            background: url('http://jz.faisys.com/image/baiduHome/proVersion/proVer5/proBg2.jpg?v=201707170954') center 0 no-repeat;
            .page-content{
              display: flex;
              flex: 1;
              color: #3b3b3b;
              .main-text{
                font-size: 46px;
                margin-top: 100px;
                animation: slideTop ease 1s forwards;
              }
              .sub-text{
                font-size: 18px;
                margin-top: 10px;
                animation: slideTop ease 1s forwards;
              }
              .device-wrapper{
                width: 800px;
                height: 475px;
                position: relative;
                margin-top: 45px;
                .mac-wrapper{
                  width: 617px;
                  height: 453px;
                  background: url('http://jz.faisys.com/image/baiduHome/proVersion/proVer5/computer.png?v=201706221635') center 0 no-repeat;
                  position: absolute;
                  left: 50%;
                  top: 0;
                  transform: translate(-50%, 0);
                  .mac-content{
                    position: absolute;
                    left: 18px;
                    top: 12px;
                    width: 580px;
                    height: 314px;
                    overflow: hidden;
                    .scroll-img{
                      width: 580px;
                      height: 1727px;
                      background-image: url('http://jz.faisys.com/image/baiduHome/proVersion/proVer5/content_pc.png?v=201706221635');
                      background-size: 580px;
                      position: relative;
                      animation: pcImgScroll ease 20s forwards;
                    }
                  }
                }
                .phone-wrapper{
                  width: 158px;
                  height: 266px;
                  background: url('http://jz.faisys.com/image/baiduHome/proVersion/proVer5/iphone.png?v=201706221635') center 0 no-repeat;
                  position: absolute;
                  left: 0;
                  bottom: 0;
                  .phone-content{
                    position: absolute;
                    left: 6px;
                    top: 31px;
                    width: 121px;
                    height: 205px;
                    overflow: hidden;
                    .scroll-img{
                      width: 121px;
                      height: 1203px;
                      background-image: url('http://jz.faisys.com/image/baiduHome/proVersion/proVer5/content_phone2.png?v=201706221635');
                      background-size: 121px;
                      position: relative;
                      animation: imgScroll ease 20s forwards;
                    }
                  }
                }
                .wechat-wrapper{
                  width: 214px;
                  height: 186px;
                  background: url('http://jz.faisys.com/image/baiduHome/proVersion/proVer5/WeChat.png?v=201706221635') center 0 no-repeat;
                  position: absolute;
                  right: 0;
                  bottom: 0;
                }
              }
              .btn{
                animation: slideTop ease 2s forwards;
                margin-top: 80px;
                background-color: #0066e9;
              }
            }
          }
          &#swi-3,&#swi-4,&#swi-5,&#swi-6{
            background-color: #fff;
            .page-content{
              display: flex;
              flex: 1;
              color: #3b3b3b;
              .content-title{
                margin-top: 90px;
                animation: slideTop ease 1s forwards;
                .page-step{
                  margin-right: 35px;
                  &.step-1{
                    width: 44px;
                    height: 83px;
                    background: url('http://jz.faisys.com/image/baiduHome/proVersion/proVer5/monitors1.png?v=201706221635') center 0 no-repeat;
                  }
                  &.step-2{
                    width: 56px;
                    height: 83px;
                    background: url('http://jz.faisys.com/image/baiduHome/proVersion/proVer5/monitors2.png?v=201706221635') center 0 no-repeat;
                  }
                  &.step-3{
                    width: 52px;
                    height: 85px;
                    background: url('http://jz.faisys.com/image/baiduHome/proVersion/proVer5/monitors3.png?v=201706221635') center 0 no-repeat;
                  }
                  &.step-4{
                    width: 57px;
                    height: 84px;
                    background: url('http://jz.faisys.com/image/baiduHome/proVersion/proVer5/monitors4.png?v=201706221635') center 0 no-repeat;
                  }
                }
                .main-text{
                  font-size: 45px;
                }
                .sub-text{
                  font-size: 18px;
                  margin-top: 10px;
                }
              }
              .pics-wrapper{
                width: 1160px;
                height: 488px;
                position: relative;
                margin-top: 60px;
                .pic{
                  width: 344px;
                  height: 218px;
                  position: absolute;
                  background-repeat: no-repeat;
                  background-position: center;
                  background-size: 344px;
                  &.pic-1{
                    left: 0;
                    top: 0;
                  }
                  &.pic-2{
                    left: 408px;
                    top: 0;
                  }
                  &.pic-3{
                    right: 0;
                    top: 0;
                  }
                  &.pic-4{
                    left: 0;
                    bottom: 0;
                  }
                  &.pic-5{
                    left: 408px;
                    bottom: 0;
                  }
                  &.pic-6{
                    right: 0;
                    bottom: 0;
                  }
                  &:hover{
                    transform: scale(1.1);
                    transition: ease-out all .2s;
                  }
                }
                .more{
                  position: absolute;
                  right: 0;
                  top: -30px;
                  font-size: 14px;
                  color: #0066ef;
                  cursor: pointer;
                  .more-icon{
                    width: 14px;
                    height: 14px;
                    margin-right: 5px;
                    background: url('http://jz.faisys.com/image/baiduHome/proVersion/proVer5/monitors_more.png?v=201707141413') center 0 no-repeat;
                  }
                }
              }
              .btn{
                animation: slideTop ease 2s forwards;
                margin-top: 75px;
                background-color: #0066e9;
              }
            }
          }
          &#swi-7{
            background: url('http://jz.faisys.com/image/baiduHome/proVersion/proVer5/proBg7.jpg?v=201707170954') center 0 no-repeat;
            position: relative;
            .page-content{
              display: flex;
              flex: 1;
              color: #fff;
              .main-text{
                font-size: 46px;
                margin-top: 130px;
                animation: slideTop ease 1s forwards;
              }
              .steps-wrapper{
                margin-top: 140px;
                width: 1000px;
                height: 304px;
                .step-wrapper{
                  width: 258px;
                  height: 304px;
                  background-color: rgba(245,245,245,.1);
                  .step-icon-wrapper{
                    width: 100%;
                    height: 166px;
                    .account-icon{
                      width: 70px;
                      height: 81px;
                      background: url('http://jz.faisys.com/image/baiduHome/proVersion/proVer5/icon_account.png?v=201706221635') center 0 no-repeat;
                    }
                    .document-icon{
                      width: 90px;
                      height: 75px;
                      background: url('http://jz.faisys.com/image/baiduHome/proVersion/proVer5/icon_document.png?v=201706221635') center 0 no-repeat;
                    }
                    .pc-icon{
                      width: 102px;
                      height: 76px;
                      background: url('http://jz.faisys.com/image/baiduHome/proVersion/proVer5/icon_pc.png?v=201706221635') center 0 no-repeat;
                    }
                  }
                  .step-main-text{
                    font-size: 22px;
                    margin-top: 20px;
                  }
                  .step-sub-text{
                    font-size: 14px;
                    margin-top: 16px;
                  }
                }
                .arrow-icon{
                  width: 14px;
                  height: 25px;
                  background: url('http://jz.faisys.com/image/baiduHome/proVersion/proVer5/icon_arrow.png?v=201706221635') center 0 no-repeat;
                }
              }
              .btn{
                animation: slideTop ease 2s forwards;
                margin-top: 120px;
              }
              .footer{
                width: 100%;
                height: 46px;
                position: absolute;
                bottom: 0;
                left: 0;
                background-color: #0345a5;
                font-size: 12px;
                text-align: center;
                line-height: 46px;
                color: #95b1de;
              }
            }
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

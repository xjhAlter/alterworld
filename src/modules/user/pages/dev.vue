<template>
  <div class="dev">
    <div class="dev-row flex" style="background-color: #ebebeb;">
      <progress-circle :values="progressData.values" :radius="100" :width="30" :bgColor="'#fff'"/>
    </div>
    <div class="dev-row">
      <div class="clip-box"></div>
    </div>
    <div class="dev-row flex justify-around" v-if="false">
      <div class="clip-path-box inset"></div>
      <div class="clip-path-box circle"></div>
      <div class="clip-path-box ellipse"></div>
      <div class="clip-path-box polygon"></div>
      <div class="anim-box"></div>
    </div>
    <div class="dev-row" id="workbench" v-if="false">
      <drop-box :box="box" :parent-box="'#workbench'"></drop-box>
    </div>
  </div>
</template>

<script>
import dropBox from '@components/dropBox'
import progressCircle from '@components/progress-circle'
export default {
  name: 'dev',
  components: {
    dropBox,
    progressCircle
  },
  data () {
    return {
      box: {
        status: {
          width: 200,
          height: 200,
          left: 100,
          top: 20,
          opacity: 1,
          rotate: 0
        }
      },
      progressData: {
        values: [
          { title: '第一阶段', value: 25, color: '#409eff' },
          { title: '第二阶段', value: 25 },
          { title: '第三阶段', value: 25 },
          { title: '第四阶段', value: 25 }
        ]
      }
    }
  },
  created () {
    // setTimeout(() => {
    //   this.$set(this.progressData.values[1], 'value', 100)
    // }, 3000)
  },
  methods: {

  },
  computed: {

  }

}
</script>

<style lang="scss" scoped>
  @keyframes clip {
    0%,100%{
      clip: rect(0px,220px,2px,0px);
    }
    25%{
      clip: rect(0px,2px,220px,0px);
    }
    50%{
      clip: rect(218px,220px,220px,0px);
    }
    75%{
      clip: rect(0px,220px,220px,218px);
    }
  }

  @keyframes clipPath {
    0%,100%{
      /* 正三角形 */
      background-color: #f00;
      clip-path: polygon(50% 0%,100% 100%,100% 100%,100% 100%,100% 100%,100% 100%,100% 100%,0% 100%);
    }
    10%,90%{
      /* 正四边形 */
      background-color: #f60;
      clip-path: polygon(0% 0%,100% 0%,100% 100%,100% 100%,100% 100%,100% 100%,100% 100%,0% 100%);
    }
    20%,80%{
      /* 正五边形 */
      background-color: #ff0;
      clip-path: polygon(0% 38.31%,50% 0%,100% 38.31%,80.86% 100%,80.86% 100%,80.86% 100%,80.86% 100%,19.14% 100%);
    }
    30%,70%{
      /* 正六边形 */
      background-color: #0c0;
      clip-path: polygon(0% 50%,25% 0%,75% 0%,100% 50%,75% 100%,75% 100%,75% 100%,25% 100%);
    }
    40%,60%{
      /* 正七边形 */
      background-color: #699;
      clip-path: polygon(0% 64.22%,10.09% 19.72%,50% 0%,90.18% 19.72%,100% 64.22%,72.32% 100%,72.32% 100%,27.68% 100%);
    }
    50%{
      /* 正八边形 */
      background-color: #06c;
      clip-path: polygon(0% 70.66%,0% 29.34%,29.34% 0%,70.66% 0%,100% 29.34%,100% 70.66%,70.66% 100%,29.34% 100%);
    }
  }

  .dev{
    position: relative;
    width: 100%;
    overflow: hidden;
    .dev-row{
      width: 100%;
      height: 300px;
      position: relative;
      padding: 20px;
      border-bottom: 1px solid #d8d8d8;
    }

    .clip-box{
      width: 200px;
      height: 200px;
      margin: auto;
      color: #69ca62;
      box-shadow: inset 0 0 0 1px rgba(105,202,98,.5);
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;

      &::before,
      &::after{
        content: '';
        z-index: 99;
        margin: -5%;
        box-shadow: inset 0 0 0 2px;
        animation: clip 8s linear infinite;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
      }

      &::before{
        animation-delay: -4s;
      }

      &:hover::before,
      &:hover::after{
        background-color: #69ca62;
      }
    }

    .clip-path-box{
      width: 200px;
      height: 200px;
      background-color: #409eff;

      &.inset{
        clip-path: inset(20px 40px 20px 40px round 10px);
      }

      &.circle{
        clip-path: circle(50px at 100px 100px);
      }

      &.ellipse{
        clip-path: ellipse(90px 60px at 50% 50%);
      }

      &.polygon{
        clip-path: polygon(50% 0,80.86% 100%,0 38.31%,100% 38.31%,19.14% 100%);
      }
    }

    .anim-box{
      width: 200px;
      height: 200px;
      animation: clipPath 8s linear infinite;
    }
  }
</style>

<template>
  <div class="dev">
    <div class="dev-row flex">
      <div class="div-box div-box-1 mr-10">20%</div>
      <div class="div-box div-box-2 mr-10">20%</div>
    </div>
    <div class="rem-box table-box">
      <span class="table-cell-box">rem</span>
    </div>
    <div class="dev-row flex" style="background-color: #ebebeb" v-if="false">
      <progress-circle
        :values="progressData.values"
        :radius="100"
        :width="30"
        :bgColor="'#fff'"
      />
    </div>
    <div class="dev-row" v-if="false">
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
import dropBox from "@components/dropBox";
import progressCircle from "@components/progress-circle";
export default {
  name: "dev",
  components: {
    dropBox,
    progressCircle,
  },
  data() {
    return {
      box: {
        status: {
          width: 200,
          height: 200,
          left: 100,
          top: 20,
          opacity: 1,
          rotate: 0,
        },
      },
      progressData: {
        values: [
          { title: "第一阶段", value: 25, color: "#409eff" },
          { title: "第二阶段", value: 25 },
          { title: "第三阶段", value: 25 },
          { title: "第四阶段", value: 25 },
        ],
      },
    };
  },
  created() {
    // setTimeout(() => {
    //   this.$set(this.progressData.values[1], 'value', 100)
    // }, 3000)
    this.test1();
  },
  methods: {
    test1() {
      // 注释里为输出的顺序
      console.log(1);  // 1
      let p = new Promise((resolve) => {
        console.log(2)  // 2
        resolve()
        console.log(3)   // 3
      })
      setTimeout(() =>{
        console.log(4)   // 5
      })
      p.then(()=>{
        console.log(5)  // 4
      });
    },

  },
  computed: {},
};
</script>

<style lang="scss" scoped>
@keyframes clip {
  0%,
  100% {
    clip: rect(0px, 220px, 2px, 0px);
  }
  25% {
    clip: rect(0px, 2px, 220px, 0px);
  }
  50% {
    clip: rect(218px, 220px, 220px, 0px);
  }
  75% {
    clip: rect(0px, 220px, 220px, 218px);
  }
}

@keyframes clipPath {
  0%,
  100% {
    /* 正三角形 */
    background-color: #f00;
    clip-path: polygon(
      50% 0%,
      100% 100%,
      100% 100%,
      100% 100%,
      100% 100%,
      100% 100%,
      100% 100%,
      0% 100%
    );
  }
  10%,
  90% {
    /* 正四边形 */
    background-color: #f60;
    clip-path: polygon(
      0% 0%,
      100% 0%,
      100% 100%,
      100% 100%,
      100% 100%,
      100% 100%,
      100% 100%,
      0% 100%
    );
  }
  20%,
  80% {
    /* 正五边形 */
    background-color: #ff0;
    clip-path: polygon(
      0% 38.31%,
      50% 0%,
      100% 38.31%,
      80.86% 100%,
      80.86% 100%,
      80.86% 100%,
      80.86% 100%,
      19.14% 100%
    );
  }
  30%,
  70% {
    /* 正六边形 */
    background-color: #0c0;
    clip-path: polygon(
      0% 50%,
      25% 0%,
      75% 0%,
      100% 50%,
      75% 100%,
      75% 100%,
      75% 100%,
      25% 100%
    );
  }
  40%,
  60% {
    /* 正七边形 */
    background-color: #699;
    clip-path: polygon(
      0% 64.22%,
      10.09% 19.72%,
      50% 0%,
      90.18% 19.72%,
      100% 64.22%,
      72.32% 100%,
      72.32% 100%,
      27.68% 100%
    );
  }
  50% {
    /* 正八边形 */
    background-color: #06c;
    clip-path: polygon(
      0% 70.66%,
      0% 29.34%,
      29.34% 0%,
      70.66% 0%,
      100% 29.34%,
      100% 70.66%,
      70.66% 100%,
      29.34% 100%
    );
  }
}

.dev {
  position: relative;
  width: 100%;
  overflow: hidden;
  .dev-row {
    width: 100%;
    height: 300px;
    position: relative;
    padding: 20px;
    border-bottom: 1px solid #d8d8d8;
  }

  .clip-box {
    width: 200px;
    height: 200px;
    margin: auto;
    color: #69ca62;
    box-shadow: inset 0 0 0 1px rgba(105, 202, 98, 0.5);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    &::before,
    &::after {
      content: "";
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

    &::before {
      animation-delay: -4s;
    }

    &:hover::before,
    &:hover::after {
      background-color: #69ca62;
    }
  }

  .clip-path-box {
    width: 200px;
    height: 200px;
    background-color: #409eff;

    &.inset {
      clip-path: inset(20px 40px 20px 40px round 10px);
    }

    &.circle {
      clip-path: circle(50px at 100px 100px);
    }

    &.ellipse {
      clip-path: ellipse(90px 60px at 50% 50%);
    }

    &.polygon {
      clip-path: polygon(
        50% 0,
        80.86% 100%,
        0 38.31%,
        100% 38.31%,
        19.14% 100%
      );
    }
  }

  .anim-box {
    width: 200px;
    height: 200px;
    animation: clipPath 8s linear infinite;
  }

  .rem-box {
    width: 10rem;
    height: 5rem;
    background-color: #409eff;
  }

  .table-box {
    display: table-cell;
    vertical-align: middle;
  }

  .div-box {
    box-sizing: content-box;
  }

  @keyframes rotate1 {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .div-box-1 {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 4px solid rgb(184, 187, 191);
    border-radius: 100%;
    width: 40px;
    height: 40px;
    font-size: 12px;
    font-weight: bold;
    color: rgb(172, 28, 177);
    box-shadow: 0 1px 2px 1px rgba(0, 0, 0, 0.2),
      inset 0 1px 2px 1px rgba(0, 0, 0, 0.2);
    &::before {
      content: "";
      position: absolute;
      left: 50%;
      top: 50%;
      margin-left: -24px;
      margin-top: -24px;
      display: block;
      border: 4px solid transparent;
      border-top-color: rgb(172, 28, 191);
      border-radius: 100%;
      width: 40px;
      height: 40px;
      animation: rotate1 infinite 2s ease;
    }
  }

  @keyframes rotate2 {
    0% {
      transform: rotate(0deg) translateY(-2px);
    }
    100% {
      transform: rotate(360deg) translateY(-2px);
    }
  }

  .div-box-2 {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
    width: 40px;
    height: 40px;
    background-image: linear-gradient(45deg, rgb(14, 14, 46), rgb(64, 64, 112));
    font-size: 12px;
    font-weight: bold;
    color: white;
    box-shadow: 0 3px 2px 1px rgba(0, 0, 0, 0.2);
    &::before,
    &::after {
      content: "";
      position: absolute;
      left: 50%;
      top: 50%;
      margin-left: -20px;
      margin-top: -20px;
      width: 40px;
      height: 40px;
      background: rgb(51, 149, 230);
      border-radius: 100%;
      z-index: -1; // 被背景挡住了
      transform: translateY(-2px);
    }
    &:before {
      animation: rotate2 infinite 3s linear;
    }
    &:after {
      animation: rotate2 infinite 2s linear;
    }
  }
}
</style>

<template>
  <div class="test-mian">
    <div class="test-box" style="width: 200px; height: 200px">
      <div class="flex-box-1"></div>
      <div class="flex-box-2"></div>
    </div>
    <div class="test-box">
      <!-- 默认是content-box 但是项目改成border-box了 -->
      <div class="box"></div>
      <div class="box border-box">border-box</div>
      <div class="box content-box">content-box</div> 
    </div>
    <div class="test-box">
      <div class="parent">
        <div class="child"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "user-info",
  data() {
    return {
      name: "Vue",
    };
  },
  mounted() {
    this.fun1();
    // this.fun2();
  },
  methods: {
    fun1() {
      let obj = {
        name: "Alter",
        age: 25,
        getName: () => {
          let fn = () => {
            console.log("fn-name", this.name); // 这里也是父级作用域的this，但父级是个箭头函数，继续往上，最后是vue实例
          };
          fn();

          return this.name; // 这里的this指向vue实例的this, 找的是上层的this
        },
        getAge: function () {
          let fn = () => {
            console.log("fn-age", this.age);
          };
          fn();

          return this.age;
        },
      };
      let fooName = obj.getName;
      console.log("obj.getName ", obj.getName()); // 指向vue实例中的this.name 否则是window
      console.log("fooName ", fooName()); // 同上

      let fooAge = obj.getAge;
      console.log("obj.getAge ", obj.getAge()); // 25
      // console.log("fooAge ", fooAge());  // 报错，this 是一个undefined
    },
    fun2() {
      function foo1(value) {
        let foo2 = (val) => {
          console.log(arguments); // 没有自己的arguments，访问的是foo1的arguments
        };
        foo2(114);
      }
      foo1(10086);
    },
  },
};
</script>

<style lang="scss" scoped>
.test-box {
  display: flex;
  position: relative;
}
.box {
  width: 100px;
  height: 100px;
  padding: 20px;
  margin: 20px;
  border: 1px solid #409eff;
}
.border-box {
  box-sizing: border-box;
}
.content-box {
  box-sizing: content-box;
}
.flex-box-1 {
  flex: 1 1 50px;
  background-color: #409eff;
  height: 100%;
}
.flex-box-2 {
  flex: 1 0 auto;
  background-color: #ff0000;
  height: 100%;
}
.parent {
  position: absolute;
  width: 300px;
  height: 300px;
  margin: 20px;
  border: 1px solid #409eff;
}

.child {
  position: absolute;
  top: 0;
  left: 30px;
  width: 100px;
  height: 100px;
  border: 1px solid #409eff;
}
</style>

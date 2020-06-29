<template>
  <div id="app">
    <template v-if="isAw">
      <my-header/>
      <div class="my-page">
        <keep-alive v-if="$route.meta.keepAlive!==false">
          <router-view/>
        </keep-alive>
        <router-view v-else/>
      </div>
      <my-footer/>
    </template>
    <template v-else>
      <keep-alive>
        <router-view/>
      </keep-alive>
    </template>
  </div>
</template>

<script>
import myHeader from '@components/layout/header'
import myFooter from '@components/layout/footer'
export default {
  name: 'App',
  components: {myHeader, myFooter},
  data () {
    return {
      isAw: true
    }
  },
  watch: {
    '$route': function (to) {
      let paths = to.path.split('/')
      if (paths[1] && paths[1] === 'cosmos') {
        this.$set(this, 'isAw', false)
      } else {
        this.$set(this, 'isAw', true)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  .my-page {
    background-color: #fff;
    position: relative;
    width: 1200px;
    min-height: 750px;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>

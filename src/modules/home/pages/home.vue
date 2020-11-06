<template>
  <div class="home">
    <h1 class="highlight">首页</h1>
    <button class="mt-30 aw-btn" @click="toCosmos('fkw')">cosmos fkw</button>
    <button class="mt-30 ml-30 aw-btn" @click="toCosmos('paraScroll')">视差滚动</button>
    <button class="mt-30 ml-30 aw-btn" @click="toCosmos('drawing')">画图</button>
  </div>
</template>

<script>
export default {
  name: 'home',
  methods: {
    /**
     * 跳转其他网站（fake）
     * @param name
     */
    toCosmos (name) {
      this.$router.push({name: name})
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

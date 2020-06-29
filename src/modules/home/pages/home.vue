<template>
  <div class="home">
    <h1 class="highlight">首页</h1>
    <button class="mt-30" @click="toCosmos('fkw')">cosmos fkw</button>
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

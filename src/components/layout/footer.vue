<template>
  <footer class="footer flex">
    <div class="footer-item">Author: Alterx</div>
    <div class="footer-item">QQ: ***</div>
    <div class="footer-item">email: xxxjhxx@qq.com</div>
    <div class="footer-item">weixin: ***</div>
  </footer>
</template>

<script>
export default {
  name: 'footer'
}
</script>

<style lang="scss" scoped>
  .footer {
    width: 100%;
    height: 120px;
    .footer-item {
      font-size: 14px;
      padding: 0 20px;
      color: #888;
      border-right: 1px solid #ccc;
      &:last-child {
        border-width: 0;
      }
    }
  }
</style>

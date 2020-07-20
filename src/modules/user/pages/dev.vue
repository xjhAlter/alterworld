<template>
  <div class="dev workbench">
    <drop-box :box="box" :parent-box="'.workbench'"></drop-box>
  </div>
</template>

<script>
import dropBox from '@components/dropBox'
export default {
  name: 'dev',
  components: {
    dropBox
  },
  data () {
    return {
      box: {
        status: {
          width: 200,
          height: 200,
          left: 0,
          top: 0,
          opacity: 1,
          rotate: 0
        }
      }
    }
  },
  methods: {

  },
  computed: {

  }

}
</script>

<style lang="scss" scoped>
  .dev{
    position: relative;
    width: 100%;
    height: 750px;
    overflow: hidden;
  }
</style>

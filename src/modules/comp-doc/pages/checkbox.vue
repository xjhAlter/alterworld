<template>
  <div class="doc-page">
    <doc-wrapper :doc-data="componentDoc">
    </doc-wrapper>
  </div>
</template>

<script>
import docWrapper from '@components/doc-wrapper'
export default {
  name: 'docCheckbox',
  components: {
    docWrapper
  },
  data () {
    return {
      componentDoc: {
        name: '复选框'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .doc-page{
    display: flex;
    justify-content: space-between;
    .example{
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
    }
  }
</style>

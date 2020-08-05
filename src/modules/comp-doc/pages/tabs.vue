<template>
  <div class="doc-page">
    <doc-wrapper :doc-data="componentsDoc">
      <div class="example">
        <button class="aw-btn mb-30" @click="changeMode">切换显示</button>
        <aw-tabs v-model="currentTab" :tabs="tabs" @change="onChange" :vertical="vertical"/>
      </div>
    </doc-wrapper>
  </div>
</template>

<script>
import docWrapper from '@components/doc-wrapper'
export default {
  name: 'docTabs',
  components: {
    docWrapper
  },
  data () {
    return {
      tabs: [
        {name: '选项1', alias: '小标题1', value: 1},
        {name: '选项2', alias: '小标题2', value: 2},
        {name: '选项3', value: 3}
      ],
      currentTab: 1,
      vertical: false,
      componentsDoc: {
        name: '选项卡',
        attributes: {
          vModel: {
            name: 'v-model',
            description: '当前选中选项卡值',
            type: '',
            optionalValues: '',
            defaultValues: '',
            required: true
          },
          tabs: {
            name: 'tabs',
            description: '选项卡对象数组',
            type: 'Array',
            optionalValues: '',
            defaultValues: '',
            required: true
          },
          vertical: {
            name: 'vertical',
            description: '垂直显示',
            type: 'Boolean',
            optionalValues: '',
            defaultValues: 'false',
            required: false
          }
        },
        events: {
          change: {
            name: 'change',
            description: '选中选项卡后的回调方法',
            returnValue: '该选项卡的value'
          }
        }
      }
    }
  },
  methods: {
    onChange (value) {
      console.log(`选中：${value}`)
    },
    changeMode () {
      this.$set(this, 'vertical', !this.vertical)
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
      height: 250px;
    }
  }
</style>

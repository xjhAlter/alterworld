<template>
  <div class="doc-page">
    <doc-wrapper :doc-data="componentsDoc">
      <div class="example">
        <div class="flex flex-column align-start ml-50">
          <aw-radio v-model="value" :value="'1月'">1月</aw-radio>
          <aw-radio v-model="value" :value="'2月'" class="mt-20">2月</aw-radio>
          <aw-radio v-model="value" :value="'3月'" class="mt-20" :disabled="true">3月</aw-radio>
          <aw-radio v-model="value" :value="'4月'" class="mt-20" :gap="20">4月</aw-radio>
        </div>
        <div class="flex ml-100">
          <span>当前选中：{{value}}</span>
        </div>
      </div>
    </doc-wrapper>
  </div>
</template>

<script>
import docWrapper from '@components/doc-wrapper'
export default {
  name: 'docRadio',
  components: {
    docWrapper
  },
  data () {
    return {
      value: '1月',
      componentsDoc: {
        name: '单选框',
        attributes: {
          vModel: {
            name: 'v-model',
            description: '双向绑定的目标',
            type: '',
            optionalValues: '',
            defaultValues: '',
            required: true
          },
          value: {
            name: 'value',
            description: '目标值',
            type: 'String | Number | Boolean',
            optionalValues: '',
            defaultValues: '',
            required: true
          },
          disabled: {
            name: 'disabled',
            description: '是否禁用该单选框',
            type: 'Boolean',
            optionalValues: '',
            defaultValues: 'false',
            required: false
          },
          gap: {
            name: 'gap',
            description: 'label与选框的间距',
            type: 'String | Number',
            optionalValues: '',
            defaultValues: '10',
            required: false
          }
        },
        events: {
          change: {
            name: 'change',
            description: '选中该单选框后的回调方法',
            returnValue: '该单选框的value'
          },
          error: {
            name: 'error',
            description: 'disabled时点击触发',
            returnValue: '-'
          }
        }
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
      justify-content: flex-start;
      align-items: flex-start;
    }
  }
</style>

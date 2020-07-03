<template>
  <div class="doc-page">
    <doc-wrapper :doc-data="componentDoc">
      <div class="example">
        <div class="flex flex-column align-start ml-50">
          <aw-checkbox class="aw-btn mr-10" v-model="objs" :path="['value']" v-slot="inner">
            {{inner.statement?'取消全选':'全选'}}
          </aw-checkbox>
          <aw-checkbox v-for="(obj, index) in objs"
                       class="mt-20"
                       v-model="obj.value"
                       :key="index"
                       :disabled="obj.disabled"
                       @change="onCheckboxChange"
                       @error="handleChange">
            {{obj.name}}
          </aw-checkbox>
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
  name: 'docCheckbox',
  components: {
    docWrapper
  },
  data () {
    return {
      componentDoc: {
        name: '复选框',
        attributes: {
          vModel: {
            name: 'v-model',
            description: '绑定值，用作全选时传入数组',
            type: '',
            optionalValues: '',
            defaultValues: '',
            required: true
          },
          path: {
            name: 'path',
            description: '全选模式时绑定值的访问路径',
            type: 'String[]',
            optionalValues: '',
            defaultValues: '',
            required: false
          },
          disabled: {
            name: 'disabled',
            description: '是否禁用该多选框',
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
            description: '该多选框值变化后的回调',
            returnValue: '该多选框的新值或传入的数组'
          },
          error: {
            name: 'error',
            description: 'disabled时点击触发',
            returnValue: '-'
          }
        }
      },
      objs: [
        {
          name: '5月',
          disabled: false,
          value: false
        },
        {
          name: '6月',
          disabled: false,
          value: true
        },
        {
          name: '7月',
          disabled: true,
          value: false
        },
        {
          name: '8月',
          disabled: true,
          value: true
        }
      ]
    }
  },
  methods: {
    /**
     * checkbox值发生改变
     * @param value
     */
    onCheckboxChange (value) {
      console.log(value)
    },
    /**
     * 点击禁用的checkbox
     */
    handleChange () {
      console.log('这个checkbox被禁用了')
    }
  },
  computed: {
    value () {
      const objs = this.objs
      let v = []
      objs.forEach(o => {
        if (o.value) {
          v.push(o.name)
        }
      })
      return v.join(', ')
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

<template>
  <div class="aw-tabs" :class="{'v-tabs':vertical}">
    <div v-for="tab in tabs" :key="tab.value" class="tab" :class="{'current-tab':current === tab.value}" @click="onSelect(tab)">
      <span class="tab-name">{{tab.name}}</span>
      <span v-if="tab.alias" class="tab-alias">{{tab.alias}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AwTabs',
  model: {
    prop: 'tabsModel',
    event: 'change'
  },
  props: {
    tabsModel: {
      require: true
    },
    tabs: {
      type: Array,
      default () {
        // [{name: 选项, alias: '小标题', value: 1}]
        return []
      },
      require: true
    },
    vertical: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    /**
     * 选中tab
     * @param tab
     */
    onSelect (tab) {
      this.current = tab.value
    }
  },
  computed: {
    current: {
      get () {
        return this.tabsModel
      },
      set (val) {
        if (this.current === val) {
          return
        }
        this.$emit('change', val)
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .aw-tabs{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    cursor: pointer;
    .tab{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      min-width: 120px;
      height: 50px;
      color: #333;
      .tab-name{
        font-size: 14px;
        font-weight: bold;
      }
      .tab-alias{
        font-size: 12px;
      }
      &:hover{
        color: #409eff;
      }
    }
    &:not(.v-tabs){
      .tab{
        border: 1px solid #d8d8d8;
        border-right: 0;
        &:first-child{
          border-top-left-radius: 10px;
        }
        &:last-child{
          border-top-right-radius: 10px;
          border-right: 1px solid #d8d8d8;
        }
        &.current-tab{
          border-bottom: 2px solid #409eff;
        }
        .tab-alias{
          margin-top: 2px;
        }
      }
    }
    &.v-tabs{
      flex-direction: column;
      .tab{
        flex-direction: row;
        border: 1px solid #d8d8d8;
        border-bottom: 0;
        border-left: 2px solid #409eff;
        &:first-child{
          border-top-right-radius: 10px;
        }
        &:last-child{
          border-bottom: 1px solid #d8d8d8;
          border-bottom-right-radius: 10px;
        }
        &.current-tab{
          .tab-name{
            color: #409eff;
          }
        }
        .tab-name{
          font-size: 16px;
        }
        .tab-alias{
          margin-left: 5px;
        }
      }
    }
  }
</style>

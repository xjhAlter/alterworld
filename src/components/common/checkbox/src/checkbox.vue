<template>
  <div @click="disabled && $emit('error')" class="aw-checkbox" :class="[{selected: cptModel, disabled: disabled}]">
    <label>
      <span class="aw-checkbox-icon"><div class="select-flag"></div></span>
      <div class="aw-checkbox-name" :style="{'margin-left': gap + 'px'}">
        <slot :statement="cptModel"></slot>
      </div>
      <input class="aw-checkbox-input" type="checkbox" v-model="cptModel" :disabled="disabled">
    </label>
  </div>
</template>

<script>
export default {
  name: 'AwCheckbox',
  model: {
    prop: 'checkboxModel',
    event: 'change'
  },
  props: {
    checkboxModel: {
      required: true,
      validator: (val) => {
        return typeof val === 'boolean' || val === undefined || val instanceof Array
      }
    },
    disabled: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    path: {
      type: Array,
      validator: (val) => {
        return val.length > 0
      },
      default: () => {
        return ['checked']
      }
    },
    gap: {
      type: [String, Number],
      default: '10'
    }
  },
  methods: {
  },
  computed: {
    cptModel: {
      get () {
        if (this.checkboxModel instanceof Array) {
          let values = []
          this.checkboxModel.forEach(obj => {
            let value = obj
            for (let i = 0; i < this.path.length; ++i) {
              value = value[this.path[i]]
            }
            values.push(value)
          })
          return values.length && values.every(value => value)
        }
        return this.checkboxModel
      },
      set (val) {
        if (this.checkboxModel instanceof Array) {
          this.checkboxModel.forEach(obj => {
            let value = obj
            // 保持引用
            for (let i = 0; i < this.path.length - 1; ++i) {
              value = value[this.path[i]]
            }
            this.$set(value, [this.path[this.path.length - 1]], val)
          })
          this.$emit('change', this.checkboxModel)
          return
        }
        this.$emit('change', val)
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  *{
    box-sizing: border-box;
    cursor: pointer;
    font-size: 14px;
    white-space: nowrap;
  }
  .aw-checkbox{
    display: inline-block;
    line-height: 1;
    &.aw-btn {
      padding: 0;
      label {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
      }
      .aw-checkbox-icon {
        display: none;
      }
      .aw-checkbox-name {
        margin: 0 !important;
      }
    }
    .aw-checkbox-icon {
      background-color: #fff;
      vertical-align: middle;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 14px;
      height: 14px;
      overflow: hidden;
      border-radius: 2px;
      border: #ccc 1px solid;
      .select-flag {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 14px;
        height: 14px;
        background-color: #409eff;
        color: #fff;
        opacity: 0;
        transform: scale(0.3);
        &::before{
          content: '';
          border: 2px solid #fff;
          border-top: 0;
          border-left: 0;
          width: 4px;
          height: 8px;
          transform: translateY(-1.5px) rotate(45deg) translateZ(0px); // translateZ防抖
        }
      }
    }
    .aw-checkbox-name {
      display: inline-block;
      vertical-align: middle;
      &:empty {
        margin: 0 !important;
      }
    }
    .aw-checkbox-input {
      display: none;
    }
    &:hover, &.selected {
      .aw-checkbox-icon {
        border-color: #409eff;
      }
    }
    &.selected {
      .aw-checkbox-icon {
        .select-flag {
          opacity: 1;
          transform: scale(1);
        }
      }
    }
    &.disabled {
      * {
        cursor: no-drop;
        color: #ccc;
      }
      &.selected {
        .aw-checkbox-icon {
          background-color: transparent;
        }
      }
      .aw-checkbox-icon {
        background-color: #eee;
        border-color: #ccc;
        .select-flag {
          background-color: #ccc;
        }
      }
    }
  }
</style>

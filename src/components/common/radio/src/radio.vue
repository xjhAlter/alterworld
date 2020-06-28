<template>
  <div @click.stop="disabled && $emit('error')" class="aw-radio" :class="[{selected: cptModel === value, disabled: disabled}]">
    <label>
      <div class="aw-radio-icon"><div class="select-flag"></div></div>
      <div class="aw-radio-name" :style="{'margin-left': gap + 'px'}">
        <slot></slot>
      </div>
      <input class="aw-radio-input" type="radio" v-model="cptModel" :value="value" :disabled="disabled">
    </label>
  </div>
</template>

<script>
export default {
  name: 'AwRadio',
  model: {
    prop: 'radioModel',
    event: 'change'
  },
  props: {
    radioModel: {
      required: true
    },
    value: {
      required: true
    },
    disabled: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    gap: {
      type: [String, Number],
      default: '10'
    }
  },
  computed: {
    cptModel: {
      get () {
        return this.radioModel
      },
      set (val) {
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
  }
  .aw-radio{
    display: inline-block;
    line-height: 1;
    .aw-radio-icon {
      vertical-align: middle;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 14px;
      height: 14px;
      border: #ccc 1px solid;
      border-radius: 50%;
      .select-flag {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: #409eff;
        transform: scale(0);
      }
    }
    .aw-radio-name {
      display: inline-block;
      vertical-align: middle;
    }
    .aw-radio-input {
      display: none;
    }
    &:hover, &.selected {
      .aw-radio-icon {
        border-color: #409eff;
      }
    }
    &.selected {
      .aw-radio-icon {
        .select-flag {
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
        .aw-radio-icon {
          background-color: transparent;
        }
      }
      .aw-radio-icon {
        background-color: #eee;
        border-color: #ccc;
        .select-flag {
          background-color: #ccc;
        }
      }
    }
  }
</style>

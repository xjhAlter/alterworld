<template>
  <div class="reg-ex">
    <div>
      <div class="block-wrapper">
        <label>正则表达式</label>
        <textarea v-model="regex" placeholder="输入正则表达式，例: \d+"></textarea>
      </div>
      <div class="block-wrapper">
        <label>测试文本</label>
        <textarea v-model="text" placeholder="输入测试文本"></textarea>
      </div>
      <div class="block-wrapper">
        <label>匹配方式</label>
        <div class="wrap-wrapper">
          <button class="aw-btn method-radio" v-for="m in methodOptions" :key="m" @click="test(m)">{{m}}</button>
        </div>
      </div>
      <div class="block-wrapper">
        <label>结果</label>
        <textarea v-model="result" class="result-textarea" readonly></textarea>
      </div>
    </div>
    <div class="quick-wrapper">
      <div class="quick-block">
        <div class="quick-header">
          <span class="header-title">历史记录</span>
          <span class="color-sub cursor-pointer" @click="removeCacheRegex">清空</span>
        </div>
        <div class="quick-content">
          <div class="quick-list">
            <div class="quick-tag" v-for="r in cacheRegex" :key="r" @click="quickSet(r)">{{r}}</div>
          </div>
        </div>
      </div>
      <div class="quick-block">
        <div class="quick-header" style="border-top: 1px solid #d8d8d8;border-radius: 4px;">
          <span class="header-title">常用正则表达式</span>
        </div>
        <div class="quick-content">
          <div class="quick-list" style="height: 250px;">
            <div class="quick-row" v-for="(r,index) in defaultRegex" :key="index">
              <label>{{r.label}}</label>
              <div class="quick-tag" @click="quickSet(r.regex)">{{r.regex}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 正则表达式离线使用
 */
import {defaultRegex} from './default'
export default {
  name: 'regular-expression',
  data () {
    return {
      regex: '',
      text: '',
      methodOptions: ['match', 'test'],
      result: '',
      cacheRegex: [],
      defaultRegex: defaultRegex
    }
  },
  methods: {
    test (type) {
      if (!this.regex) {
        return this.$set(this, 'result', '请输入正则表达式')
      }
      if (!this.text) {
        return this.$set(this, 'result', '请输入测试文本')
      }
      this.setCacheRegex(this.regex)
      this.handleTest(type)
    },
    handleTest (type) {
      let result = '没有匹配'
      let r = new RegExp(this.regex)
      switch (type) {
        case 'match':
          let m = this.text.match(r)
          console.log(m)
          if (m) {
            result = ''
            for (let i = 0; i < m.length; i++) {
              result += `${m[i]}\n\n`
            }
            result += `index: ${m.index}`
          }
          break
        case 'test':
          result = r.test(this.text)
          break
      }
      console.log(result)
      this.$set(this, 'result', result)
    },

    /**
     * 本地存放使用过的正则表达式
     * @param regex
     */
    setCacheRegex (regex) {
      let cacheRegex = this.cacheRegex
      if (!cacheRegex.includes(regex)) {
        cacheRegex.unshift(regex)
        if (cacheRegex.length > 10) {
          cacheRegex.pop()
        }
        window.$aw.setStorage('REGEX', cacheRegex)
      }
    },

    getCacheRegex () {
      let r = window.$aw.getStorage('REGEX')
      return r || []
    },

    removeCacheRegex () {
      this.$set(this, 'cacheRegex', [])
      window.$aw.removeStorage('REGEX')
    },

    quickSet (r) {
      this.$set(this, 'regex', r)
    }
  },
  created () {
    this.$set(this, 'cacheRegex', this.getCacheRegex())
  }
}
</script>

<style lang="scss" scoped>
  .reg-ex {
    display: flex;
    justify-content: space-evenly;
    padding: 40px 20px;
    .block-wrapper {
      display: flex;
      margin-bottom: 20px;
      label {
        width: 100px;
        text-align: right;
        color: #999;
        margin-right: 20px;
        line-height: 36px;
      }
      textarea {
        width: 600px;
        height: 100px;
        line-height: 20px;
        &.result-textarea {
          height: 200px;
        }
      }
    }
    .wrap-wrapper {
      display: flex;
      flex-wrap: wrap;
      max-width: 600px;
      .method-radio {
        margin-right: 30px;
      }
    }
    .quick-wrapper {
      width: 300px;
      min-height: 300px;
      max-height: 600px;
      border: 1px solid #d8d8d8;
      border-radius: 8px;
      .quick-block {
        .quick-header {
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 10px;
          border-bottom: 1px solid #d8d8d8;
          .header-title {
            font-size: 16px;
            font-weight: bold;
          }
        }
        .quick-content {
          padding: 8px;
          .quick-list {
            height: 150px;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            align-content: flex-start;
            overflow-y: auto;
            .quick-tag {
              min-width: 36px;
              height: 26px;
              line-height: 26px;
              text-align: center;
              font-size: 14px;
              border-radius: 4px;
              padding: 0 10px;
              margin: 0 10px 10px 0;
              color: #5e5c6c;
              background-color: #ebe9f2;
              cursor: pointer;
              &:hover {
                color: #409eff;
                background-color: #ebf3ff;
              }
            }
            .quick-row {
              width: 100%;
              display: flex;
              align-items: center;
              flex-wrap: wrap;
              label {
                color: #666;
                margin-right: 5px;
                margin-bottom: 10px;
              }
            }
          }
        }
      }
    }
  }
</style>

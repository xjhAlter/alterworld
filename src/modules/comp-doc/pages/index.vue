<template>
  <div class="doc-index">
    <div class="comp-list">
      <aw-tabs v-model="currentDoc" :tabs="compList" :width="'180px'" :vertical="true" @change="changeDoc"/>
    </div>
    <div class="comp-content">
      <keep-alive v-if="$route.meta.keepAlive!==false">
        <router-view/>
      </keep-alive>
      <router-view v-else/>
    </div>
  </div>
</template>

<script>

export default {
  name: 'docIndex',
  components: {

  },
  data () {
    return {
      currentDoc: '',
      compList: [
        {
          value: 'radio',
          alias: 'radio',
          name: '单选框'
        },
        {
          value: 'checkbox',
          alias: 'checkbox',
          name: '复选框'
        },
        {
          value: 'tabs',
          alias: 'tabs',
          name: '选项卡'
        }
        // {
        //   value: 'select',
        //   alias: 'select',
        //   name: '下拉选择框'
        // }
      ]
    }
  },
  activated () {
    this.$set(this, 'currentDoc', this.$router.currentRoute.path.split('/')[2])
  },
  methods: {
    /**
     * 切换文档
     * @param value
     */
    changeDoc (value) {
      let currentDoc = this.$router.currentRoute.path.split('/')[2]
      if (currentDoc !== value) {
        this.$set(this, 'currentDoc', value)
        this.$router.push({path: `/comp-doc/${value}`})
      }
    }
  },
  watch: {
    '$route': function (to) {
      let paths = to.path.split('/')
      if (paths[1] === 'comp-doc') {
        this.$set(this, 'currentDoc', paths[2])
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .doc-index{
    display: flex;
    justify-content: space-between;
    .comp-list{

    }
  }
</style>

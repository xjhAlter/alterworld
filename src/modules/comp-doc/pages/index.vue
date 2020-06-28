<template>
  <div class="doc-index">
    <div class="comp-list">
      <div v-for="(item,index) in compList" :key="index" class="comp-item" :class="{'active': currentDoc === item.name}" @click="changeDoc(item.name)">
        <span>{{item.cnName}}</span>
        <span class="ml-5 small-text">{{item.name}}</span>
      </div>
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
          name: 'radio',
          cnName: '单选框'
        },
        {
          name: 'checkbox',
          cnName: '复选框'
        },
        {
          name: 'select',
          cnName: '下拉选择框'
        }
      ]
    }
  },
  activated () {
    this.$set(this, 'currentDoc', this.$router.currentRoute.path.split('/')[2])
  },
  methods: {
    /**
     * 切换文档
     * @param name
     */
    changeDoc (name) {
      let currentDoc = this.$router.currentRoute.path.split('/')[2]
      if (currentDoc !== name) {
        this.$set(this, 'currentDoc', name)
        this.$router.push({path: `/comp-doc/${name}`})
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
      width: 180px;
      border-left: 5px solid #409eff;
      .comp-item{
        width: 180px;
        height: 50px;
        padding: 10px 10px;
        font-size: 16px;
        font-weight: 600;
        line-height: 30px;
        text-align: left;
        border-bottom: 1px solid #d8d8d8;
        cursor: pointer;
        &:first-child{
          border-top: 1px solid #d8d8d8;
        }
        &:hover,&.active{
          color: #fff;
          background-color: #409eff;
          border-color: #409eff;
        }
        &.active{
          opacity: .8;
        }
        .small-text{
          font-size: 12px;
        }
      }
    }
  }
</style>

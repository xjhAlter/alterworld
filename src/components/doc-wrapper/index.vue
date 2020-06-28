<template>
  <div class="doc-wrapper">
    <h2>{{docData.name}}</h2>
    <div class="doc-row">
      <span class="doc-row-title">示例</span>
      <div class="doc-example">
        <slot>
          <div class="empty-example flex">
            暂无示例
          </div>
        </slot>
      </div>
    </div>
    <div class="doc-row" v-if="docData.attributes">
      <span class="doc-row-title">参数</span>
      <table>
        <thead>
        <tr>
          <th width="150">参数名称</th>
          <th width="300">说明</th>
          <th width="150">类型</th>
          <th width="150">可选值</th>
          <th width="150">默认值</th>
          <th width="60">必填</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(attr, id) in docData.attributes" :key="id">
          <td>{{attr.name}}</td>
          <td>{{attr.description}}</td>
          <td>{{attr.type}}</td>
          <td v-html="attr.optionalValues || '-'"></td>
          <td>{{attr.defaultValues || '-'}}</td>
          <td>{{attr.required ? '是' : '否'}}</td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="doc-row" v-if="docData.events">
      <span class="doc-row-title">事件</span>
      <table>
        <thead>
        <tr>
          <th width="200">事件名称</th>
          <th width="560">说明</th>
          <th width="200">回调参数</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(attr, id) in docData.events" :key="id">
          <td>{{attr.name}}</td>
          <td>{{attr.description}}</td>
          <td>{{attr.returnValue}}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'docWrapper',
  props: {
    docData: {
      type: Object,
      require: true
    }
  }
}
</script>

<style lang="scss" scoped>
  .doc-wrapper{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    width: 1000px;
    padding: 20px;
    .doc-row{
      width: auto;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin: 20px 0;
      .doc-row-title{
        color: #333;
        font-size: 18px;
        font-weight: 700;
        margin-bottom: 20px;
      }
      .doc-example{
        width: 960px;
        border-radius: 10px;
        border: 1px solid #d8d8d8;
        padding: 20px;
        .empty-example{
          width: 920px;
          height: 100px;
          color: #666;
          font-size: 30px;
        }
      }
      table{
        width: 960px;
        text-align: left;
        border-collapse: collapse;
        thead{
          tr{
            height: 70px;
            th{
              padding-right: 20px;
              border-bottom: 1px solid #d8d8d8;
            }
          }
        }
        tbody{
          color: #666;
          font-size: 14px;
          tr{
            height: 70px;
            td{
              padding-right: 20px;
              border-bottom: 1px solid #d8d8d8;
              word-break: break-all;
            }
            &:hover{
              background-color: #f5f6f7;
            }
          }
        }
      }
    }
  }
</style>

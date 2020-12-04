const menu = [
  {
    name: '首页',
    alias: 'home'
  },
  {
    name: '组件',
    alias: 'comp-doc',
    children: [
      {name: '组件文档', alias: 'docIndex'}
    ]
  },
  {
    name: '工具',
    alias: 'tool',
    children: [
      {name: '正则表达式', alias: 'regex'}
    ]
  },
  {
    name: '我的',
    alias: 'user',
    children: [
      {name: '个人中心', alias: 'userInfo'},
      {name: '开发区', alias: 'dev'}
    ]
  }
]

export default menu

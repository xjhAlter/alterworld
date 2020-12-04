const regex = () => import('../pages/regex')

export default [
  {
    name: 'regex',
    path: '/tool/regex',
    component: regex,
    meta: {
      keepAlive: false
    }
  }
]

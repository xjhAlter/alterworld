const dev = () => import('../pages/dev')
const userInfo = () => import('../pages/user-info')

export default [
  {
    name: 'dev',
    path: '/user/dev',
    component: dev,
    meta: {
    }
  },
  {
    name: 'userInfo',
    path: '/user/user-info',
    component: userInfo,
    meta: {
    }
  }
]

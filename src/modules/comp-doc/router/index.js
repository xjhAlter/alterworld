const index = () => import('../pages/index')
const radio = () => import('../pages/radio')
const checkbox = () => import('../pages/checkbox')
const tabs = () => import('../pages/tabs')

export default [
  {
    name: 'docIndex',
    path: '/comp-doc',
    redirect: '/comp-doc/radio',
    component: index,
    meta: {
      keepAlive: false
    },
    children: [
      {
        path: 'radio',
        component: radio
      },
      {
        path: 'checkbox',
        component: checkbox
      },
      {
        path: 'tabs',
        component: tabs
      }
    ]
  }
]

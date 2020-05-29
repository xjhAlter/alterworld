const home = () => import('../pages/home')

export default [
  {
    name: 'home',
    path: '/(index.html)?',
    component: home,
    meta: {
    }
  }
]

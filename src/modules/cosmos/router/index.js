const fkw = () => import('../pages/fkw')
const paraScroll = () => import('../pages/parallax-scrolling')

export default [
  {
    name: 'fkw',
    path: '/cosmos/fkw',
    component: fkw,
    meta: {
      keepAlive: false
    }
  },
  {
    name: 'paraScroll',
    path: '/cosmos/paraScroll',
    component: paraScroll,
    meta: {
      keepAlive: false
    }
  }
]

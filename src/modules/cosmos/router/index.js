const fkw = () => import('../pages/fkw')
const paraScroll = () => import('../pages/parallax-scrolling')
const drawing = () => import('../pages/drawing')

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
  },
  {
    name: 'drawing',
    path: '/cosmos/drawing',
    component: drawing,
    meta: {
      keepAlive: false
    }
  }
]

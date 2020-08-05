import radio from './radio'
import checkbox from './checkbox'
import tabs from './tabs'

const components = [radio, checkbox, tabs]

const install = function (Vue) {
  if (install.installed) return
  components.map(component => {
    Vue.use(component)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  radio,
  checkbox,
  tabs
}

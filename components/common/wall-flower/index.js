 /**
 * @file Wall flower component / ES module
 * @module components/common/wall-flower
 * @author Surmon <https://github.com/surmon-china>
 */

import WallFlowerComponent from './garden'

const wallFlower = {
  install(Vue) {
    Vue.component('WallFlowerBox', WallFlowerComponent)
  }
}

export default wallFlower

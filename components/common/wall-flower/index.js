 /**
 * @file Wall flower component / ES module
 * @author Surmon <surmon@foxmail.com>
 */

import WallFlowerComponent from './garden'

const wallFlower = {
  install(Vue) {
    Vue.component('WallFlowerBox', WallFlowerComponent)
  }
}

export default wallFlower

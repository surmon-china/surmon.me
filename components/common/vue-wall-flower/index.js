/**
 * VueWallFlower
 * @author Surmon.me
 */

import VueWallFlower from './garden.vue'

const wallFlower = {
  install(Vue) {
    Vue.component('WallFlowerBox', VueWallFlower)
  }
}

export default wallFlower

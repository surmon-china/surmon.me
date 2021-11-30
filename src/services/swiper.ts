/**
 * @file vue-awesome-swiper
 * @module service/swiper
 * @author Surmon <https://github.com/surmon-china>
 */

import { App } from 'vue'
import { Swiper, Pagination, Mousewheel, Autoplay } from 'swiper'
// import exporter from 'vue-awesome-swiper/dist/exporter'
import exporter from '/@/todo/swiper/exporter'
// import 'swiper/swiper-bundle.min.css'

Swiper.use([Pagination, Mousewheel, Autoplay])

export default {
  install(app: App) {
    app.use(exporter(Swiper))
  }
}

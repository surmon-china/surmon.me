/**
 * @file vue-awesome-swiper / ES module
 * @module plugins/swiper
 * @author Surmon <https://github.com/surmon-china>
 */

import Vue from 'vue'
import { Swiper, Pagination, Mousewheel, Autoplay } from 'swiper/js/swiper.esm'
import exporter from 'vue-awesome-swiper/dist/exporter'
import 'swiper/css/swiper.css'

Swiper.use([Pagination, Mousewheel, Autoplay])
Vue.use(exporter(Swiper))

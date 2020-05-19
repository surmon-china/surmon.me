import { createVueApp } from './main'
import Adsense from '@/plugins/vue-google-adsense'
import Swiper from '@/plugins/vue-awesome-swiper'

// { src: '~/plugins/polyfill', mode: 'client' },
// { src: '~/plugins/lozad', mode: 'client' },
// { src: '~/plugins/favico', mode: 'client' },
// { src: '~/plugins/analytics', mode: 'client' },
// { src: '~/plugins/emoji-233333', mode: 'client' },
// { src: '~/plugins/copy-right', mode: 'client' },
// { src: '~/plugins/popup', mode: 'client' },
// { src: '~/plugins/amplitude', mode: 'client' }

const app = createVueApp()

// plugins
// @ts-ignore
app.use(Swiper)
app.use(Adsense)
app.mount('#app')

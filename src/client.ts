import './polyfill'

import { MUSIC_ALBUM_ID } from '/@/config/app.config'
import { VueEnv } from '/@/vuniversal/env'
// import Adsense from '/@/plugins/vue-google-adsense'
// import Swiper from '/@/plugins/vue-awesome-swiper'
import defer from '/@/services/defer'
import { createMusic } from '/@/services/music'
import { enableAnalytics } from '/@/services/analytics'
import { enableCopyright } from '/@/services/copyright'
import { exportLozadToGlobal } from '/@/services/lozad'
import { Language } from '/@/language/data'
import { createVueApp } from './main'

// { src: '/@/plugins/lozad', mode: 'client' },
// { src: '/@/plugins/popup', mode: 'client' },

const vueApp = createVueApp({ target: VueEnv.Client })
const { app, router, globalState } = vueApp

// plugins
// @ts-ignore
// app.use(Swiper)
// app.use(Adsense)
app.use(defer)

// init
vueApp.globalState.resetOnClient()
vueApp.theme.resetOnClient()
vueApp.i18n.set(globalState.userAgent.isZhUser ? Language.Zh : Language.En)

let music
if (!globalState.userAgent.isMobile) {
  music = createMusic({ albumId: MUSIC_ALBUM_ID })
  app.use(music)
}

app.mount('#app').$nextTick(() => {
  // music?.start()
  exportLozadToGlobal()
  enableCopyright()
  enableAnalytics(app, router)
})

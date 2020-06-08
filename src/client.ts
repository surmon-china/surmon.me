import './polyfill'

import { MUSIC_ALBUM_ID } from '/@/config/app.config'
import { VueEnv, isProd } from '/@/vuniversal/env'
// import Adsense from '/@/plugins/vue-google-adsense'
// import Swiper from '/@/plugins/vue-awesome-swiper'
import { createDefer } from '/@/services/defer'
import { createMusic } from '/@/services/music'
import { createPopup } from '/@/services/popup'
import { consoleSolgan } from '/@/services/slogan'
import { enableAnalytics } from '/@/services/analytics'
import { enableCopyright } from '/@/services/copyright'
import { enableBaiduSeoPush } from '/@/services/baidu-seo-push'
import { enableAutoTitleSurprise } from './services/title-surprise'
import { exportLozadToGlobal } from '/@/services/lozad'
import { Language } from '/@/language/data'
import { createVueApp } from './main'

const { app, router, store, globalState, theme, i18n } = createVueApp({ target: VueEnv.Client })
const defer = createDefer()

// app.use(Swiper)
// app.use(Adsense)
app.use(defer, { exportToGlobal: true })
app.use(createPopup(), { exportToGlobal: true })

// init
globalState.resetOnClient()
theme.resetOnClient()
i18n.set(globalState.userAgent.isZhUser ? Language.Zh : Language.En)

app.mount('#app').$nextTick(() => {
  exportLozadToGlobal()
  enableCopyright()
  enableAnalytics(app, router)

  // Desktop
  if (!globalState.userAgent.isMobile) {
    const music = createMusic({ albumId: MUSIC_ALBUM_ID })
    app.use(music)
    defer.addTask(music.start)
    // store.dispatch('wallpaper/fetchPapers', i18n.language)
    enableAutoTitleSurprise()
  }

  // Production
  if (isProd) {
    enableBaiduSeoPush(router)
    consoleSolgan(i18n)
  }
})

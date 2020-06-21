import './polyfill'

import { MUSIC_ALBUM_ID } from '/@/config/app.config'
import { VueEnv, isProd } from '/@/vuniversal/env'
import swiper from '/@/services/swiper'
import adsense from '/@/services/adsense'
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

const { app, router, globalState, theme, i18n } = createVueApp({ target: VueEnv.Client })
const music = createMusic({ albumId: MUSIC_ALBUM_ID, autoStart: false })
const defer = createDefer()

app.use(swiper)
app.use(adsense)
app.use(music)
app.use(defer, { exportToGlobal: true })
app.use(createPopup(), { exportToGlobal: true })

// init
globalState.resetOnClient()
theme.resetOnClient()
i18n.set(globalState.userAgent.isZhUser ? Language.Zh : Language.En)

app.mount('#app').$nextTick(() => {
  exportLozadToGlobal()
  enableAnalytics(app, router)

  // Desktop
  if (!globalState.userAgent.isMobile) {
    defer.addTask(music.start)
    enableAutoTitleSurprise()
  }

  // Production
  if (isProd) {
    enableCopyright()
    enableBaiduSeoPush(router)
    consoleSolgan(i18n)
  }
})

/**
 * @file Server render entry
 * @module server-entry
 * @author Surmon <https://github.com/surmon-china>
 */

import serialize from 'serialize-javascript'
import { toRaw } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { createMemoryHistory } from 'vue-router'
import { createHead, renderSSRHead } from '@unhead/vue/server'
import { createMainApp, MainApp } from '/@/app/main'
import { createLogger } from '/@/utils/logger'
import type { SSRHeadPayload, VueHeadClient } from '@unhead/vue/server'
import type { SSRContext } from '/@/app/context'
import type { AppErrorValue } from '/@/app/state'
import type { RequestContext } from '@/server/main'
import type { CacheStore } from '@/server/services/cache'
import { parseAcceptLanguage } from '/@/server/utils/accept-language'
import { formatErrorToAppError } from '/@/app/error'
import { renderSSRStateScript, renderSSRContextScript } from '/@/app/universal'
import { Theme, THEME_STORAGE_KEY } from '/@/composables/theme'
import * as HTTP_CODES from '/@/constants/http-code'
import { resolvePageLayout } from '/@/constants/page-layout'
import { CDNPrefix, getCDNPrefix } from '/@/transforms/url'
import { isCNCode } from '/@/transforms/region'
import { isDev } from '/@/configs/app.env'
import { APP_CONFIG } from '/@/configs/app.config'
import API_CONFIG from '/@/configs/app.api'

const renderLogger = createLogger('SSR:Render')
const devDebug = (...messages: any[]) => isDev && renderLogger.debug(...messages)

const getRegionByCountryCode = (country?: string) => {
  return country && isCNCode(country) ? 'cn' : 'global'
}

const createSSRContext = (context: RequestContext, error: AppErrorValue = null): SSRContext => {
  // 'country-xxx' header is provided by the Nginx server
  const countryName = context.headers['country-name']!
  const countryCode = context.headers['country-code']!
  const cdnDomain = isCNCode(countryCode) ? API_CONFIG.CDN_CHINA : API_CONFIG.CDN_GLOBAL
  const assetsPrefix = getCDNPrefix(cdnDomain, CDNPrefix.Assets)
  return {
    requestUrl: context.url,
    userAgent: context.headers['user-agent'],
    acceptLanguage: context.headers['accept-language'],
    cookieTheme: context.cookies[THEME_STORAGE_KEY],
    countryName,
    countryCode,
    cdnDomain,
    assetsPrefix,
    error
  }
}

const createSSRMainApp = (ssrContext: SSRContext): [MainApp, VueHeadClient] => {
  const mainApp = createMainApp({
    routerHistoryCreator: createMemoryHistory,
    languages: parseAcceptLanguage(ssrContext.acceptLanguage, { ignoreWildcard: true }),
    userAgent: ssrContext.userAgent,
    theme: (ssrContext.cookieTheme as Theme) ?? Theme.Light,
    region: getRegionByCountryCode(ssrContext.countryCode),
    error: ssrContext.error
  })

  // HACK: hack components and directives for SSR fix warn
  // https://github.com/vuejs/core/blob/main/CHANGELOG.md#features
  const hackDirectives = ['lozad']
  const hackComponents = ['progress-bar', 'popup-root', 'popup', 'Adsense']
  hackDirectives.forEach((d) => mainApp.app.directive(d, {}))
  hackComponents.forEach((c) => mainApp.app.component(c, {}))

  // init global head attributes
  // https://unhead.unjs.io/docs/vue/head/guides/get-started/installation
  // https://unhead.unjs.io/docs/vue/head/guides/get-started/migration#default-ssr-tags
  // https://unhead.unjs.io/docs/vue/head/guides/get-started/migration#tag-sorting-updated
  const head = createHead({
    disableDefaults: true,
    disableCapoSorting: true,
    init: [mainApp.getGlobalHead()]
  })
  mainApp.app.use(head)

  return [mainApp, head]
}

export interface RenderResult {
  code: number
  appHTML: string
  headHTML: SSRHeadPayload
  assetsPrefix: string
  stateScripts: string
  contextScripts: string
}

/**
 * @name Error page renderer
 * 1. server runtime error
 * 2. render fetch error
 * 3. router validate/404 error
 */
export const renderError = async (context: RequestContext, error: unknown): Promise<RenderResult> => {
  const appError: AppErrorValue = formatErrorToAppError(error, {
    code: APP_CONFIG.default_error_code,
    message: 'Unknown Render Error'
  })
  const ssrContext = createSSRContext(context, appError)
  const [{ app, theme }, head] = createSSRMainApp(ssrContext)
  head.push({ title: `Server Error: ${appError.message}` })
  return {
    code: appError.code,
    appHTML: await renderToString(app, ssrContext),
    headHTML: await renderSSRHead(head),
    assetsPrefix: ssrContext.assetsPrefix,
    contextScripts: renderSSRContextScript(serialize(ssrContext)),
    stateScripts: renderSSRStateScript(
      serialize({
        theme: theme.theme.value,
        region: getRegionByCountryCode(ssrContext.countryCode)
      })
    )
  }
}

// App page renderer
export const renderApp = async (context: RequestContext, cache: CacheStore): Promise<RenderResult> => {
  const ssrContext = createSSRContext(context)
  const [{ app, router, store, theme, i18n, globalState }, head] = createSSRMainApp(ssrContext)

  // Make cache Key
  const language = i18n.language.value
  const themeName = theme.theme.value
  const deviceType = globalState.userAgent.isMobile ? 'mobile' : 'desktop'
  const regionCode = getRegionByCountryCode(ssrContext.countryCode)
  const cacheKey = `ssr:${language}_${regionCode}_${deviceType}_${themeName}_${ssrContext.requestUrl}`

  // Return cached result if exists
  const isCached = await cache.has(cacheKey)
  devDebug(`cache:`, isCached, `| "${cacheKey}"`)
  if (isCached) {
    return {
      ...(await cache.get<RenderResult>(cacheKey)),
      contextScripts: renderSSRContextScript(serialize({ ...ssrContext, cacheStatus: 'hit' })),
      code: HTTP_CODES.SUCCESS
    }
  }

  try {
    // Try to render the main app
    const startTime = Date.now()

    devDebug(`- 1. route.push.validate: ${ssrContext.requestUrl}`)
    await router.push(ssrContext.requestUrl)
    await router.isReady()

    devDebug('- 2. store.serverInit')
    await store.prefetchOnServer()

    // Because the layout func set has by animation done.
    devDebug('- 3. set layout')
    globalState.setPageLayout(resolvePageLayout(router.currentRoute.value.meta.layout))

    // MARK: `vite-plugin-vue` introduces a side effect on `ssrContext.modules`,
    // even though it's not needed in production environments.
    // This is not an issue with `vite-plugin-vue` itself — the `context` argument in `renderToString`
    // is designed specifically for the rendering process, not for passing data into the SSR script.
    // https://github.com/vitejs/vite-plugin-vue/blob/9be175d9f192ebd864faf688022e235aa047a3cf/packages/plugin-vue/src/main.ts#L184
    // https://github.com/vitejs/vite-plugin-vue/blob/9be175d9f192ebd864faf688022e235aa047a3cf/playground/ssr-vue/src/entry-server.js#L12
    devDebug('- 4. renderToString')
    const appHTML = await renderToString(app, { ...ssrContext })
    // WORKAROUND: `async setup` | `onServerPrefetch` can't break `renderToString`, resulting in empty HTML, so need to re-render based on manual markup.
    if (globalState.error.value) {
      throw toRaw(globalState.error.value)
    }

    devDebug('- 5. renderSSRHead')
    const headHTML = await renderSSRHead(head)

    devDebug('- 6. SSR State & SSR context script')
    const contextScripts = renderSSRContextScript(serialize({ ...ssrContext, cacheStatus: 'miss' }))
    const stateScripts = renderSSRStateScript(
      serialize({
        store: store.state.value,
        theme: theme.theme.value,
        layout: globalState.pageLayout.value.layout,
        region: getRegionByCountryCode(ssrContext.countryCode)
      })
    )

    devDebug('rendered:', Date.now() - startTime, 'ms')

    const renderedForCache = {
      appHTML,
      headHTML,
      stateScripts,
      assetsPrefix: ssrContext.assetsPrefix
    }

    // Set cache with TTL if specified in route meta
    const cacheTTL = router.currentRoute.value.meta?.ssrCacheTTL
    if (cacheTTL !== false && typeof cacheTTL === 'number' && cacheTTL > 0) {
      cacheTTL === Infinity
        ? cache.set(cacheKey, renderedForCache)
        : cache.set(cacheKey, renderedForCache, cacheTTL)
    }

    return {
      ...renderedForCache,
      contextScripts,
      code: HTTP_CODES.SUCCESS
    }
  } catch (error: any) {
    return renderError(context, error)
  }
}

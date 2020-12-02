/**
 * @file Helmet service
 * @description backup
 * @module service/helmet
 * @author Surmon <https://github.com/surmon-china>
 */

import {
  inject,
  reactive,
  computed,
  watchEffect,
  // onMounted,
  onActivated,
  onDeactivated,
  App,
  Plugin,
  WatchStopHandle,
  HtmlHTMLAttributes,
  BaseHTMLAttributes,
  MetaHTMLAttributes,
  LinkHTMLAttributes,
  ScriptHTMLAttributes,
  readonly,
} from 'vue'

interface Base {
  [key: string]: any
}
interface HelmetHTMLAttributes extends HtmlHTMLAttributes, Base {
  xmlns?: string
  lang?: string
}
interface _HelmetConfig {
  title: string
  keywords: string
  description: string
  titleTemplate(title: string): string
  htmlAttrs: HelmetHTMLAttributes
  meta: Array<MetaHTMLAttributes & Base>
  link: Array<LinkHTMLAttributes & Base>
  script: Array<ScriptHTMLAttributes & Base>
}

export type Helmet = ReturnType<typeof createHelmetStore>
export type HelmetConfig = Partial<_HelmetConfig>

const DEFAULT_CONFIG: _HelmetConfig = {
  title: '',
  keywords: '',
  description: '',
  titleTemplate: title => title,
  htmlAttrs: {},
  meta: [],
  link: [],
  script: []
}

const HELMET_KEY = Symbol('helmet')
const createHelmetStore = (initConfig: HelmetConfig) => {
  const config = Object.freeze({
    ...DEFAULT_CONFIG,
    ...initConfig
  })

  const state = reactive({
    title: '',
    keywords: '',
    description: ''
  })

  const cState = computed(() => {
    return {
      title: state.title
        ? config.titleTemplate(state.title)
        : config.title,
      keywords: state.keywords || config.keywords,
      description: state.description || config.description
    }
  })

  // SSR html
  const transformAttrCode = (attrs: Base | any) => {
    return Object.keys(attrs).map(key => `${key}="${attrs[key]}"`)
  }
  const transformMetaCode = (meta: MetaHTMLAttributes) => {
    return `<meta ${transformAttrCode(meta).join(' ')} />`
  }
  const transformLinkCode = (link: LinkHTMLAttributes) => {
    return `<link ${transformAttrCode(link).join(' ')} >`
  }
  const transformScriptCode = (script: LinkHTMLAttributes) => {
    return `<script ${transformAttrCode(script).join(' ')} ></script>`
  }

  const getHTML = () => ({
    title: `<title>${cState.value.title}</title>`,
    keywords: transformMetaCode({
      name: 'keywords',
      content: cState.value.keywords
    }),
    description: transformMetaCode({
      name: 'description',
      content: cState.value.keywords
    }),
    htmlAttrs: transformAttrCode(config.htmlAttrs).join(' '),
    meta: config.meta.map(transformMetaCode),
    link: config.link.map(transformLinkCode),
    script: config.script.map(transformScriptCode),
  })

  // Client
  // MARK: 暂不支持纯 SPA，SPA 环境下会忽略不可变数据
  let watchStopHandle: WatchStopHandle | null
  const bindClient = () => {
    const appendNewMeta = (metaData: MetaHTMLAttributes) => {
      const head = document.querySelector('head')
      const meta = document.createElement('meta')
      Object.keys(metaData).forEach(key => {
        meta[key] = metaData[key]
        meta.setAttribute(key, metaData[key])
      })
      head?.appendChild(meta)
    }

    const setHeadMeta = (name: string, content: string) => {
      const head = document.querySelector('head')
      if (!head) {
        return false
      }
      const targetMetaElement = Array.from(head.children || []).find(child => (
        child.tagName === 'META' &&
        child.getAttribute('name') === name
      ))
      if (targetMetaElement) {
        targetMetaElement.setAttribute('content', content)
      } else {
        appendNewMeta({ name, content })
      }
    }

    watchStopHandle = watchEffect(() => {
      document.title = cState.value.title
      setHeadMeta('keywords', cState.value.keywords)
      setHeadMeta('description', cState.value.description)
    })
  }
  const unbindClient = () => {
    watchStopHandle?.()
    watchStopHandle = null
  }

  return {
    state: readonly(state),
    cState: readonly(cState),
    bindClient,
    unbindClient,
    get html() {
      return getHTML()
    }
  }
}

export function createHelmet(config: HelmetConfig): Helmet & Plugin {
  let installed = false
  const helmet = createHelmetStore(config)
  return {
    ...helmet,
    install(app: App) {
      if (!installed) {
        app.provide(HELMET_KEY, helmet)
        installed = true
      }
    }
  }
}

export function useHelmet(state?: HelmetConfig) {
  const helmet = inject<Helmet>(HELMET_KEY)
  // if (helmet && state) {
  //   const id = new Date().getTime().toString()
  //   const push = () => helmet.push(id, state)
  //   const remove = () => helmet.remove(id)

  //   push()
  //   onActivated(push)
  //   onDeactivated(remove)
  // }
  // // TODO:
  // // onmounted -> push
  // // ondestory -> unshift
  return helmet as Helmet
}

import {
  inject,
  reactive,
  computed,
  watchEffect,
  // onMounted,
  onBeforeUnmount,
  App,
  Plugin,
  WatchStopHandle,
  MetaHTMLAttributes,
  readonly,
} from 'vue'
import { isClient } from '/@/enverionment'

interface Base {
  [key: string]: any
}

export type Helmet = ReturnType<typeof createHelmetStore>
export interface HelmetConfig {
  title: string
  keywords: string
  description: string
  titleTemplate(title: string): string
}

const appendNewMeta = (metaData: MetaHTMLAttributes) => {
  const head = document.querySelector('head')
  const meta = document.createElement('meta')
  Object.keys(metaData).forEach(key => {
    meta[key] = metaData[key]
    meta.setAttribute(key, metaData[key])
  })
  head?.appendChild(meta)
}

const getMetaElement = (name: string) => {
  const head = document.querySelector('head')
  return Array.from(head?.children || []).find(child => (
    child.tagName === 'META' &&
    child.getAttribute('name') === name
  ))
}
const getMetaContent = (name: string) => {
  return getMetaElement(name)?.getAttribute?.('content')
}

const setHeadMeta = (name: string, content: string) => {
  const head = document.querySelector('head')
  if (!head) {
    return false
  }
  const targetMetaElement = getMetaElement(name)
  targetMetaElement
    ? targetMetaElement.setAttribute('content', content)
    : appendNewMeta({ name, content })
}

const HELMET_KEY = Symbol('helmet')
const createHelmetStore = (defaultConfig: HelmetConfig) => {
  const state = reactive({
    title: isClient && document.title || '',
    keywords: isClient && getMetaContent('keywords') || '',
    description: isClient && getMetaContent('description') || '',
  })

  const cState = computed(() => {
    return {
      title: state.title
        ? defaultConfig.titleTemplate(state.title)
        : defaultConfig.title,
      keywords: state.keywords || defaultConfig.keywords,
      description: state.description || defaultConfig.description
    }
  })

  // SSR html
  const transformAttrCode = (attrs: Base | any) => {
    return Object.keys(attrs).map(key => `${key}="${attrs[key]}"`)
  }
  const transformMetaCode = (meta: MetaHTMLAttributes) => {
    return `<meta ${transformAttrCode(meta).join(' ')} />`
  }
  const html = computed(() => ({
    title: `<title>${cState.value.title}</title>`,
    keywords: transformMetaCode({
      name: 'keywords',
      content: cState.value.keywords
    }),
    description: transformMetaCode({
      name: 'description',
      content: cState.value.description
    })
  }))

  // Client
  let watchStopHandle: WatchStopHandle | null
  const bindClient = () => {
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
    state,
    cState: readonly(cState),
    html,
    bindClient,
    unbindClient
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

export function useTitle(title: () => string, once = false) {
  const helmet = inject<Helmet>(HELMET_KEY) as Helmet
  if (once) {
    helmet.state.title = title()
  } else {
    const targetTitle = computed(title)
    let stopWatch: WatchStopHandle | null  = watchEffect(() => {
      helmet.state.title = targetTitle.value
    })
    onBeforeUnmount(() => {
      stopWatch?.()
      stopWatch = null
      helmet.state.title = ''
    })
    return stopWatch
  }
}

export function useHelmet() {
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
  return {
    helmet: helmet as Helmet,
    title: useTitle
  }
}

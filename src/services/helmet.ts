import {
  ref,
  inject,
  computed,
  watchEffect,
  onMounted,
  onBeforeUnmount,
  App,
  Plugin,
  WatchStopHandle,
  MetaHTMLAttributes,
  readonly,
} from 'vue'
import { isClient } from '/@/environment'
import { onClient, onServer } from '/@/universal'

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

export interface HelmetHookState {
  title?: string
  keywords?: string
  description?: string
}

type HelmetComputer = () => HelmetHookState
const HELMET_KEY = Symbol('helmet')
const createHelmetStore = (defaultConfig: HelmetConfig) => {

  const computer = ref<HelmetComputer>(() => ({
    title: isClient && document.title || '',
    keywords: isClient && getMetaContent('keywords') || '',
    description: isClient && getMetaContent('description') || '',
  }))
  const setComputer = (_computer: HelmetComputer) => {
    computer.value = _computer
  }
  const resetComputer = () => {
    computer.value = () => ({
      title: '',
      keywords: '',
      description: '',
    })
  }

  const state = computed(() => computer.value())
  const cState = computed(() => {
    return {
      title: state.value.title
        ? defaultConfig.titleTemplate(state.value.title)
        : defaultConfig.title,
      keywords: state.value.keywords || defaultConfig.keywords,
      description: state.value.description || defaultConfig.description
    }
  })

  // SSR html
  const transformAttrCode = (attrs: Base | any) => {
    return Object.keys(attrs).map(key => `${key}="${attrs[key]}"`)
  }
  const transformMetaCode = (meta: MetaHTMLAttributes) => {
    return `<meta ${transformAttrCode(meta).join(' ')}>`
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
    setComputer,
    resetComputer,
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

export type HelmetHook = ReturnType<typeof useHelmet>
export function useHelmet() {
  const helmet = inject<Helmet>(HELMET_KEY) as Helmet
  const use = (computer: HelmetComputer) => {
    onServer(() => {
      helmet.setComputer(computer)
    })
    onClient(() => {
      onMounted(() => {
        helmet.setComputer(computer)
      })
      onBeforeUnmount(() => {
        helmet.resetComputer()
      })
    })
  }

  return use
}

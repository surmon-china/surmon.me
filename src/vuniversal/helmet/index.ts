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
  UnwrapRef,
  HTMLAttributes,
  HtmlHTMLAttributes,
  BaseHTMLAttributes,
  MetaHTMLAttributes,
  LinkHTMLAttributes,
  StyleHTMLAttributes,
  ScriptHTMLAttributes,
} from 'vue'

interface Base {
  [key: string]: any
}

interface HelmeHTMLAttributes extends HtmlHTMLAttributes, Base {
  xmlns?: string
  lang?: string
}

interface HelmetData {
  title: string
  base: BaseHTMLAttributes & Base
  htmlAttributes: HelmeHTMLAttributes
  bodyAttributes: HTMLAttributes & Base
  meta: Array<MetaHTMLAttributes & Base>
  link: Array<LinkHTMLAttributes & Base>
  style: Array<StyleHTMLAttributes & Base>
  script: Array<ScriptHTMLAttributes & Base>
  noscript: string
}

const DEFAULT_STATE: HelmetData = {
  title: '',
  base: {},
  htmlAttributes: {},
  bodyAttributes: {},
  meta: [],
  link: [],
  style: [],
  script: [],
  noscript: ''
}

export type HelmetComputedState = UnwrapRef<HelmetData>
export type HelmetState = Partial<HelmetData>
export type HelmetConfig = Partial<HelmetConfigData>

interface HelmetConfigData {
  autoRefresh?: boolean
  attribute?: string
  ssrAttribute?: string
}

const DEFAULT_CONFIG: HelmetConfig = {
  autoRefresh: true,
  attribute: 'data-vun',
  ssrAttribute: 'data-vun-server-rendered',
}

// 1. 靠注册不断地驱动和注册，不响应式，当一个组件的数据释放后，我的本地无法移除对应 dom
// 2. 靠生命周期维护，当一个组件应用，则注册；当组件释放，则删除
// 维护一个栈，当有新的注册时，放进队列，当组件释放时，移除，计算出一份数据，这份数据是合并后的数据，并实施更新
const HELMET_KEY = Symbol('helmet')

interface HelmeStackItem {
  id: string
  state: HelmetState
}

export type Helme = ReturnType<typeof getHelmet>
function getHelmet(initState: HelmetState, initConfig?: HelmetConfig) {

  // Base state
  const baseStateObject = Object.freeze({
    ...DEFAULT_STATE,
    ...initState
  })
  const baseState = {
    id: '1',
    state: reactive<HelmetData>({ ...baseStateObject })
  }

  const helmetStateStack = reactive<HelmeStackItem[]>([baseState])
  const helmetOption = {
    ...DEFAULT_CONFIG,
    ...initConfig,
    disposer: null as WatchStopHandle | null
  }

  // 1. 现在以堆栈的顺序为合成名称，是有问题的，应该以组件的嵌套层级为单位
  // 2. 以堆栈顺序为合成条件，进入到一个页面，meta 就会被更新为最新，如果是子组件控制，子组件就应该自己控制 push remove
  const currentState = computed<HelmetData>(() => {
    return {
      title: helmetStateStack[helmetStateStack.length - 1].state.title || '',
      base: {},
      htmlAttributes: {},
      bodyAttributes: {},
      meta: [],
      link: [],
      style: [],
      script: [],
      noscript: ''
    }
  })

  const autoUpdate = () => {
    helmetOption.disposer?.()
    helmetOption.disposer = watchEffect(() => {
      document.title = currentState.value.title
      // TODO: 其他的更改
    })
  }
  const stopUpdate = () => {
    helmetOption.disposer?.()
    helmetOption.disposer = null
  }

  if (helmetOption.autoRefresh) {
    autoUpdate()
  }

  return {
    push(id: string, state: HelmetState): void {
      helmetStateStack.push({ id, state })
    },
    remove(id: string): void {
      const index = helmetStateStack.findIndex(item => item.id === id)
      helmetStateStack.splice(index, 1)
    },
    clear(): void {
      helmetStateStack.splice(0, helmetStateStack.length)
    },
    reset(): void {
      helmetStateStack.splice(0, helmetStateStack.length, baseState)
    },
    pause() {
      stopUpdate()
    },
    resume(): void {
      autoUpdate()
    },
    refresh(): void {
      // 刷新 DOM
    },
    get state() {
      // TODO: 不应该是响应式数据
      return { ...currentState.value }
    },
    get html() {
      // 获取最新的混合后的结果的 html 化内容
      return {
        get title() {
          return `<title>${currentState.value.title}</title>`
        },
        meta: baseStateObject.meta.map(meta => `<meta >`)
      }
      // htmlAttributes: {},
      // bodyAttributes: {},
      // meta: [],
      // link: [],
      // style: [],
      // script: [],
      // noscript: ''
    }
  }
}

export function createHelmet(initState: HelmetState, config?: HelmetConfig): Helme & Plugin {
  let installed = false
  const helmet = getHelmet(initState, config)
  return {
    ...helmet,
    install(app: App) {
      if (!installed) {
        app.provide(HELMET_KEY, helmet)
        app.mixin({
          created () {
            
          },
          mounted () {
            // init()
          },
          beforeDestroy () {
            // destroy()
          }
        })
        installed = true
      }
    }
  }
}

export function useHelmet(state?: HelmetState) {
  const helmet = inject<Helme>(HELMET_KEY)
  if (helmet && state) {
    const id = new Date().getTime().toString()
    const push = () => helmet.push(id, state)
    const remove = () => helmet.remove(id)

    push()
    onActivated(push)
    onDeactivated(remove)
  }
  // TODO:
  // onmounted -> push
  // ondestory -> unshift
  return helmet as Helme
}

/* eslint-disable vue/multi-word-component-names */
/**
 * @file i18n service
 * @module service/i18n
 * @author Surmon <https://github.com/surmon-china>
 */

import {
  App,
  inject,
  computed,
  ref,
  watch,
  readonly,
  defineComponent,
  WatchStopHandle,
  ObjectDirective
} from 'vue'

export interface I18nLanguage {
  code: string
  iso: string
  name: string
}

export type I18nRender = (...args: any[]) => string
export type I18nMap<K extends string | number, L extends string> = {
  [key in K]: {
    [language in L]: string | I18nRender
  }
}

interface Ii18nConfig {
  default: string
  languages: I18nLanguage[]
  map: I18nMap<string | number, string>
}

const I18nSymbol = Symbol('i18n')
const createI18nStore = (config: Ii18nConfig) => {
  const language = ref(config.default)
  const languageCodes = config.languages.map((lang) => lang.code)
  const l = computed(() => config.languages.find((l) => l.code === language.value))

  const set = <L extends string = string>(lang: L) => {
    if (languageCodes.includes(lang) && language.value !== lang) {
      language.value = lang
    }
  }
  const toggle = () => {
    const currentIndex = languageCodes.findIndex((langCode) => langCode === language.value)
    const nextIndex = currentIndex < languageCodes.length - 1 ? currentIndex + 1 : 0
    if (currentIndex !== nextIndex) {
      set(languageCodes[nextIndex])
    }
  }
  const translate = <T extends string = string>(key: T, targetLanguage?: string, ...args) => {
    const content = config.map[key]?.[targetLanguage || language.value]
    if (!content) {
      return
    }
    return typeof content === 'string' ? content : content(...args)
  }

  return {
    language: readonly(language),
    l,
    set,
    toggle,
    translate,
    t: translate
  }
}

/**
 * @example <span>{{ t(LANGUAGE_KEYS.SOME_KEY) }}</span>
 * @example <span v-i18n="LANGUAGE_KEYS.SOME_KEY"></span>
 * @example <span v-t="LANGUAGE_KEYS.SOME_KEY"></span>
 * @example <span><i18n :lkey="LANGUAGE_KEYS.SOME_KEY" /></span>
 * @example <span><i18n zh="你好，世界" en="hello, world!" /></span>
 * @example (
 *  <i18n>
 *    <template #zh>你好，世界</template>
 *    <template #en>hello, world!</template>
 *  </i18n>
 * )
 */
export type I18n = ReturnType<typeof createI18nStore>
export const createI18n = (config: Ii18nConfig) => {
  const i18nStore = createI18nStore(config)

  interface I18nDirectiveElement extends HTMLElement {
    _i18nDirectiveStopHandler?: WatchStopHandle
  }
  const i18nDirective: ObjectDirective<I18nDirectiveElement> = {
    beforeMount(element, binding) {
      element._i18nDirectiveStopHandler = watch(
        () => i18nStore.language.value,
        () => {
          element.textContent = i18nStore.t(binding.value) || ''
        },
        { immediate: true }
      )
    },
    beforeUnmount(element) {
      element?._i18nDirectiveStopHandler?.()
    }
  }

  const i18nComponent = defineComponent({
    name: 'I18n',
    props: {
      lkey: [String, Number, Symbol]
    },
    render() {
      if (this.$props.lkey) {
        return i18nStore.t(this.$props.lkey as string)
      } else {
        const lang = i18nStore.language.value
        return this.$attrs[lang] || this.$slots[lang]?.()
      }
    }
  })

  return {
    ...i18nStore,
    install(app: App) {
      app.config.globalProperties.$i18n = i18nStore
      app.provide(I18nSymbol, i18nStore)
      app.component(i18nComponent.name, i18nComponent)
      // MARK: SSR not support
      app.directive('i18n', i18nDirective)
      app.directive('t', i18nDirective)
    }
  }
}

export const useI18n = (): I18n => {
  return inject(I18nSymbol) as I18n
}

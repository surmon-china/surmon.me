/**
 * @file i18n
 * @module composable/i18n
 * @author Surmon <https://github.com/surmon-china>
 */

import type { App, DefineComponent } from 'vue'
import { inject, computed, ref, readonly, defineComponent } from 'vue'

export type I18nValueRender = (...args: any[]) => string
export type I18nLocaleMap<Lang extends string, V = string> = {
  [code in Lang]: V
}

export interface I18nLocale<K extends string> {
  code: string
  iso: string
  name: string
  data: {
    [key in K]: string | I18nValueRender
  }
}

interface I18nConfig<K extends string> {
  default: string
  keys: Array<K>
  locales: I18nLocale<K>[]
}

const createI18nState = <K extends string>(config: I18nConfig<K>) => {
  const language = ref(config.default)
  const languageCodes = config.locales.map((lang) => lang.code)
  const l = computed(() => config.locales.find((l) => l.code === language.value))
  const localeMap = config.keys.reduce<{
    [key in K]: I18nLocaleMap<string, string | I18nValueRender>
  }>(
    (map, key) => ({
      ...map,
      [key]: config.locales.reduce(
        (result, language) => ({
          ...result,
          [language.code]: language.data[key]
        }),
        {}
      )
    }),
    {} as any
  )

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

  const translate = <T extends K>(key: T, targetLanguage?: string | null, ...args) => {
    const content = localeMap[key]?.[targetLanguage ?? language.value]
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

export type I18n = ReturnType<typeof createI18nState>

const I18nSymbol = Symbol('i18n-state')

/**
 * @example <span>{{ i18n.t(LocaleKey.SOME_KEY) }}</span>
 * @example <i18n :k="LocaleKey.SOME_KEY" />
 * @example <i18n zh="你好，世界" en="hello, world!" />
 * @example (
 *  <i18n>
 *    <template #zh>你好，世界</template>
 *    <template #en>hello, world!</template>
 *  </i18n>
 * )
 */
export const createI18n = <K extends string>(config: I18nConfig<K>) => {
  const i18nState = createI18nState(config)
  const i18nComponent = defineComponent({
    name: 'I18n',
    props: {
      k: [String, Number, Symbol]
    },
    render() {
      if (this.$props.k) {
        return i18nState.t(this.$props.k as K, null, this.$attrs)
      } else {
        const lang = i18nState.language.value
        return this.$attrs[lang] || this.$slots[lang]?.()
      }
    }
  })

  return Object.assign(i18nState, {
    install(app: App) {
      app.provide(I18nSymbol, i18nState)
      app.component(i18nComponent.name!, i18nComponent)
      app.config.globalProperties.$i18n = i18nState
    }
  })
}

export const useI18n = (): I18n => {
  return inject(I18nSymbol) as I18n
}

declare module 'vue' {
  interface GlobalComponents {
    I18n: DefineComponent<{ k?: string | number | symbol; zh?: string; en?: string }>
  }
  interface ComponentCustomProperties {
    $i18n: I18n
  }
}

/**
 * @file lazy load
 * @module composable/lozad
 * @author Surmon <https://github.com/surmon-china>
 */

// https://developer.mozilla.org/zh-CN/docs/Web/Performance/Lazy_loading
// https://github.com/mfranzke/loading-attribute-polyfill
// https://github.com/ApoorvSaxena/lozad.js
import _lozad from 'lozad'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import type { App, Plugin, Directive } from 'vue'

export const LOZAD_CLASS_NAME = 'lozad'
export const LOADED_CLASS_NAME = 'loaded'

const lozadObserve = (target: _lozad.Selector) => {
  const observer = _lozad(target, { loaded: (element) => element.classList.add(LOADED_CLASS_NAME) })
  observer.observe()
  return observer
}

export const useLozad = (options?: { elementor?: () => HTMLElement; immediate?: boolean; className?: string }) => {
  const container = ref<HTMLElement>()
  const observer = ref<_lozad.Observer | null>(null)

  const observe = () => {
    const targetClass = options?.className || LOZAD_CLASS_NAME
    const targetElement = options?.elementor?.() || container.value
    if (targetElement?.querySelectorAll) {
      const lozadElements = targetElement.querySelectorAll(`.${targetClass}`)
      if (lozadElements?.length) {
        observer.value = lozadObserve(lozadElements)
      }
    }
  }

  const unobserve = () => {
    if (observer.value) {
      observer.value.observer.disconnect()
      observer.value = null
    }
  }

  onMounted(() => {
    if (options?.immediate ?? true) {
      observe()
    }
  })

  onBeforeUnmount(() => {
    unobserve()
  })

  return { element: container, observer, observe, unobserve }
}

export const lozadDirective: Directive = {
  mounted(element) {
    element.__lozad_observer = lozadObserve(element)
  },
  beforeUnmount(element) {
    element.__lozad_observer?.observer.disconnect()
    element.__lozad_observer = null
  }
}

export interface LozadPluginConfig {
  exportToGlobal?: boolean
}

export const lozad: Plugin<LozadPluginConfig> = {
  install(app: App, config?: LozadPluginConfig) {
    app.directive('lozad', lozadDirective)
    app.config.globalProperties.$lozad = _lozad
    if (config?.exportToGlobal) {
      window.$lozad = _lozad
    }
  }
}

declare module 'vue' {
  interface GlobalDirectives {
    vLozad: typeof lozadDirective
  }
  interface ComponentCustomProperties {
    $lozad: typeof _lozad
  }
}

declare global {
  interface Window {
    $lozad?: typeof _lozad
  }
}

/**
 * @file App universal ref
 * @module universal.ref
 * @author Surmon <https://github.com/surmon-china>
 */

import { Ref, ref, customRef } from 'vue'
import { isClient, isSPA } from '/@/app/environment'
import { setSSRContext, getSSRContext } from './context'

const getRefData = (key: string) => getSSRContext('refs')[key]
const setRefData = (key: string, value: any) => {
  setSSRContext('refs', {
    ...getSSRContext('refs'),
    [key]: value
  })
}

const getValue = <T>(value: T | (() => T)): T => {
  return value instanceof Function ? value() : value
}

const isProxyable = (value: unknown): value is Record<string, unknown> => {
  return Boolean(value) && typeof value === 'object'
}

// server write only | client read only
// https://github.com/nuxt-community/composition-api/blob/main/src/runtime/composables/ssr-ref.ts
export const universalRef = <T>(key: string, sourceValue: T | (() => T)): Ref<T> => {
  // SPA
  if (isSPA) {
    return ref(getValue(sourceValue)) as Ref<T>
  }

  // SSR
  let value = isClient ? getRefData(key) ?? getValue(sourceValue) : getValue(sourceValue)

  // Client > return ref value
  if (isClient) {
    return ref(value) as Ref<T>
  }

  // Server > return customRef (sync setRef)
  if (sourceValue instanceof Function) {
    setRefData(key, value)
  }

  const getProxy = <T extends Record<string | number, any>>(
    track: () => void,
    trigger: () => void,
    observable: T
  ): T => {
    return new Proxy(observable, {
      get(target, prop: string) {
        track()
        if (isProxyable(target[prop])) {
          return getProxy(track, trigger, target[prop])
        }

        const value = Reflect.get(target, prop)
        return typeof value === 'function' ? value.bind(target) : value
      },
      set(object, prop, newValue) {
        const result = Reflect.set(object, prop, newValue)
        setRefData(key, value)
        trigger()
        return result
      }
    })
  }

  return customRef((track, trigger) => ({
    get: () => {
      track()
      return isProxyable(value) ? getProxy(track, trigger, value) : value
    },
    set: (v: T) => {
      setRefData(key, v)
      value = v
      trigger()
    }
  }))
}

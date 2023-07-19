/**
 * @file placeholder
 * @description render placeholder or data
 * @author Surmon <https://github.com/surmon-china>
 */

import { defineComponent, h, Transition, PropType } from 'vue'
import { LanguageKey } from '/@/language'
import { isUndefined } from '/@/constants/value'
import Empty from './empty.vue'
import Spin from './spin.vue'

export enum Events {
  AfterEnter = 'after-enter'
}

/**
 * @example
 *  <placeholder :loading="false" :data="data.length" :i18n-key="LanguageKey.XXX">
 *    <component />
 *  </placeholder>
 * @example
 *  <placeholder :loading="false" :data="data.length" placeholder="empty">
 *    <component />
 *  </placeholder>
 * @example
 *  <placeholder :loading="true" :data="data.length">
 *    <template #loading> skeleton </template>
 *    <template #placeholder> placeholder </template>
 *    <template #default> <component /> </template>
 *  </placeholder>
 */
export default defineComponent({
  name: 'Placeholder',
  props: {
    data: {
      type: [Array, Object, Boolean, Number],
      default: undefined
    },
    transition: {
      type: Boolean,
      default: true
    },
    transitionName: {
      type: String,
      default: 'module'
    },
    placeholder: String,
    i18nKey: String as PropType<LanguageKey>,
    loading: Boolean
  },
  emits: [Events.AfterEnter],
  setup(props, context) {
    return () => {
      const { data, placeholder, i18nKey, loading, transition, transitionName } = props
      const isEmptyData = !isUndefined(data) && ((Array.isArray(data) && !(data as any).length) || !data)

      const getPlaceholderView = () => {
        return placeholder || i18nKey ? h(Empty, { placeholder, i18nKey }) : context.slots.placeholder?.()
      }

      const getDataView = () => {
        return isEmptyData ? getPlaceholderView() : context.slots.default?.()
      }

      const getLoadingView = () => {
        return context.slots.loading?.() || h(Spin, { loading: true })
      }

      const getView = () => {
        return loading ? getLoadingView() : getDataView()
      }

      if (transition) {
        return h(
          Transition,
          {
            name: transitionName,
            mode: 'out-in',
            onAfterEnter(...args) {
              context.emit(Events.AfterEnter, ...args)
            }
          },
          () => getView()
        )
      }

      return getView()
    }
  }
})

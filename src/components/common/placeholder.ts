import { defineComponent, h, Transition, PropType } from 'vue'
import { LANGUAGE_KEYS } from '/@/language/key'
import Empty from './empty'
import Spin from './spin.vue'

/**
 * @example (
 *  <placeholder :loading="false" :data="data.length" placeholder="empty">
 *    <component />
 *  </placeholder>
 * )
 * @example (
 *  <placeholder :loading="true" :data="data.length">
 *    <template #loading> skeleton </template>
 *    <template #placeholder> placeholder </template>
 *    <template> <component /> </template>
 *  </placeholder>
 * )
*/
export default defineComponent({
  name: 'Placeholder',
  props: {
    placeholder: String,
    pI18nKey: String as PropType<LANGUAGE_KEYS>,
    loading: Boolean,
    transition: Boolean,
    data: [Array, Object as any]
  },
  setup(props, context) {
    return () => {
      const { data, placeholder, pI18nKey, loading, transition } = props
      const isEmptyData = data !== undefined && (
        (Array.isArray(data) && !data.length) ||
        !data
      )

      const getPlaceholderView = () => {
        return (placeholder || pI18nKey)
          ? h(Empty, { placeholder, i18nKey: pI18nKey })
          : context.slots.placeholder?.()
      }

      const getDataView = () => {
        return isEmptyData
          ? getPlaceholderView()
          : context.slots.default?.()
      }

      const getLoadingView = () => {
        return (
          context.slots.loading?.() ||
          h(Spin, { loading: true })
        )
      }

      const getView = () => {
        return loading
          ? getLoadingView()
          : getDataView()
      }

      if (transition) {
        return h(
          Transition,
          {
            name: 'module',
            mode: 'out-in',
            onAfterEnter(...args) {
              context.emit('after-enter', ...args)
            }
          },
          getView()
        )
      }

      return getView()
    }
  }
})

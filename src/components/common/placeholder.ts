import { defineComponent, h, Transition } from 'vue'
import Empty from './empty.vue'
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
    loading: Boolean,
    data: [Array, Object as any]
  },
  setup(props, context) {
    return () => {
      const { data, placeholder, loading } = props
      const isEmptyData = data !== undefined && (
        (Array.isArray(data) && !data.length) ||
        !data
      )

      const getPlaceholderView = () => {
        return placeholder
          ? h(Empty, { placeholder })
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

      return h(
        Transition,
        {
          name: 'module',
          mode: 'out-in',
          onAfterEnter(...args) {
            context.emit('after-enter', ...args)
          }
        },
        loading
          ? getLoadingView()
          : getDataView()
      )
    }
  }
})

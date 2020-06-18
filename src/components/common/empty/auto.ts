import { defineComponent, h, Transition } from 'vue'
import SuEmpty from './base.vue'

export default defineComponent({
  name: 'SuAutoEmpty',
  props: {
    placeholder: String,
    data: [Array, Object as any]
  },
  setup(props, context) {
    return () => {
      const { data, placeholder } = props
      const isEmpty = !data || (Array.isArray(data) && !data.length)

      return h(
        Transition,
        {
          name: 'module',
          mode: 'out-in'
        },
        isEmpty
          ? h(SuEmpty, { placeholder })
          : context.slots.default?.()
      )
    }
  }
})

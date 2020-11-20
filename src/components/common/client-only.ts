import { defineComponent, h, ref, onMounted, Transition } from 'vue'
import { isClient } from '/@/environment'

export const ClientOnly = defineComponent({
  name: 'ClientOnly',
  functional: true,
  props: {
    placeholder: String,
    placeholderTag: {
      type: String,
      default: 'div'
    }
  },
  setup(props, context) {
    // eslint-disable-next-line vue/no-setup-props-destructure
    const { placeholder, placeholderTag } = props

    return () => {
      const defaultSlot = context.slots.default
      const placeholderSlot = context.slots.placeholder

      if (isClient) {
        return defaultSlot?.()
      }

      if (placeholderSlot) {
        return placeholderSlot()
      }

      if (placeholderTag && placeholder) {
        return h(
          placeholderTag,
          { class: ['client-only-placeholder'] },
          placeholder
        )
      }

      return null
    }
  }
})

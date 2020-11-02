import { defineComponent, h } from 'vue'
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
  render() {
    const { placeholder, placeholderTag } = this.$props
    const defaultSlot = this.$slots.default
    const placeholderSlot = this.$slots.placeholder

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
})

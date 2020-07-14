
import { defineComponent, h } from 'vue'
export default defineComponent({
  props: {
    href: String
  },
  setup(props, context) {
    return () => {
      const { href, ...restProps } = props
      return h(
        href ? 'a' : 'span',
        restProps,
        context.slots.default?.()
      )
    }
  }
})

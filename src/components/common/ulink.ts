/**
 * @file Universal Link
 * @description Render Link with external/nofollow/noopener
 * @author Surmon <https://github.com/surmon-china>
 */

import { AnchorHTMLAttributes, defineComponent, h } from 'vue'

export default defineComponent({
  name: 'Ulink',
  props: {
    text: String,
    external: {
      type: Boolean,
      default: true
    },
    blank: {
      type: Boolean,
      default: true
    }
  },
  setup(props, context) {
    return () => {
      const { text, external, blank, ...linkAttrs } = props
      const customAttrs: AnchorHTMLAttributes = {}

      if (external) {
        customAttrs.rel = 'external nofollow noopener'
      }
      if (blank) {
        customAttrs.target = '_blank'
      }

      return h('a', {
        ...linkAttrs,
        ...customAttrs
      }, context.slots.default?.() || text)
    }
  }
})

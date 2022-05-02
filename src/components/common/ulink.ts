/**
 * @file Universal Link
 * @description Render Link with external/nofollow/noopener
 * @author Surmon <https://github.com/surmon-china>
 */

import { AnchorHTMLAttributes, defineComponent, h } from 'vue'
import { RouterLink, RouterLinkProps } from 'vue-router'

export default defineComponent({
  name: 'Ulink',
  props: {
    // @ts-ignore
    ...RouterLink.props,
    to: String,
    href: String,
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
      const { to, href, external, blank, ...routerLinkProps } = props
      const customAttrs: AnchorHTMLAttributes = { ...context.attrs }

      // router link
      if (to && !to.startsWith('http')) {
        const ps: RouterLinkProps = {
          to: to,
          ...routerLinkProps
        }
        return h(RouterLink, ps, context.slots.default)
      }

      // a link
      if (external) {
        customAttrs.rel = 'external nofollow noopener'
      }
      if (blank) {
        customAttrs.target = '_blank'
      }
      return h('a', { ...customAttrs, href: href || to }, context.slots.default?.())
    }
  }
})

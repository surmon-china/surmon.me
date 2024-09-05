/**
 * @file Universal link
 * @description render Link with external/nofollow/noopener
 * @author Surmon <https://github.com/surmon-china>
 */

import { AnchorHTMLAttributes, PropType, defineComponent, h } from 'vue'
import { RouterLink, RouterLinkProps } from 'vue-router'

export default defineComponent({
  name: 'Ulink',
  props: {
    to: {
      type: String,
      required: false
    },
    href: {
      type: String,
      required: false
    },
    external: {
      type: Boolean,
      default: true
    },
    blank: {
      type: Boolean,
      default: true
    },
    routerLink: {
      type: Object as PropType<RouterLinkProps>
    }
  },
  setup(props, context) {
    return () => {
      const customAttrs: AnchorHTMLAttributes = { ...context.attrs }

      // <router-link>
      if (props.to && !props.to.startsWith('http')) {
        const linkProps: RouterLinkProps = {
          to: props.to,
          ...(props.routerLink ?? {})
        }
        return h(RouterLink, linkProps, context.slots.default)
      }

      // <a>
      if (props.external) {
        customAttrs.rel = 'external nofollow noopener'
      }
      if (props.blank) {
        customAttrs.target = '_blank'
      }

      return h('a', { ...customAttrs, href: props.href }, context.slots.default?.())
    }
  }
})

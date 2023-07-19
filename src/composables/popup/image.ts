/**
 * @file popup image component
 * @module composable.popup.image
 * @author Surmon <https://github.com/surmon-china>
 */

import { h, defineComponent } from 'vue'
import { PopupUiProps, omitUiProps } from './popup'
import { usePopup } from './hook'

/**
 * @example <popup-image src="xxx" class="image" />
 */
export default defineComponent({
  props: {
    src: String,
    ...PopupUiProps
  },
  setup(props, context) {
    const popup = usePopup()

    // Image -> click -> visible modal, ignore (clone/visible)
    return () => {
      const { src, ...popupProps } = props
      if (!src) {
        return null
      }

      const imageProps = omitUiProps(props)
      const imageAttrs = {
        ...imageProps,
        ...context.attrs
      }

      return h('img', {
        ...imageAttrs,
        src,
        onClick(...args) {
          ;(imageProps as any)?.onClick?.(...args)
          popup?.vImage(src, imageAttrs, popupProps)
        }
      })
    }
  }
})

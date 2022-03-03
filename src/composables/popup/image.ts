/**
 * @file popup image component
 * @module composable.popup.image
 * @author Surmon <https://github.com/surmon-china>
 */

import { h, defineComponent } from 'vue'
import { PopupUIProps, getOtherProps } from './popup'
import { usePopup } from './hook'

/**
 * @example <popup-image src="xxx" class="image" />
 */
export default defineComponent({
  name: 'PopupImage',
  props: {
    src: String,
    ...PopupUIProps
  },
  setup(props, context) {
    const popup = usePopup()

    // Image -> click -> visible modal, ignore (clone/visible)
    return () => {
      const { src, ...popupProps } = props
      if (!src) {
        return null
      }

      const imageProps = getOtherProps(props)
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

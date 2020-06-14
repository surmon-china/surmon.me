/**
 * @file popup image component
 * @module popup/image-component
 * @author Surmon <https://github.com/surmon-china>
 * @example <popup-image src="xxx" class="image" />
*/

import { h, defineComponent, watchEffect, Teleport, Fragment } from 'vue'
import { PopupUIProps, getOtherProps } from './popup'
import { usePopup } from '.'

export default defineComponent({
  name: 'PopupImage',
  props: {
    src: String,
    ...PopupUIProps
  },
  setup({ src, ...popupProps }, context) {
    const popup = usePopup()
    const imageProps = getOtherProps(popupProps)
    const imageAttrs = {
      ...imageProps,
      ...context.attrs
    }

    // Image -> click -> visible modal, ignore (clone/visible)
    return () => {
      if (src) {
        return h('img', {
          ...imageAttrs,
          src,
          onClick(...args) {
            (imageProps as any)?.onClick?.(...args)
            popup?.vImage(src, imageAttrs, popupProps)
          }
        })
      }

      return null
    }
  }
})

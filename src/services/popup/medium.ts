import { h, defineComponent, watchEffect, Teleport, Fragment } from 'vue'
import Popup, { PopupProps, getOtherProps } from './popup'
import { usePopup } from '.'

export enum PopupType {
  Image = 'img',
  Video = 'video',
  Iframe = 'iframe'
}

/**
 * @example <popup-medium image="src" class="image" />
 * @example <popup-medium image="src" />
 * @example <popup-medium video="src" :clone="false" :visible="true" />
 * @example <popup-medium iframe="src" :clone="false" />
*/
export default defineComponent({
  name: 'PopupMedium',
  props: {
    image: String,
    video: String,
    iframe: String,
    ...PopupProps
  },
  setup({ image, video, iframe, ...popupProps }) {
    const popup = usePopup()
    const otherProps = getOtherProps(popupProps)

    return () => {
      // Image -> click -> visible modal, ignore (clone/visible)
      if (image) {
        return h(PopupType.Image, {
          ...otherProps,
          src: image,
          onClick(...args) {
            (otherProps as any)?.onClick(...args)
            popup?.vImage(image, otherProps)
          }
        })
      }

      // Other -> Render Popup component
      const source = video || iframe
      if (source) {
        return h(Popup, popupProps, [
          h(
            video ? PopupType.Video : PopupType.Iframe,
            {
              ...otherProps,
              src: source
            }
          )
        ])
      }

      return null
    }
  }
})

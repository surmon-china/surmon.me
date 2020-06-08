import { h, defineComponent } from 'vue'
import { usePopup, PopupType } from './'

/**
 * @example <popup image="src" class="image" />
 * @example <popup video="src" class="image" />
 * @example <popup iframe="src" class="image" />
*/
export default defineComponent({
  name: 'Popup',
  props: {
    iframe: String,
    image: String,
    video: String,
    stiff: Boolean
  },
  setup(props) {
    const popup = usePopup()
    const { iframe, image, video, stiff, ...others } = props
    const targets = {
      [PopupType.Image]: image,
      [PopupType.Video]: video,
      [PopupType.Iframe]: iframe,
    }
    const targetType = Object.keys(targets).find(key => targets[key])

    return () => {
      if (!targetType) {
        return null
      }

      const src = targets[targetType]
      return h(targetType, {
        ...others,
        src,
        onClick(...args) {
          (others as any)?.onClick(...args)
          if (!stiff && popup) {
            popup.visible({
              type: targetType as PopupType,
              props: others,
              src
            })
          }
        }
      })
    }
  }
})

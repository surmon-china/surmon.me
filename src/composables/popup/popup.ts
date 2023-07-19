/**
 * @file popup component
 * @module composable.popup.component
 * @author Surmon <https://github.com/surmon-china>
 */

import { h, defineComponent, watch, Teleport, Fragment, PropType, ExtractPropTypes, onBeforeMount } from 'vue'
import { usePopup } from './hook'

export type PopupUiPropsType = Partial<ExtractPropTypes<typeof PopupUiProps>>
export const PopupUiProps = {
  border: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  maskClose: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  scrollClose: {
    type: Boolean as PropType<boolean>,
    default: true
  }
}

export const omitUiProps = <P extends PopupUiPropsType>(
  p: P
): Pick<P, Exclude<keyof P, keyof PopupUiPropsType>> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { border, maskClose, scrollClose, ...rest } = p
  return rest
}

enum PopupEvent {
  Close = 'close',
  UpdateVisible = 'update:visible'
}

/**
 * @example
 *  <popup :visible="false" :clone="true">
 *    <div class="xxx">I will visible on original & modal</div>
 *  </popup>
 */
export default defineComponent({
  props: {
    // component options
    visible: {
      type: Boolean,
      default: false
    },
    clone: {
      type: Boolean,
      default: false
    },
    // ui options
    ...PopupUiProps
  },
  emits: [PopupEvent.Close, PopupEvent.UpdateVisible],
  setup(props, context) {
    const popup = usePopup()

    onBeforeMount(() => {
      watch(
        () => props.visible,
        (visible) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { clone: _, visible: __, ...popupOptions } = props
          visible ? popup.visible(popupOptions) : popup.hidden()
        }
      )
    })

    onBeforeMount(() => {
      watch(
        () => popup.state.visible,
        (visible) => {
          if (!visible && props.visible) {
            context.emit(PopupEvent.UpdateVisible, false)
            context.emit(PopupEvent.Close)
          }
        }
      )
    })

    return () => {
      const renderSlotNode = () => context.slots.default?.()
      const renderTeleportNode = () =>
        h(
          // @ts-ignore
          Teleport,
          { to: popup.state.$container },
          renderSlotNode()
        )

      // modal mode -> visible ? modal-render : null
      const renderModalNode = () => (props.visible ? renderTeleportNode() : null)

      // clone mode -> render & visible -> modal render
      if (props.clone) {
        return h(Fragment, [renderSlotNode(), renderModalNode()])
      }

      // modal mode
      return renderModalNode()
    }
  }
})

/**
 * @file popup component
 * @module composable.popup.component
 * @author Surmon <https://github.com/surmon-china>
 */

import { h, defineComponent, watch, Teleport, Fragment, PropType, ExtractPropTypes } from 'vue'
import { usePopup } from './hook'

export const PopupUIProps = {
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

export const getOtherProps = ({
  border,
  maskClose,
  scrollClose,
  ...others
}: ExtractPropTypes<typeof PopupUIProps>) => others

enum Event {
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
  name: 'Popup',
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
    // UI options
    ...PopupUIProps
  },
  emits: [Event.Close, Event.UpdateVisible],
  setup(props, context) {
    const popup = usePopup()

    watch(
      () => props.visible,
      (visible) => {
        const { clone, visible: v, ...popupOptions } = props
        visible ? popup.visible(popupOptions) : popup.hidden()
      }
    )

    watch(
      () => popup.state.visible,
      (visible) => {
        if (!visible && props.visible) {
          context.emit(Event.UpdateVisible, false)
          context.emit(Event.Close)
        }
      }
    )

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

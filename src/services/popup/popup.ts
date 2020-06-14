/**
 * @file popup component
 * @module popup component
 * @author Surmon <https://github.com/surmon-china>
 * @example (
 *  <popup :visible="false" :clone="true">
 *    <div class="xxx">I will visible on original & modal</div>
 *  </popup>
 * )
*/

import { h, defineComponent, watch, Teleport, Fragment, PropType, ExtractPropTypes } from 'vue'
import { usePopup } from './'

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
  },
  closeButton: {
    type: Boolean as PropType<boolean>,
    default: true
  }
}

export const getOtherProps = (
  { border, maskClose, scrollClose, closeButton, ...others }
  : ExtractPropTypes<typeof PopupUIProps>
) => others

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
  setup(props, context) {
    const popup = usePopup()
    const { clone, visible, ...others } = props

    watch(
      () => props.visible,
      visible => visible
        ? popup.visible(others)
        : popup.hidden()
    )

    watch(
      () => popup.state.visibility,
      visibility => {
        if (!visibility) {
          context.emit('update:visible', false)
          context.emit('close')
        }
      }
    )

    return () => {
      const renderSlotNode = () => context.slots.default?.()
      const renderTeleportNode = () => h(
        // @ts-ignore
        Teleport,
        { to: popup.state.$container },
        renderSlotNode()
      )

      // modal mode -> visible ? modal-render : null
      const renderModalNode = () => props.visible
        ? renderTeleportNode()
        : null

      // clone mode -> render & visible -> modal render
      if (props.clone) {
        return h(Fragment, [
          renderSlotNode(),
          renderModalNode()
        ])
      }

      // modal mode
      return renderModalNode()
    }
  }
})

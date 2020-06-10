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

import { h, defineComponent, watchEffect, Teleport, Fragment, PropType, ExtractPropTypes } from 'vue'
import { usePopup } from './'

export const PopupProps = {
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
    default: false
  }
}

export const getOtherProps = (
  { visible, clone, border, maskClose, scrollClose, closeButton, ...others }
  : ExtractPropTypes<typeof PopupProps>
) => others

export default defineComponent({
  name: 'Popup',
  props: PopupProps,
  setup(props, context) {
    const popup = usePopup()
    const { clone, visible, ...others } = props

    watchEffect(() => {
      props.visible
        ? popup.visible(others)
        : popup.hidden()
    }, { flush: 'sync' })

    // TODO:  onClose emit

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

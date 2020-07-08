/* eslint-disable vue/one-component-per-file */
import { defineComponent, h } from 'vue'
import { useGlobalState } from '/@/state'

/**
 * @example <responsive desktop><component /></responsive>
 * @example <responsive mobile><component /></responsive>
 * @example <responsive both><component /></responsive>
 * @example (
 *  <responsive>
 *    <template #desktop>Desktop</template>
 *    <template #mobile>Mobile</template>
 *  </responsive>
 * )
*/
export const Responsive = defineComponent({
  name: 'Responsive',
  props: {
    both: Boolean,
    desktop: Boolean,
    mobile: Boolean
  },
  setup(props, context) {
    const globalState = useGlobalState()

    return () => {
      // render
      if (props.both) {
        return context.slots.default?.()
      }
      // desktop
      if (props.desktop && !globalState.userAgent.isMobile) {
        return context.slots.default?.()
      }
      // mobile
      if (props.mobile && globalState.userAgent.isMobile) {
        return context.slots.default?.()
      }

      // slot mode
      return globalState.userAgent.isMobile
        ? context.slots.mobile?.()
        : context.slots.desktop?.()
    }
  }
})

export const DesktopOnly = defineComponent({
  name: 'DesktopOnly',
  setup(_, context) {
    return () => {
      return h(Responsive, { desktop: true }, context.slots)
    }
  }
})

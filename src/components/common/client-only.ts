/**
 * @file client only
 * @description only render on client (browser)
 * @description Fork from: https://github.com/egoist/vue-client-only/blob/master/src/index.js
 * @description Fork from: https://github.com/kadirahq/react-no-ssr/blob/master/src/index.js
 * @author Surmon <https://github.com/surmon-china>
 */

import { defineComponent, ref, h, onMounted, Transition } from 'vue'

/**
 * @description only render on client (browser)
 * @example
 * <client-only placeholder="loading...">
 *    <component />
 * </client-only>
 */
export const ClientOnly = defineComponent({
  name: 'ClientOnly',
  props: {
    placeholder: String,
    placeholderTag: {
      type: String,
      default: 'div'
    },
    transition: {
      type: Boolean,
      default: true
    }
  },
  setup(props, context) {
    // eslint-disable-next-line vue/no-setup-props-destructure
    const { placeholder, placeholderTag, transition } = props
    const defaultSlot = context.slots.default
    const placeholderSlot = context.slots.placeholder
    const canRender = ref(false)

    onMounted(() => {
      canRender.value = true
    })

    return () => {

      const renderResult = result => {
        console.log('-----result', result)
        if (!transition) {
          return result
        }
        // if (Array.isArray(result) && result.length > 1) {
        //   return result
        // }
        return h(
          Transition,
          { name: 'slide-fade', mode: 'out-in' },
          h(
            'div',
            { class: 'client-only' },
            () => result
          )
        )
      }

      if (canRender.value) {
        const result = renderResult(defaultSlot?.())
        console.log(111, result)
        return result
      }

        console.log(222)
        if (placeholderSlot) {
        return renderResult(placeholderSlot())
      }

      if (placeholderTag && placeholder) {
        return renderResult(h(
          placeholderTag,
          { class: ['client-only-placeholder'] },
          placeholder
        ))
      }

      return renderResult(null)
    }
  }
})

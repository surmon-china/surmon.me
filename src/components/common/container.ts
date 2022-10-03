/**
 * @file page container
 * @author Surmon <https://github.com/surmon-china>
 */

import { defineComponent, h } from 'vue'

export default defineComponent({
  name: 'Container',
  props: {
    tag: {
      type: String,
      default: 'div'
    }
  },
  setup(props, context) {
    return () => {
      return h(props.tag, [h('div', { class: 'container' }, [context.slots.default?.()])])
    }
  }
})

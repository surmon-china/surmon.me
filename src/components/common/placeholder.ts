import _isUndefined from 'lodash-es/isUndefined'
import { defineComponent, h, Transition } from 'vue'
import type { PropType, BaseTransitionProps } from 'vue'

export enum Events {
  AfterEnter = 'after-enter'
}

export default defineComponent({
  name: 'Placeholder',
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    hasData: {
      type: Boolean as PropType<boolean | undefined>,
      default: undefined
    },
    transitionName: {
      type: String,
      default: 'module'
    },
    transitionMode: {
      type: String as PropType<BaseTransitionProps['mode']>,
      default: 'out-in'
    }
  },
  emits: [Events.AfterEnter],
  setup(props, { slots, emit }) {
    return () => {
      const { loading, hasData, transitionName, transitionMode } = props

      let currentKey: string
      let currentSlot: any

      if (loading) {
        currentKey = 'loading'
        currentSlot = slots.loading?.()
      } else if (hasData === true || _isUndefined(hasData)) {
        currentKey = 'default'
        currentSlot = slots.default?.()
      } else {
        currentKey = 'placeholder'
        currentSlot = slots.placeholder?.()
      }

      return h(
        Transition,
        {
          name: transitionName,
          mode: transitionMode,
          onAfterEnter(...args) {
            emit(Events.AfterEnter, ...args)
          }
        },
        () => h('div', { key: currentKey, class: 'placeholder-wrapper' }, currentSlot)
      )
    }
  }
})

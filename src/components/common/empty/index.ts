
import { defineComponent, h, PropType } from 'vue'
import { useI18n } from '/@/services/i18n'
import { LANGUAGE_KEYS } from '/@/language/key'
// @ts-ignore
import * as style from './style.module.scss'

export default defineComponent({
  name: 'Empty',
  props: {
    placeholder: String,
    i18nKey: String as PropType<LANGUAGE_KEYS>
  },
  setup(props, context) {
    const i18n = useI18n()

    return () => {
      const { placeholder, i18nKey, ...resetProps } = props
      const childrenView = (
        context.slots.default?.() ||
        placeholder || 
        i18n.t(i18nKey || LANGUAGE_KEYS.EMPTY_PLACEHOLDER)
      )

      return h('div', {
        ...resetProps,
        class: [style.empty, (resetProps as any).class]
      }, childrenView)
    }
  }
})

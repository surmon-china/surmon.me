import { computed, h, defineComponent, PropType } from 'vue'
import { useEnhancer } from '/@/app/enhancer'
import { LocalesKey } from '/@/locales'
import Uimage from '/@/components/common/uimage'

export const AI_LOGO_WHITE = '/images/ai-agent/cybermonk-white.png'
export const AI_LOGO_BLACK = '/images/ai-agent/cybermonk-black.png'

export const AiLogoImage = defineComponent({
  name: 'AiLogoImage',
  props: { variant: String as PropType<'white' | 'black' | 'auto'> },
  setup(props) {
    const { i18n, theme } = useEnhancer()
    const logoPath = computed(() => {
      return props.variant === 'white'
        ? AI_LOGO_WHITE
        : props.variant === 'black'
          ? AI_LOGO_BLACK
          : theme.isDark.value
            ? AI_LOGO_WHITE
            : AI_LOGO_BLACK
    })

    return () => {
      return h(Uimage, {
        alt: i18n.t(LocalesKey.AI_ASSISTANT_NAME),
        src: logoPath.value,
        cdn: true
      })
    }
  }
})

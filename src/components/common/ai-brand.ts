import { computed, h, defineComponent, PropType } from 'vue'
import { useEnhancer } from '/@/app/enhancer'
import Uimage from '/@/components/common/uimage'

export const AI_ASSISTANT_NAME_ZH = '赛博灵澈'
export const AI_ASSISTANT_NAME_EN = 'CyberMonk'

export const useAiAssistantName = () => {
  const { isZhLang } = useEnhancer()
  return computed(() => (isZhLang.value ? AI_ASSISTANT_NAME_ZH : AI_ASSISTANT_NAME_EN))
}

export const AI_LOGO_WHITE = '/images/ai-agent/cybermonk-white.png'
export const AI_LOGO_BLACK = '/images/ai-agent/cybermonk-black.png'

export const AiLogoImage = defineComponent({
  name: 'AiLogoImage',
  props: { variant: String as PropType<'white' | 'black' | 'auto'> },
  setup(props) {
    const { theme } = useEnhancer()
    const aiAssistantName = useAiAssistantName()
    const aiLogoPath = computed(() => {
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
        alt: aiAssistantName.value,
        src: aiLogoPath.value,
        cdn: true
      })
    }
  }
})

import { defineComponent, h, ExtractPropTypes } from 'vue'

export const IndicatorProps = {
  width: {
    type: String,
    default: '1.6rem'
  },
  height: {
    type: String,
    default: '1rem'
  },
  gap: {
    type: String,
    default: '1rem'
  },
  radius: {
    type: String,
    default: '1px'
  }
}

export const IndicatorComponent = defineComponent({
  name: 'Indicator',
  props: IndicatorProps,
  setup(props) {
    return () => {
      const style = {
        '--indicator-width': props.width,
        '--indicator-height': props.height,
        '--indicator-gap': props.gap,
        '--indicator-radius': props.radius
      }

      return h(
        'div',
        { class: 'global-indicator', style },
        Array.from({ length: 4 }).map(() => h('div'))
      )
    }
  }
})

export interface IndicatorOptions extends Partial<ExtractPropTypes<typeof IndicatorProps>> {
  class?: string
}

export const getIndicatorHTML = (options: IndicatorOptions = {}) => {
  const classNames = ['global-indicator', options.class].filter(Boolean).join(' ')
  const styles = {
    '--indicator-width': options.width || IndicatorProps.width.default,
    '--indicator-height': options.height || IndicatorProps.height.default,
    '--indicator-gap': options.gap || IndicatorProps.gap.default,
    '--indicator-radius': options.radius || IndicatorProps.radius.default
  }

  return `
    <div class="${classNames}" style="${Object.entries(styles)
      .map(([k, v]) => `${k}: ${v}`)
      .join(';')}">
    ${Array.from({ length: 4 })
      .map(() => '<div></div>')
      .join('')}
    </div>
  `
}

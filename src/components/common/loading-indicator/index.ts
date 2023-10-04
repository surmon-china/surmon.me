import { defineComponent, h, ExtractPropTypes } from 'vue'

export const LoadingIndicatorProps = {
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

export const LoadingIndicator = defineComponent({
  name: 'LoadingIndicator',
  props: LoadingIndicatorProps,
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
        { class: 'global-loading-indicator', style },
        Array.from({ length: 4 }).map(() => h('div'))
      )
    }
  }
})

export interface LoadingIndicatorOptions extends Partial<ExtractPropTypes<typeof LoadingIndicatorProps>> {
  class?: string
}

export const getLoadingIndicatorHTML = (options: LoadingIndicatorOptions = {}) => {
  const classNames = ['global-loading-indicator', options.class].filter(Boolean).join(' ')
  const styles = {
    '--indicator-width': options.width || LoadingIndicatorProps.width.default,
    '--indicator-height': options.height || LoadingIndicatorProps.height.default,
    '--indicator-gap': options.gap || LoadingIndicatorProps.gap.default,
    '--indicator-radius': options.radius || LoadingIndicatorProps.radius.default
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

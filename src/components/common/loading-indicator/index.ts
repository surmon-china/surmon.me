import { defineComponent, h, PropType, ExtractPropTypes } from 'vue'

const divChildCount = 4
const rootClassName = 'global-loading-indicator'

type GapType = (typeof GapTypes)[number]
const GapTypes = ['default', 'lg', 'sm', 'xs', 'tiny'] as const
const getGapClassName = (key: GapType) => `gap-${key}`

type RadiusType = (typeof RadiusTypes)[number]
const RadiusTypes = ['tiny', 'xs', 'sm', 'md'] as const
const getRadiusClassName = (key: RadiusType) => `radius-${key}`

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
    type: String as PropType<GapType>,
    default: 'default' as GapType
  },
  radius: {
    type: String as PropType<RadiusType>,
    default: 'tiny' as RadiusType
  }
}

export const LoadingIndicator = defineComponent({
  name: 'LoadingIndicator',
  props: LoadingIndicatorProps,
  setup(props) {
    return () => {
      const style = {
        '--indicator-width': props.width,
        '--indicator-height': props.height
      }

      return h(
        'div',
        { class: [rootClassName, getGapClassName(props.gap), getRadiusClassName(props.radius)], style },
        Array.from({ length: divChildCount }).map(() => h('div'))
      )
    }
  }
})

export interface LoadingIndicatorOptions extends Partial<ExtractPropTypes<typeof LoadingIndicatorProps>> {
  class?: string
}

export const getLoadingIndicatorHTML = (options: LoadingIndicatorOptions = {}) => {
  const classNames = [
    options.class,
    rootClassName,
    getGapClassName(options.gap ?? LoadingIndicatorProps.gap.default),
    getRadiusClassName(options.radius ?? LoadingIndicatorProps.radius.default)
  ]

  const styles = {
    '--indicator-width': options.width || LoadingIndicatorProps.width.default,
    '--indicator-height': options.height || LoadingIndicatorProps.height.default
  }

  return `
    <div class="${classNames.filter(Boolean).join(' ')}" style="${Object.entries(styles)
      .map(([k, v]) => `${k}: ${v}`)
      .join(';')}">
    ${Array.from({ length: divChildCount })
      .map(() => '<div></div>')
      .join('')}
    </div>
  `
}

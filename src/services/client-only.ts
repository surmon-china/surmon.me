import { App, defineComponent, h } from 'vue'
import { VueEnv } from '/@/vuniversal/env'

export const createClientOnlyComponent = (target: VueEnv) => {
  return defineComponent({
    name: 'ClientOnly',
    functional: true,
    props: {
      placeholder: String,
      placeholderTag: {
        type: String,
        default: 'div'
      }
    },
    render() {
      const { placeholder, placeholderTag } = this.$props
      const defaultSlot = this.$slots.default
      const placeholderSlot = this.$slots.placeholder
      const isClient = target === VueEnv.Client

      if (isClient) {
        return defaultSlot?.()
      }
  
      if (placeholderSlot) {
        return placeholderSlot()
      }
  
      if (placeholderTag && placeholder) {
        return h(
          placeholderTag,
          { class: ['client-only-placeholder'] },
          placeholder
        )
      }

      return null
    }
  })
}

export const createClientOnly = (target: VueEnv) => ({
  install(app: App) {
    const ClientOnlyComponent = createClientOnlyComponent(target)
    app.component(ClientOnlyComponent.name, ClientOnlyComponent)
  }
})

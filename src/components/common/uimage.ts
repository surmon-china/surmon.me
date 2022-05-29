/**
 * @file Universal image
 * @description render image with CDN/Proxy/Defer
 * @author Surmon <https://github.com/surmon-china>
 */

import { defineComponent, ref, h, PropType } from 'vue'
import { useEnhancer } from '/@/app/enhancer'
import { ProxyModule } from '/@/constants/proxy'
import { getTargetCDNURL, getTargetProxyURL } from '/@/transforms/url'
import { onClient } from '/@/universal'

export default defineComponent({
  name: 'Uimage',
  props: {
    src: {
      type: String,
      required: true
    },
    cdn: {
      type: Boolean,
      default: false
    },
    proxy: {
      type: [Boolean, String] as PropType<ProxyModule | boolean>,
      default: false
    },
    defer: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const { defer } = useEnhancer()
    const deferRenderable = ref(false)
    if (props.defer) {
      onClient(() => {
        defer.addTask(() => {
          deferRenderable.value = true
        })
      })
    }

    return () => {
      const { src, cdn, proxy, defer, ...restProps } = props

      let imageSrc = src
      if (cdn) {
        imageSrc = getTargetCDNURL(src)
      }
      if (proxy) {
        imageSrc = getTargetProxyURL(src, proxy === true ? ProxyModule.Default : proxy)
      }
      if (defer && !deferRenderable.value) {
        return null
      }

      return h('img', {
        draggable: false,
        ...restProps,
        src: imageSrc
      })
    }
  }
})

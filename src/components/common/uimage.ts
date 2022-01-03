/**
 * @file Universal image
 * @description Render image with CDN/Proxy/Defer
 * @author Surmon <https://github.com/surmon-china>
 */

import { defineComponent, ref, h } from 'vue'
import { useEnhancer } from '/@/app/enhancer'
import { getTargetCDNURL, getTargetProxyURL } from '/@/transforms/url'
import { onClient } from '/@/universal'

export default defineComponent({
  name: 'Uimage',
  props: {
    src: {
      type: String,
      required: true
    },
    cdn: Boolean,
    proxy: Boolean,
    defer: Boolean
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
        imageSrc = getTargetProxyURL(src)
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

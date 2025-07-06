/**
 * @file Universal image
 * @description render image with CDN/Proxy/Defer
 * @author Surmon <https://github.com/surmon-china>
 */

import { defineComponent, ref, h } from 'vue'
import { useEnhancer } from '/@/app/enhancer'
import { getAssetURL, getProxyURL } from '/@/transforms/url'
import { isClient } from '/@/configs/app.env'

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
      type: Boolean,
      default: false
    },
    defer: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const { defer, cdnDomain } = useEnhancer()
    const deferRenderable = ref(false)
    if (props.defer) {
      if (isClient) {
        defer.addTask(() => {
          deferRenderable.value = true
        })
      }
    }

    return () => {
      const { src, cdn, proxy, defer, ...restProps } = props

      let imageSrc = src
      if (cdn) {
        imageSrc = getAssetURL(cdnDomain, src)
      }
      if (proxy) {
        imageSrc = getProxyURL(cdnDomain, src)
      }
      if (defer && !deferRenderable.value) {
        // render a placeholder image (1x1 pixel transparent PNG)
        imageSrc =
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII='
      }

      return h('img', {
        draggable: false,
        ...restProps,
        src: imageSrc
      })
    }
  }
})

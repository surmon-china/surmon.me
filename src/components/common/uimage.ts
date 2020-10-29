import { defineComponent, ref, h } from 'vue'
import { isClient } from '/@/enverionment'
import { useDefer } from '/@/services/defer'
import { getFileCDNUrl, getFileProxyUrl } from '/@/transforms/url'

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
    const defer = useDefer()
    const loadImage = ref(false)
    if (props.defer && isClient) {
      defer.addTask(() => {
        loadImage.value = true
      })
    }
    return { loadImage }
  },
  render() {
    const { src, cdn, proxy, defer, ...props } = this.$props

    let imageSrc = src
    if (cdn) {
      imageSrc = getFileCDNUrl(src)
    }
    if (proxy) {
      imageSrc = getFileProxyUrl(src)
    }

    if (defer && !this.loadImage) {
      return null
    }

    return h('img', {
      draggable: false,
      ...props,
      src: imageSrc
    })
  }
})

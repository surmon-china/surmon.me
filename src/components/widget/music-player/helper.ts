import { ProxyModule } from '/@/constants/proxy'
import { getProxyURL } from '/@/transforms/url'

export const getCoverArtURL = (url?: string) => {
  return !url ? url : getProxyURL(`${url}?param=300y300`, ProxyModule.NetEaseMusic)
}

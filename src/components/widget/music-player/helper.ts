import { getProxyURL } from '/@/transforms/url'

export const getCoverArtURL = (url?: string) => {
  return url ? getProxyURL(`${url}?param=300y300`) : url
}

import { useCdnDomain } from '/@/app/context'
import { getProxyURL } from '/@/transforms/url'

export const useCoverArtURL = (url?: string) => {
  return url ? getProxyURL(useCdnDomain(), `${url}?param=300y300`) : url
}

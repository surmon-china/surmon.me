import { useCdnDomain } from '/@/app/context'
import { getCdnProxyURL } from '/@/transforms/url'

export const useCoverArtURL = (url?: string) => {
  return url ? getCdnProxyURL(useCdnDomain(), `${url}?param=300y300`) : url
}

/**
 * @file Script loader
 * @module util/script-loader
 * @author Surmon <https://github.com/surmon-china>
 */

export interface ILoaderOption extends Partial<HTMLScriptElement> {
  domain?: string
}

export default (source: string, options: ILoaderOption = {} as ILoaderOption) => {
  return new Promise((resolve, reject) => {
    const head = document.head || document.getElementsByTagName('head')[0]
    const script = document.createElement('script')
    const {
      src,
      domain,
      type = 'text/javascript',
      charset = 'utf-8',
      defer = false,
      async = false,
      ...restAttrs
    } = options
    script.type = type
    script.defer = defer
    script.async = async
    ;script.src = src || source
    script.charset = charset

    Object.keys(restAttrs).forEach(key => {
      script[key] = restAttrs[key]
    })

    if (domain) {
      const link = document.createElement('link')
      link.href = domain
      link.rel = 'preconnect'
      head.appendChild(link)
    }

    head.appendChild(script)
    script.onload = resolve
    script.onerror = reject
  })
}

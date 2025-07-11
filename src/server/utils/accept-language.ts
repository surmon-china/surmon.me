export interface ParseAcceptLanguageOptions {
  ignoreWildcard?: boolean
}

export const parseAcceptLanguage = (
  header: string | null | undefined,
  options: ParseAcceptLanguageOptions = {}
): string[] => {
  if (!header) return []

  return header
    .split(',')
    .map((part): [number, string] => {
      const [locale, q = 'q=1'] = part.trim().split(';')
      const qValue = parseFloat(q.trim().replace(/^q *= */, ''))
      return [isNaN(qValue) ? 1 : qValue, locale.trim()]
    })
    .sort((a, b) => b[0] - a[0])
    .flatMap(([_, locale]) => {
      if (locale === '*' && options.ignoreWildcard) return []
      return locale ? [locale] : []
    })
}

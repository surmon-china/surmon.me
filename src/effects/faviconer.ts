/**
 * @file Favicon dancer
 * @module effect/faviconer
 * @author Surmon <https://github.com/surmon-china>
 */

import { emojiToDataURL } from '/@/transforms/emoji'

let originalFaviconUrl: string | null = null

const getFaviconNode = () => document.querySelector<HTMLLinkElement>('link[rel="icon"]')

const _updateFavicon = (url: string) => {
  const node = getFaviconNode()
  node ? node.setAttribute('href', url) : console.warn('Favicon element not found')
}

export const setFavicon = (emoji: string) => {
  originalFaviconUrl ??= getFaviconNode()?.href || ''
  _updateFavicon(emojiToDataURL(emoji))
}

export const recoverFavicon = () => {
  if (originalFaviconUrl !== null) {
    _updateFavicon(originalFaviconUrl)
  }
}

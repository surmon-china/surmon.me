import { type Renderer, type RendererApi } from 'marked'
import { type CreateRendererOptions } from '../renderer'
import { CUSTOM_ELEMENT_LIST } from '/@/effects/elements'
import { escape } from '/@/transforms/text'

// sanitize-html:
// https://github.com/vitejs/vite/issues/9200
// https://github.com/vitejs/vite/issues/9238
// https://github.com/wolfiex/GeoDraw-SvelteKit/issues/2
// https://github.com/apostrophecms/sanitize-html/issues/560
// https://github.com/Greenheart/idg.tools/commit/15de4725dc8fdafe2fc86c24b5c32f3646f4cb29
// MARK: Use dompurify instead of sanitize-html because sanitize-html doesn't work in browser.
// https://github.com/apostrophecms/sanitize-html#browser

// DOMPurify:
// https://github.com/cure53/DOMPurify#running-dompurify-on-the-server
// https://github.com/kkomelin/isomorphic-dompurify/blob/master/src/index.js
// https://github.com/meteor/meteor/issues/10538#issuecomment-489252418
// https://zhuanlan.zhihu.com/p/52990313
// https://github.com/Automattic/node-canvas
// WORKAROUND: `yarn add canvas`
// OSX: `brew install pkg-config cairo pango libpng jpeg giflib librsvg pixman`
// Ubuntu: `sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev`

// MARK: escape vs sanitize https://zhuanlan.zhihu.com/p/421281945
// sanitize and escape are overlapping, for normal users, no html is allowed, so sanitize is not required.
// if sanitize is required, you will encounter many problems.
export const sanitizeHTML = (content: string) => content

export const trimHTML = (html: string) => html.replace(/\s+/g, ' ').replace(/\n/g, ' ')

export const createHtmlRenderer = (
  renderer: Renderer,
  options?: CreateRendererOptions
): RendererApi['html'] => {
  return function ({ text }) {
    const trimmed = text.trim()
    const transformed = CUSTOM_ELEMENT_LIST.reduce((result, ce) => ce.transform(result), trimmed)
    // https://github.com/apostrophecms/sanitize-html#default-options
    return options?.sanitize ? sanitizeHTML(escape(transformed)) : transformed
  }
}

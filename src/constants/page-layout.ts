/**
 * @file App page layout
 * @module constant/page-layout
 * @author Surmon <https://github.com/surmon-china>
 */

import { isNil } from './value'

export enum PageLayout {
  Normal = 0,
  Wide = 1, // 3 column
  Full = 2 // full page
}

export const PAGE_LAYOUTS = Object.freeze([PageLayout.Normal, PageLayout.Wide, PageLayout.Full])

export const resolvePageLayout = (input: PageLayout | undefined | void): PageLayout => {
  if (isNil(input)) {
    return PageLayout.Normal
  } else {
    return PAGE_LAYOUTS.includes(input) ? input : PageLayout.Normal
  }
}

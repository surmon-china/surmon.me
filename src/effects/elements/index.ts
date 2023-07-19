import { verseConfig } from './verse'

export enum CustomElementId {
  Verse = 'verse'
}

export interface CustomElementConfig {
  /** transform custom elements (original) html string to target html string */
  transform: (html: string) => string
  /** specify style for target html element */
  style?: (element: HTMLElement) => string | null
  /** run side effects for target html element */
  effect?: (element: HTMLElement) => void
}

export const CUSTOM_ELEMENTS: Record<CustomElementId, CustomElementConfig> = {
  [CustomElementId.Verse]: verseConfig
}

export const CUSTOM_ELEMENT_LIST = Object.values(CUSTOM_ELEMENTS)

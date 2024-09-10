import { ObjectDirective } from 'vue'

export const DIRECTIVE_NAME = 'disabled-wallflower'
export const ATTRIBUTE_NAME = 'data-disabled-wallflower'

export const vDisabledWallflower: ObjectDirective<HTMLElement> = {
  mounted(element) {
    element.setAttribute(ATTRIBUTE_NAME, 'true')
  },
  beforeUnmount(element) {
    element.removeAttribute(ATTRIBUTE_NAME)
  }
}

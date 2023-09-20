import { ObjectDirective } from 'vue'

export const DIRECTIVE_NAME = 'disabled-wallflower'
export const ATTRBUTE_NAME = 'data-disabled-wallflower'

export const vDisabledWallflower: ObjectDirective<HTMLElement> = {
  mounted(element) {
    element.setAttribute(ATTRBUTE_NAME, 'true')
  },
  beforeUnmount(element) {
    element.removeAttribute(ATTRBUTE_NAME)
  }
}

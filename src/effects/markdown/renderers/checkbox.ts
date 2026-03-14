import { type Renderer, type RendererApi } from 'marked'
import { type CreateRendererOptions } from '../renderer'

export const createCheckboxRenderer = (
  render: Renderer,
  options?: CreateRendererOptions
): RendererApi['checkbox'] => {
  return function ({ checked }) {
    return checked
      ? `<i class="checkbox iconfont icon-checkbox-selected"></i>`
      : `<i class="checkbox iconfont icon-checkbox-unselected"></i>`
  }
}

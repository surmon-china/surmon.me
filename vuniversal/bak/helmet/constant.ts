import {
  ComputedRef,
  UnwrapRef,
  HTMLAttributes,
  HtmlHTMLAttributes,
  BaseHTMLAttributes,
  MetaHTMLAttributes,
  LinkHTMLAttributes,
  StyleHTMLAttributes,
  ScriptHTMLAttributes,
} from 'vue'

interface Base {
  [key: string]: any
}

interface HelmeHTMLAttributes extends HtmlHTMLAttributes, Base {
  xmlns?: string
  lang?: string
}

export type HelmetComputedData = UnwrapRef<HelmetData>
export type HelmetState = Partial<HelmetData>
export interface HelmetData {
  title: string | ComputedRef<string>
  base: BaseHTMLAttributes & Base
  htmlAttributes: HelmeHTMLAttributes
  bodyAttributes: HTMLAttributes & Base
  meta: Array<MetaHTMLAttributes & Base>
  link: Array<LinkHTMLAttributes & Base>
  style: Array<StyleHTMLAttributes & Base>
  script: Array<ScriptHTMLAttributes & Base>
  noscript: string
}
export const DEFAULT_STATE: HelmetData = {
  title: '',
  base: {},
  htmlAttributes: {},
  bodyAttributes: {},
  meta: [],
  link: [],
  style: [],
  script: [],
  noscript: ''
}

export const HELMET_KEY = Symbol('helmet')

export interface HelmetConfig {
  autoRefresh?: boolean
  attribute?: string
  ssrAttribute?: string
}
export const DEFAULT_CONFIG: HelmetConfig = {
  autoRefresh: true,
  attribute: 'data-vun',
  ssrAttribute: 'data-vun-server-rendered',
}

import { VNode } from "vue"

export interface IFormItemConfig {
  prop: string
  label: string
  default?: any
  isRender?: boolean | Function
  required?: boolean
  rules?: IFormItemRule[]
  description?: string | VNode
  slot?: string
  'x-component'?: XComponentType
  attrs?: dynamicType<any>
  listeners?: dynamicType<Function>
  source?: IFormItemSource
}

export interface dynamicType<T> {
  [propName: string]: T
}

export interface IFormItemRule {
  required?: boolean
  max?: number
  min?: number
  type?: string
  message?: string
  trigger?: 'blur' | 'change'
  validator?: Function
}

export type XComponentType = "input" | "number" | "select" | "radio" | "checkbox" | "switch" |
  "slider" | "timePicker" | "datePicker"

export type XComponentPlugins = {
  [P in XComponentType]: any
}

export type XComponentConfig = {
  [P in XComponentType]: XComponentItemConfig
}

export type XComponentItemConfig = {
  defaultValue: any
  attrs: dynamicType<any>
}

export interface IFormItemSource {
  labelKey: string,
  valueKey: string,
  data: any[] | Function
}
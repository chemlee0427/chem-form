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
  'x-component'?: string
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
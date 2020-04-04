import { IFormConfig } from "@/typings/form"
import { XComponentConfig } from "@/typings/formItem"

// NOTE: 默认form的配置
export const defaultFormConfig: IFormConfig = {
  layout: {
    type: "inline",
    gutter: 24,
  },
  attrs: {
    inline: true,
    size: "small"
  },
  onlyRead: false,
  items: []
}
// NOTE: 默认每个自带组件的配置
export const defaultComponentConfig: XComponentConfig = {
  "input": {
    defaultValue: "",
    attrs: {
      clearable: true
    }
  },
  "number": {
    defaultValue: undefined,
    attrs: {
      "controls-position": "right"
    }
  },
  "select": {
    defaultValue: "",
    attrs: {
      clearable: true
    }
  },
  "radio": {
    defaultValue: "",
    attrs: {}
  },
  "checkbox": {
    defaultValue: [],
    attrs: {}
  }
}
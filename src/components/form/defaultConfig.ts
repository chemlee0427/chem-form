import { IFormConfig } from "@/typings/form"
import { IFormItemConfig } from "@/typings/formItem"

export const defaultFormConfig: IFormConfig = {
  layout: {
    type: "inline",
    gutter: 24,
  },
  onlyRead: false,
  attrs: {
    inline: true,
    size: "small"
  },
  items: []
}

export const defaultFormItemConfig: IFormItemConfig = {
  prop: "",
  label: "",
  visible: true,
  required: false,
  "x-component": "input"
}

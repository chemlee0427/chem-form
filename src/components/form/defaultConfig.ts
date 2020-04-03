import { IFormConfig } from "@/typings/form"

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
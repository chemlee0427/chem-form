import { XComponentPlugins } from "@/typings/formItem"
import Radio from "@/components/Radio.vue"
import Checkbox from "@/components/Checkbox.vue"
import Select from "@/components/Select.vue"
import { Input, InputNumber } from "element-ui"

const defaultPlugins: XComponentPlugins = {
  "input": Input,
  "number": InputNumber,
  "select": Select,
  "radio": Radio,
  "checkbox": Checkbox
}

export default defaultPlugins
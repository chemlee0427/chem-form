import { XComponentType } from "@/typings/formItem"
import Radio from "@/components/Radio.vue"
import Checkbox from "@/components/Checkbox.vue"
import Select from "@/components/Select.vue"
import { Component } from "vue"
import { Input, InputNumber, Switch, Slider, TimePicker, DatePicker, Rate, ColorPicker } from "element-ui"

const defaultPlugins: Record<XComponentType, Component> = {
  "input": Input,
  "number": InputNumber,
  "select": Select,
  "radio": Radio,
  "checkbox": Checkbox,
  "switch": Switch,
  "slider": Slider,
  "timePicker": TimePicker,
  "datePicker": DatePicker,
  'rate': Rate
}

export default defaultPlugins
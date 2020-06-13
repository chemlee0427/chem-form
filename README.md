# `chem-form`

使用 json 的方式便捷开发 form

## 安装

```bash
npm install chem-form
# or
yarn add chem-form
```

## 为什么

Vue.js + Element-ui 的组合加快了我们开发中台系统的速度，但是开发中发现存在大量的重复的操作，根据业内比较 🔥 的 scheme 的方式配置表单的方式，对其进行二次开发，加速实际开发速度。

## 如何使用

```js
// main.js
import chemForm from "chem-form"
Vue.use(chemForm)

// common.vue
<template>
  <chem-form v-model="formData" :scheme="formConfig"></chem-form>
</template>

<script lang="ts">
  import { Vue, Component } from "vue-property-decorator";
  @Component
  export default class extends Vue {
    formData:Record<string, any> = {}
    formConfig = {
      DEBUG: true,
      items: [
        { prop: "name", label: "姓名" },
        { prop: "age", label: "年龄", "x-component": "number"},
        // ... add other form config
      ]
    }
  }
</script>
```

## form Prop

| Name    | Description | Type    |
| :------ | :---------- | :------ |
| v-model | 表单数据    | `{ }`   |
| scheme  | 表单配置    |         |
| auth    | 表单权限    | `Array` |

## form methods

| Name          | Description      | callback          | params                         |
| :------------ | :--------------- | :---------------- | :----------------------------- |
| resetForm     | 重置表单         | `-`               | `-`                            |
| validateForm  | 校验表单         | `Promise`         | `-`                            |
| clearValidate | 清空校验         | `-`               | `propName?: string | string[]` |
| setItem       | 设置某字段的值   | `-`               | `propName: string, value: any` |
| getItemRef    | 获取某字段 Ref   | `Vue`             | `propName: string`             |
| getFormModel  | 获取所有表单数据 | `Object`          | `removeNull:boolean`           |
| submit        | 表单提交         | `Function(model)` | `-`                            |

## form-item props

| Name         | 说明                                                                    | 类型                                                                | 默认值                                                                                                         |
| ------------ | ----------------------------------------------------------------------- | ------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| prop         | 绑定的值\(对应后端字段\)                                                | string                                                              | 必填                                                                                                           |
| label        | 页面中显示的名称                                                        | string                                                              | 必填                                                                                                           |
| isRender     | 是否显示                                                                | boolean \| Function<boolean>                                        | true                                                                                                           |
| required     | 是否进行校验                                                            | boolean                                                             | false                                                                                                          |
| rules        | 校验规则                                                                | Array                                                               | \[\{ required: true, message: "label 为必填项"\}\]                                                             |
| description  | 对字段填写的提示信息                                                    | string \| VNode                                                     | null                                                                                                           |
| slot         | 插槽的名字 \- 该字段使用插槽内容展示                                    | string                                                              | null                                                                                                           |
| x\-component | 自带的组件名字                                                          | string                                                              | input \(input / number / select / radio / checkbox / switch /slider / timePicker/ datePicker/ rate / upload \) |
| attrs        | 扩展属性，element\-ui 中自带的的属性                                    | Record<string, any>                                                 | \{\}                                                                                                           |
| listeners    | 扩展监听器，element\-ui 该组件自带的监听器                              | Record<string, Function>                                            | \{\}                                                                                                           |
| source       | 源数据，radio，select，checkbox 用来展示的数据                          | \{ labelKey: string, valueKey: string, data: any\[\] \| Function \} | radio / checkbox / select 为必填项                                                                             |
| colSpan      | 表格模式下 form\-item 占的大小 \- 参照饿了么组件 el\-col 中的 span 字段 | number                                                              | 8                                                                                                              |
| supportEntry | 表格模式下该字段是否支持                                                | boolean                                                             | input / number / select 默认是 true                                                                            |
|              |

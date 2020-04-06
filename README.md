# x-form

> 使用json的方式便捷开发你的form

## 安装
```bash
npm install x-form
# or
yarn add x-form
```

## 为什么
Vue.js + Element-ui的组合加快了我们开发中台系统的速度，但是在日常的开发中还是想更快一点，省下点时间来学习日新月异的前端知识体系

## 如何使用
```js
// main.js
import XForm from "x-form"
Vue.use(XForm)

// common.vue
<template>
  <x-form :data.sync="formData" :scheme="formConfig"></x-form>
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

## Prop
| Name  | Description | Type |
| :--   | :--         | :--  |
| data  | 表单数据     | `{ }`  |
| scheme| 表单配置     |      |
| auth  | 表单权限     | `Array` |

# methods
| Name  | Description | callback | params |
| :--   | :--         | :--  | :-- |
| resetForm  | 重置表单     | `-`  | `-`
| validateForm| 校验表单     |  `Promise` | `-`
| clearValidate  | 清空校验     | `-` | `propName?: string | string[]`
| setItem | 设置某字段的值 | `-` | `propName: string, value: any`
| getItemRef | 获取某字段Ref | `Vue` | `propName: string`
| getFormModel | 获取所有表单数据 | `Object` | `removeNull:boolean`
| submit | 表单提交 | `Function(model)` | `-`
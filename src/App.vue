<template>
  <div id="app">
    <h2>{{formData}}</h2>
    <x-form ref="form" :scheme="formConfig" :data.sync="formData">
      <template v-slot:sex="{ model }">
        <el-radio ref="radio1" v-model="model.sex" label="1">男</el-radio>
        <el-radio v-model="model.sex" label="2">女</el-radio>
      </template>
      <button @click="submit">search</button>
      <button @click="reset">reset</button>
    </x-form>
    <button @click="handleClick">点击修改</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { IFormConfig } from "@/typings/form";
import { Radio } from "element-ui";

@Component({
  name: "app",
  components: {
    [Radio.name]: Radio
  }
})
export default class App extends Vue {
  formData: any = {};
  formConfig: IFormConfig = {
    DEBUG: true,
    items: [
      {
        prop: "name",
        label: "姓名",
        default: "atom",
        required: true,
        events: {
          change: (val) => {
            console.log(val);
          }
        }
      },
      {
        prop: "age",
        label: "年龄",
        isRender: (model) => {
          return model.name === "taro" ? true : false
        },
        rules: [{ required: true, message: "请填写此项" }]
      },
      {
        prop: "address",
        label: "地址",
        rules: [{ required: true, message: "请填写此项" }]
      },
      { prop: "month", label: "月份", "x-component": "number" },
      { prop: "year", label: "年份", default: "3", "x-component": "radio" },
      { prop: "source", label: "来源", "x-component": "select", default: 2 },
      { prop: "work", label: "职业", "x-component": "checkbox", default: ["选中且禁用"] },
      { prop: "sex", label: "性别", default: "1", slot: "sex" }
    ]
  };

  handleClick() {
    this.formData = {
      name: "VUE",
    }

    console.log((this.$refs.form as any).getFormModel());
  }


  reset() {
    (this.$refs.form as any).resetForm();
  }

  simulateHttp() {
    return new Promise(resolve => setTimeout(() => {
      resolve({
        data: "name"
      })
    }, 2000))
  }

  async submit() {
    (this.$refs.form as any).submit((model) => {
      setTimeout(() => console.log(model), 1000)
    });
  }
}
</script>

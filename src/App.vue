<template>
  <div id="app">
    <h2>{{formData}}</h2>
    <x-form ref="form" :scheme="formConfig" :data.sync="formData">
      <template v-slot:sex="{ model }">
        <span>{{model}}</span>
        <el-radio v-model="model.sex" label="1">男</el-radio>
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
      { prop: "name", label: "姓名", default: "atom" },
      {
        prop: "age",
        label: "年龄",
        rules: [{ required: true, message: "请填写此项", trigger: "blur" }]
      },
      { prop: "address", label: "地址" },
      { prop: "sex", label: "性别", default: "1", slot: "sex" }
    ]
  };

  handleClick() {
    this.formData = {
      name: "Taro",
      age: 23
    };
  }

  reset() {
    (this.$refs.form as any).resetForm();
    (this.$refs.form as any).getItemRef("sex");
  }

  async submit() {
    const flag = await (this.$refs.form as any).validateForm();
    console.log(flag);
  }
}
</script>

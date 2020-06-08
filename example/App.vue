<template>
  <div id="app">
    <debug-table :table-source="formData"></debug-table>
    <chem-form ref="form" :scheme="formConfig" :data.sync="formData" custom-class="fpx">
      <template v-slot:sex="{ model }">
        <el-radio ref="radio1" v-model="model.sex" label="1">插槽进来的1</el-radio>
        <el-radio v-model="model.sex" label="2">插槽进来的2</el-radio>
      </template>
      <button @click="submit">search</button>
      <button @click="reset">reset</button>
    </chem-form>
    <button @click="handleClick">点击修改</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { IFormConfig } from '@/typings/form';
import { Radio } from 'element-ui';
import Debug from '../src/form/debug.vue';

@Component({
  name: 'app',
  components: {
    [Radio.name]: Radio,
    'debug-table': Debug
  }
})
export default class App extends Vue {
  formData: any = {};
  formConfig: IFormConfig = {
    DEBUG: true,
    attrs: {
      'label-width': '100px'
    },
    items: [
      {
        prop: 'name',
        label: '姓名',
        required: true
      },
      {
        prop: 'age',
        label: '年龄',
        rules: [{ required: true, message: '请填写此项' }]
      },
      {
        prop: 'address',
        label: '地址',
        rules: [{ required: true, message: '请填写此项' }]
      },
      { prop: 'month', label: '月份', 'x-component': 'number' },
      {
        prop: 'year',
        label: '年份',
        'x-component': 'radio',
        source: {
          labelKey: 'label',
          valueKey: 'code',
          data: this.simulateHttp
        },
        required: true
      },
      {
        prop: 'source',
        label: '来源',
        'x-component': 'select',
        default: 'vue',
        source: {
          labelKey: 'label',
          valueKey: 'code',
          data: this.simulateHttp
        }
      },
      {
        prop: 'work',
        label: '职业',
        'x-component': 'checkbox',
        source: {
          labelKey: 'label',
          valueKey: 'code',
          data: this.simulateHttp
        }
      },
      { prop: 'sex', label: '性别', slot: 'sex', required: true },
      { prop: 'flag', label: '开关', 'x-component': 'switch' },
      { prop: 'slider', label: '区间', 'x-component': 'slider' },
      { prop: 'time_picker', label: '时间', 'x-component': 'timePicker' },
      { prop: 'date_picker', label: '日期', 'x-component': 'datePicker' },
      { prop: 'date_range', label: '日期区间', 'x-component': 'datePicker', attrs: { type: 'daterange' } },
      { prop: 'rate', label: '评分', 'x-component': 'rate' }
    ]
  };

  // 点击设置
  handleClick() {
    this.formData = {
      name: 'VUE'
    };
  }

  // 重置
  reset() {
    (this.$refs.form as any).resetForm();
  }

  simulateHttp() {
    return new Promise(resolve =>
      setTimeout(() => {
        resolve([
          { label: 'Vue', code: 'vue' },
          { label: 'React', code: 'react', disable: true }
        ]);
      }, 1000)
    );
  }

  simulateHttpClone() {
    return new Promise(resolve =>
      setTimeout(() => {
        resolve([
          { label: 'Google', code: 'google' },
          { label: 'Facebook', code: 'facebook', disable: true }
        ]);
      }, 5000)
    );
  }

  async submit() {
    (this.$refs.form as any).submit(model => {
      setTimeout(() => console.log(model), 1000);
    });
  }
}
</script>

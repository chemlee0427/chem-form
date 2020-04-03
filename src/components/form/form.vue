<template>
  <el-form
    ref="form"
    :model="model"
    :rules="rules"
    @submit.native.prevent
    v-bind="MergeScheme.attrs"
  >
    <template v-if="MergeScheme.DEBUG">
      <div>{{model}}</div>
    </template>
    <template v-for="$formItem in MergeScheme.items">
      <template v-if="$formItem.slot">
        <slot :name="$formItem.slot" :model="model"></slot>
      </template>
      <form-item :ref="$formItem.prop" v-else :key="$formItem.prop" :config="$formItem"></form-item>
    </template>
    <slot></slot>
  </el-form>
</template>

<script lang="ts">
import { Vue, Component, Prop, Provide, Watch } from "vue-property-decorator";
import { Form } from "element-ui";
import { IFormConfig, IFormModel } from "@/typings/form";
import { defaultFormConfig, defaultFormItemConfig } from "./defaultConfig";
import FormItem from "./formItem.vue";

@Component({
  name: "x-form",
  components: {
    [Form.name]: Form,
    "form-item": FormItem
  }
})
export default class extends Vue {
  @Prop({ type: Object, required: true }) scheme!: IFormConfig;
  @Prop(Object) data!: IFormModel;
  @Provide() Provider = this;

  model: IFormModel = this._getModelSchemeByConfig();

  protected get MergeScheme(): IFormConfig {
    this.scheme.layout = { ...defaultFormConfig.layout, ...this.scheme.layout };
    this.scheme.attrs = { ...defaultFormConfig.attrs, ...this.scheme.attrs };
    const _items = this.scheme.items.map($item => ({
      ...defaultFormItemConfig,
      ...$item
    }));
    return { ...defaultFormConfig, ...this.scheme, items: _items };
  }

  protected get rules() {
    return this.MergeScheme.items.reduce((merged, item) => {
      if (item.rules) {
        return { ...merged, [item.prop]: item.rules };
      }
      return merged;
    }, {});
  }

  protected _getModelSchemeByConfig(): IFormModel {
    const _model: IFormModel = {};
    this.scheme.items.forEach(formItemConfig => {
      _model[formItemConfig.prop] = formItemConfig.default || "";
    });
    return _model;
  }

  protected getRef(refName: string): any {
    return this.$refs[refName];
  }

  @Watch("model", { immediate: true, deep: true })
  syncOriginalModel(newValue: IFormModel) {
    this.$emit("update:data", newValue);
  }

  // update every model field when user pass the new Data;
  // * Some of the field data may be not passed in by the user.
  // * We need to set the non-entered field to the default value of the field.
  @Watch("data", { deep: true })
  updateModel(newData: IFormModel) {
    const defaultModel = this._getModelSchemeByConfig();
    Object.keys(this.model).forEach(field => {
      this.$set(this.model, field, newData[field] || defaultModel[field]);
    });
  }

  public resetForm(): void {
    const defaultModel = this._getModelSchemeByConfig();
    Object.keys(defaultModel).forEach(field => {
      this.$set(this.model, field, defaultModel[field]);
    });
    this.clearValidate();
  }

  public validateForm(): Promise<boolean> {
    return new Promise(resolve => {
      this.getRef("form").validate(valid => {
        resolve(valid);
      });
    });
  }

  public clearValidate(propName?: string | string[]): void {
    this.getRef("form").clearValidate(propName);
  }

  public getItemRef(propName: string) {
    if (this.$scopedSlots[propName]) {
      console.error(
        `The '${propName}' is a slot component, please get it at outer layer`
      );
      return;
    }
    const isHas = this.MergeScheme.items.find(field => field.prop === propName);
    if (!isHas) {
      console.error(`your params: '${propName}' not included in config.items`);
      return;
    }

    return this.$refs[propName][0];
  }
}
</script>
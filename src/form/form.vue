<template>
  <el-form
    ref="form"
    :model="model"
    :disabled="MergeScheme.onlyRead"
    v-bind="MergeScheme.attrs"
    @submit.native.prevent
    :class="{ 'x-form-onlyRead': MergeScheme.onlyRead }"
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
import { defaultFormConfig, defaultComponentConfig } from "./defaultConfig";
import FormItem from "./formItem.vue";

@Component({
  name: "x-form",
  components: {
    [Form.name]: Form,
    "form-item": FormItem,
  },
})
export default class extends Vue {
  @Prop({ type: Object, required: true }) scheme!: IFormConfig;
  @Prop(Object) data!: IFormModel;
  @Provide() Provider = this;

  model: IFormModel = this._getModelSchemeByConfig();

  protected get MergeScheme(): IFormConfig {
    this.scheme.layout = { ...defaultFormConfig.layout, ...this.scheme.layout };
    this.scheme.attrs = { ...defaultFormConfig.attrs, ...this.scheme.attrs };
    return { ...defaultFormConfig, ...this.scheme };
  }
  // 通过传入配置生成本地数据并赋默认值
  protected _getModelSchemeByConfig(): IFormModel {
    const _model: IFormModel = {};
    this.scheme.items.forEach(formItemConfig => {
      const targetComponentConfig = defaultComponentConfig[formItemConfig["x-component"] || "input"];
      _model[formItemConfig.prop] = formItemConfig.default || targetComponentConfig.defaultValue;
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
    const _mergeModel = { ...this.model, ...newData }
    Object.keys(_mergeModel).forEach(field => {
      this.$set(this.model, field, _mergeModel[field])
    })
  }

  // NOTE: 将多传递进来的字段删除 && 将已有的初始化
  public resetForm(): void {
    const defaultModel = this._getModelSchemeByConfig();
    Object.keys(this.model).forEach(field => {
      if (Object.prototype.hasOwnProperty.call(defaultModel, field)) {
        this.$set(this.model, field, defaultModel[field])
      } else {
        this.$delete(this.model, field)
      }
    });
    this.$nextTick(() => this.clearValidate())
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

  public setItem(propName: string, value: any): void {
    this.$set(this.model, propName, value)
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

  public getFormModel(removeNull = true): IFormModel {
    if (removeNull) {
      const _removeNull = {}
      const keys = Object.keys(this.model).filter(key => this.model[key] !== null);
      keys.forEach(key => _removeNull[key] = this.model[key])
      return _removeNull
    } else {
      return this.model
    }
  }

  public submit(cb: Function) {
    cb(this.model)
  }
}
</script>

<style lang="scss" src="../style/coverDef.scss" scoped></style>
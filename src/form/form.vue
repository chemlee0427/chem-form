<template>
  <el-form
    ref="form"
    :model="model"
    :disabled="MergeScheme.onlyRead"
    v-bind="MergeScheme.attrs"
    @submit.native.prevent
    :inline="MergeScheme.layout.type === 'inline'"
    :class="[customClass,{'x-form-onlyRead': MergeScheme.onlyRead}]"
  >
    <!-- 调试模式 -->
    <template v-if="MergeScheme.DEBUG">
      <div>{{model}}</div>
    </template>

    <!-- 表格模式 -->
    <template v-if="MergeScheme.layout.type === 'table'">
      <el-row class="x-form-layout-table">
        <template v-for="$tableItem in MergeScheme.items">
          <el-col
            class="x-form-layout-table_column"
            :span="MergeScheme.layout.span"
            :key="$tableItem.prop"
            v-if="visible($tableItem.isRender)"
          >
            <template v-if="$tableItem.slot">
              <el-form-item
                :key="$tableItem.prop"
                :label="$tableItem.label"
                :prop="$tableItem.prop"
                :required="$tableItem.required"
                :rules="$tableItem.rules"
                class="x-form-slot"
              >
                <slot :name="$tableItem.slot" :model="model"></slot>
              </el-form-item>
            </template>
            <template v-else>
              <x-form-item
                v-if="visible($tableItem.isRender)"
                :ref="$tableItem.prop"
                :key="$tableItem.prop"
                :config="$tableItem"
              ></x-form-item>
            </template>
          </el-col>
        </template>
      </el-row>
    </template>

    <!-- 默认模式 -->
    <template v-else>
      <template v-for="$formItem in MergeScheme.items">
        <template v-if="$formItem.slot">
          <el-form-item
            :key="$formItem.prop"
            :label="$formItem.label"
            :prop="$formItem.prop"
            :required="$formItem.required"
            :rules="$formItem.rules"
            v-if="visible($formItem.isRender)"
          >
            <slot :name="$formItem.slot" :model="model"></slot>
          </el-form-item>
        </template>
        <template v-else>
          <x-form-item
            v-if="visible($formItem.isRender)"
            :ref="$formItem.prop"
            :key="$formItem.prop"
            :config="$formItem"
          ></x-form-item>
        </template>
      </template>
    </template>
    <slot></slot>
  </el-form>
</template>

<script lang="ts">
import { Vue, Component, Prop, Provide, Watch } from "vue-property-decorator";
import { Form, FormItem, Row, Col } from "element-ui";
import { IFormConfig, IFormModel } from "@/typings/form";
import { defaultFormConfig, defaultComponentConfig } from "./defaultConfig";
import { isArray, isFunction, deepCopy } from "@/utils/index";
import XFormItem from "./formItem.vue";

@Component({
  name: "x-form",
  components: {
    [Form.name]: Form,
    [FormItem.name]: FormItem,
    [Row.name]: Row,
    [Col.name]: Col,
    "x-form-item": XFormItem
  }
})
export default class extends Vue {
  @Prop({ type: Object, required: true }) scheme!: IFormConfig;
  @Prop(Object) data!: IFormModel;
  @Prop({ type: Array, default: undefined }) auth!: string[] | undefined; // NODE: 认证权限
  @Prop(String) customClass!: string
  @Provide() Provider = this;

  model: IFormModel = this._getModelSchemeByConfig();

  // NOTE: 通过计算属性实时调用配置中的isRender回调
  get visible() {
    return isRender => isFunction(isRender) ? isRender(this.model) : true
  }

  // NOTE: 合并配置 - 因可能使用插槽而不用自带组件，需要在此处赋初始值
  protected get MergeScheme(): IFormConfig {
    this.scheme.layout = { ...defaultFormConfig.layout, ...this.scheme.layout };
    this.scheme.attrs = { ...defaultFormConfig.attrs, ...this.scheme.attrs };

    // * 是否渲染，默认自带组件配置
    this.scheme.items = this.scheme.items.map($item => {
      const { required, rules, label } = $item;
      let targetComponentConfig = defaultComponentConfig[$item["x-component"] || "input"];
      targetComponentConfig = this.setPlaceholderType(targetComponentConfig, $item.label); // placeholder配置
      const _required = required || (isArray(rules) && (rules as []).length) ? true : false; // 智能设置required和rules关系
      return {
        ...$item,
        required: _required,
        attrs: { ...targetComponentConfig.attrs, ...$item.attrs },
        "x-component": $item["x-component"] || "input",
        rules: rules ? rules : _required
          ? [{ required: true, message: `${label}为必填项` }]
          : undefined,
      }
    })

    // * 权限匹配
    if (isArray(this.auth)) {
      this.scheme.items = this.scheme.items.filter(
        $item => (this.auth as string[]).indexOf($item.prop) !== -1
      );
    }

    return { ...defaultFormConfig, ...this.scheme };
  }

  // NODE: 通过form.onlyRead设置每个组件的placeholder
  protected setPlaceholderType(defaultConfig, label) {
    const _defaultConfig = deepCopy(defaultConfig) as any
    if (this.scheme.onlyRead && defaultConfig.attrs.placeholder) {
      _defaultConfig.attrs.placeholder = ""
    }
    else if (!this.scheme.onlyRead && defaultConfig.attrs.placeholder) {
      _defaultConfig.attrs.placeholder = defaultConfig.attrs.placeholder + label
    }

    return _defaultConfig
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
    const _mergeModel = { ...this.model, ...newData };
    Object.keys(_mergeModel).forEach(field => {
      this.$set(this.model, field, _mergeModel[field]);
    });
  }

  // NOTE: 将多传递进来的字段删除 && 将已有的初始化
  public resetForm(): void {
    const defaultModel = this._getModelSchemeByConfig();
    Object.keys(this.model).forEach(field => {
      if (Object.prototype.hasOwnProperty.call(defaultModel, field)) {
        this.$set(this.model, field, defaultModel[field]);
      } else {
        this.$delete(this.model, field);
      }
    });
    this.$nextTick(() => this.clearValidate());
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
    this.$set(this.model, propName, value);
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
      const _removeNull = {};
      const keys = Object.keys(this.model).filter(
        key => this.model[key] !== null
      );
      keys.forEach(key => (_removeNull[key] = this.model[key]));
      return _removeNull;
    } else {
      return this.model;
    }
  }

  public submit(cb: Function) {
    cb(this.model);
  }
}
</script>

<style lang="scss" src="../style/coverDef.scss" scoped></style>
<template>
  <el-form-item
    :label="mergeConfig.label"
    :prop="mergeConfig.prop"
    :required="mergeConfig.required"
    :rules="mergeConfig.rules"
    v-if="mergeConfig.isRender"
  >
    <component
      :is="targetComponent"
      v-model="Provider.model[mergeConfig.prop]"
      v-bind="mergeConfig.attrs"
      v-on="mergeConfig.listeners"
      :source = "mergeConfig.source"
    ></component>
  </el-form-item>
</template>

<script lang="ts">
import { Vue, Component, Prop, Inject } from "vue-property-decorator";
import { FormItem } from "element-ui";
import { IFormItemConfig } from "@/typings/formItem";
import { defaultComponentConfig } from "./defaultConfig"
import { isFunction, isArray } from "@/utils";
import defaultComponents from "./formItemComponents";

@Component({
  name: "x-form-item",
  components: {
    [FormItem.name]: FormItem
  }
})
export default class extends Vue {
  @Prop({ type: Object, required: true }) config!: IFormItemConfig;
  @Inject() Provider!: any;

  get mergeConfig(): IFormItemConfig {
    const targetComponentConfig = defaultComponentConfig[this.config["x-component"] || "input"];
    const { required, rules, isRender, label } = this.config;
    const _required = required || (isArray(rules) && (rules as []).length) ? true : false;
    const _merge: IFormItemConfig = {
      ...this.config,
      isRender: isFunction(isRender) ? (isRender as Function)(this.Provider.model) : true,
      required: _required,
      rules: rules ? rules : _required
        ? [{ required: true, message: `${label}为必填项` }]
        : undefined,
      "x-component": this.config["x-component"] || "input",
      attrs: { ...targetComponentConfig.attrs, ...this.config.attrs }
    };
    return _merge;
  }

  get targetComponent() {
    return defaultComponents[this.mergeConfig["x-component"] as string];
  }
}
</script>
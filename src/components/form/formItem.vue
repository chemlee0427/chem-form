<template>
  <el-form-item
    :label="mergeConfig.label"
    :prop="mergeConfig.prop"
    :required="mergeConfig.required"
    :rules="mergeConfig.rules"
  >
    <component :is="targetComponent" v-model="Provider.model[mergeConfig.prop]"></component>
  </el-form-item>
</template>

<script lang="ts">
import { Vue, Component, Prop, Inject } from "vue-property-decorator";
import { FormItem } from "element-ui";
import { IFormItemConfig } from "@/typings/formItem";
import defaultComponents from "./formItemComponents";
import { isFunction, isArray } from "@/utils";

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
    const { required, rules, visible, label } = this.config;
    const _required = required || (isArray(rules) && (rules as []).length) ? true : false;
    const _merge: IFormItemConfig = {
      ...this.config,
      visible: isFunction(visible) ? (visible as Function)(this.Provider.model) : true,
      required: _required,
      "x-component": this.config["x-component"] || "input",
      rules: rules ? rules : _required
        ? [
          { required: true, message: `${label}为必填项`, trigger: "blur" },
          { required: true, message: `${label}为必填项`, trigger: "change" }
        ]
        : undefined
    };
    return _merge;
  }

  get targetComponent() {
    return defaultComponents[this.mergeConfig["x-component"] as string];
  }

  mounted() {
    console.log(this.mergeConfig);
  }
}
</script>
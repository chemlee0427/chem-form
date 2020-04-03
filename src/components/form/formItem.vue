<template>
  <el-form-item :label="config.label" :prop="config.prop">
    <component :is="targetComponent" v-model="Provider.model[config.prop]"></component>
  </el-form-item>
</template>

<script lang="ts">
import { Vue, Component, Prop, Inject } from "vue-property-decorator";
import { FormItem } from "element-ui";
import { IFormItemConfig } from "@/typings/formItem";
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

  get targetComponent() {
    return defaultComponents[this.config["x-component"] as string];
  }
}
</script>
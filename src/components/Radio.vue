<template>
  <el-radio-group v-model="localValue" v-bind="$attrs">
    <el-radio label="3">备选项1</el-radio>
    <el-radio label="6">备选项2</el-radio>
    <el-radio label="9">备选项3</el-radio>
  </el-radio-group>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { RadioGroup, Radio } from "element-ui"

@Component({
  name: "x-form-radio",
  components: {
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio
  }
})
export default class extends Vue {
  @Prop() value!: any

  localValue = this.value

  @Watch("localValue", { immediate: true, deep: true })
  emitUpdate(newValue: any) {
    this.$emit("input", newValue)
  }
}
</script>
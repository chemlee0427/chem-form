<template>
  <el-checkbox-group v-model="localValue">
    <el-checkbox label="复选框 A"></el-checkbox>
    <el-checkbox label="复选框 B"></el-checkbox>
    <el-checkbox label="复选框 C"></el-checkbox>
    <el-checkbox label="禁用" disabled></el-checkbox>
    <el-checkbox label="选中且禁用" disabled></el-checkbox>
  </el-checkbox-group>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { Checkbox, CheckboxGroup } from "element-ui"

@Component({
  name: "x-form-checkbox",
  components: {
    [CheckboxGroup.name]: CheckboxGroup,
    [Checkbox.name]: Checkbox
  }
})
export default class extends Vue {
  @Prop() value!: any[]

  localValue = this.value

  @Watch("localValue", { immediate: true, deep: true })
  emitUpdate(newValue) {
    this.$emit("input", newValue)
  }

  mounted() { 
    console.log(this);
  }
}
</script>
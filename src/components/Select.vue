<template>
  <el-select v-model="localValue" v-bind="$attrs" v-on="$listeners">
    <el-option :label="1" :value="1"></el-option>
    <el-option :label="2" :value="2"></el-option>
  </el-select>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { Select, Option } from "element-ui"

@Component({
  name: "x-form-select",
  components: {
    [Option.name]: Option,
    [Select.name]: Select
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
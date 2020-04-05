<template>
  <el-select v-model="localValue" v-bind="$attrs" v-on="$listeners">
    <el-option
      v-for="$option in localSource"
      :key="$option.label"
      :label="$option.label"
      :value="$option.value"
      :disabled="$option.disable"
    ></el-option>
  </el-select>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import { Select, Option } from "element-ui"
import sourceMixin from "./Mixin"

@Component({
  name: "x-form-select",
  components: {
    [Option.name]: Option,
    [Select.name]: Select
  }
})
export default class extends Mixins(sourceMixin) { }
</script>
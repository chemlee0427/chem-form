<template>
  <el-checkbox-group v-model="localValue" v-bind="$attrs" v-on="$listeners">
    <el-checkbox
      v-for="$option in localSource"
      :key="$option.value"
      :label="$option.value"
      :disabled="$option.disable"
    >{{$option.label}}</el-checkbox>
  </el-checkbox-group>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import { Checkbox, CheckboxGroup } from "element-ui"
import sourceMixin from "./Mixin"

@Component({
  name: "x-form-checkbox",
  components: {
    [CheckboxGroup.name]: CheckboxGroup,
    [Checkbox.name]: Checkbox
  }
})
export default class extends Mixins(sourceMixin) { }
</script>
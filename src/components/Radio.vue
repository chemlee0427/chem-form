<template>
  <el-radio-group v-model="localValue" v-bind="$attrs" v-on="$listeners">
    <el-radio
      v-for="$option in localSource"
      :key="$option.value"
      :label="$option.value"
      :disabled="$option.disable"
    >{{$option.label}}</el-radio>
  </el-radio-group>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import { RadioGroup, Radio } from "element-ui"
import sourceMixin from "./Mixin"

@Component({
  name: "x-form-radio",
  components: {
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio
  }
})
export default class extends Mixins(sourceMixin) { }
</script>
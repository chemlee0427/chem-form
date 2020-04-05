import { Vue, Component, Prop, Watch } from "vue-property-decorator"
import { IFormItemSource } from "@/typings/formItem"
import { isFunction, isArray } from "@/utils/index"

@Component
export default class extends Vue {
  @Prop() value!: any
  @Prop({ type: Object }) source!: IFormItemSource

  localValue = this.value
  localSource: any[] = []

  @Watch("localValue", { immediate: true, deep: true })
  emitUpdate(newValue: any) {
    this.$emit("input", newValue)
  }

  async created() {
    const { labelKey, valueKey, data } = this.source;
    let _localSource: any[] = [];
    if (isArray(data)) {
      _localSource = data as [];
    } else if (isFunction(data)) {
      _localSource = await (data as Function)() || [];
    }

    this.localSource = _localSource.map(item => ({
      label: item[labelKey],
      value: item[valueKey],
      // NODE: 用于控制每个选项的禁用
      disable: item.disable || false
    }))
  }
}
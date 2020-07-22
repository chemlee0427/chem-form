<template>
  <el-form-item :prop="config.prop" :required="config.required" :rules="config.rules">
    <jsx-component :vnode="$slots.default" v-if="config.slot"></jsx-component>
    <component
      v-else
      ref="formItem"
      @focus="_focus"
      :is="targetComponent"
      v-model="Provider.model[config.prop]"
      v-bind="config.attrs"
      v-on="config.listeners"
      :source="config.source"
    ></component>
    <!-- 自定义label + 添加描述信息 -->
    <template #label>
      <span> {{ config.label }}</span>
      <el-popover placement="bottom" trigger="hover" v-if="config.description">
        <jsx-component :vnode="config.description" v-if="isVNode(config.description)" />
        <span v-else>{{ config.description }}</span>
        <i class="el-icon-info chem-popover-icon" slot="reference"></i>
      </el-popover>
    </template>
  </el-form-item>
</template>

<script lang="ts">
import { Vue, Component, Prop, Inject } from 'vue-property-decorator';
import { FormItem, Popover } from 'element-ui';
import { IFormItemConfig } from '../types/formItem';
import defaultComponents from './formItemComponents';

@Component({
  name: 'x-form-item',
  components: {
    [FormItem.name]: FormItem,
    [Popover.name]: Popover,
    jsxComponent: {
      functional: true,
      render(createElement, context) {
        return context.props.vnode;
      }
    }
  }
})
export default class extends Vue {
  @Prop({ type: Object, required: true }) config!: IFormItemConfig;
  @Inject() Provider!: Record<string, any>;

  get targetComponent() {
    return defaultComponents[this.config['x-component'] as string];
  }

  isVNode(target) {
    const instance = this.$createElement('span').constructor;
    return target instanceof instance;
  }
  targetInputElement;
  addMarkData() {
    if (!this.config.supportEntry) return;
    this.targetInputElement = this.$el.querySelector('input');
    (this.targetInputElement as HTMLElement).addEventListener('keydown', evt => {
      if (evt.keyCode === 13) this.$emit('entryEvent', this.config.prop);
    });
  }

  mounted() {
    this.addMarkData();
  }

  _focus() {
    if (this.config.supportEntry) {
      this.$emit('focus', this.config.prop);
    }
  }

  beforeDestroy() {
    if (this.targetInputElement) {
      (this.targetInputElement as HTMLElement).removeEventListener('keydown', evt => console.log(evt));
    }
  }
}
</script>

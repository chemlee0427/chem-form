import { VNode } from 'vue';

// 基础配置
interface baseConfig {
  defaultValue?: any;
  isRender?: boolean | Function;
  required?: boolean;
  rules?: IFormItemRule[];
  description?: string | VNode;
  colSpan?: number;
  supportEntry?: boolean;
  slot?: string;
  'x-component'?: XComponentType;
  attrs?: dynamicType<any>;
  listeners?: dynamicType<Function>;
  source?: IFormItemSource;
}

// 页面中手动配置
export interface IFormItemConfig extends baseConfig {
  prop: string;
  label: string;
}

export interface dynamicType<T> {
  [propName: string]: T;
}

export interface IFormItemRule {
  required?: boolean;
  max?: number;
  min?: number;
  type?: string;
  message?: string;
  trigger?: 'blur' | 'change';
  validator?: Function;
}

export type XComponentType =
  | 'input'
  | 'number'
  | 'select'
  | 'radio'
  | 'checkbox'
  | 'switch'
  | 'slider'
  | 'timePicker'
  | 'datePicker'
  | 'rate'
  | 'upload';

export type XComponentConfig = {
  [P in XComponentType]: XComponentItemConfig;
};

export interface XComponentItemConfig extends baseConfig {
  label?: string;
  prop?: string;
}

export interface IFormItemSource {
  labelKey: string;
  valueKey: string;
  data: any[] | Function;
}

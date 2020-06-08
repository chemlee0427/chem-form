import { IFormItemConfig } from './formItem';

export interface IFormConfig {
  DEBUG?: boolean; // 是否显示DEBUG信息
  layout?: IFormLayout; // form展示的方式
  attrs?: any; // 扩展属性 - element-ui上自带的
  onlyRead?: boolean; // 只读模式
  items: IFormItemConfig[];
}

export interface IFormLayout {
  type?: 'default' | 'inline' | 'table';
  span?: number;
}

export interface IFormModel {
  [propName: string]: any;
}

export interface InstallOptions {
  name?: string;
}

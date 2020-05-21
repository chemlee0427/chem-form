import { IFormItemConfig } from './formItem';

export interface IFormConfig {
  DEBUG?: boolean;
  layout?: IFormLayout;
  attrs?: any;
  onlyRead?: boolean;
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

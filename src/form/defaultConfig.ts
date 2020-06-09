import { IFormConfig } from '@/typings/form';
import { XComponentConfig } from '@/typings/formItem';

// NOTE: 默认form的配置
export const defaultFormConfig: IFormConfig = {
  layout: {
    type: 'table',
    span: 8
  },
  attrs: {
    size: 'small'
  },
  onlyRead: false,
  items: []
};

// NOTE: 默认每个自带组件的配置
export const defaultComponentConfig: XComponentConfig = {
  input: {
    defaultValue: '',
    supportEntry: true,
    attrs: {
      clearable: true,
      placeholder: '请输入'
    }
  },
  number: {
    defaultValue: undefined,
    supportEntry: true,
    attrs: {
      controls: false,
      placeholder: '请输入'
    }
  },
  select: {
    defaultValue: '',
    supportEntry: true,
    attrs: {
      clearable: true,
      placeholder: '请选择',
      'automatic-dropdown': true
    }
  },
  radio: {
    defaultValue: '',
    attrs: {}
  },
  checkbox: {
    defaultValue: [],
    attrs: {}
  },
  switch: {
    defaultValue: false,
    attrs: {}
  },
  slider: {
    defaultValue: 0,
    attrs: {
      step: 20
    }
  },
  timePicker: {
    defaultValue: '',
    attrs: {
      'value-format': 'HH:mm:ss',
      placeholder: '请选择'
    }
  },
  datePicker: {
    defaultValue: '',
    attrs: {
      'value-format': 'yyyy-MM-dd HH:mm:ss',
      placeholder: '请选择'
    }
  },
  rate: {
    defaultValue: undefined,
    attrs: {}
  }
};

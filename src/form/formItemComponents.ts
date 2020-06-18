import { Component } from 'vue';
import { Input, InputNumber, Switch, Slider, TimePicker, DatePicker, Rate } from 'element-ui';
import { XComponentType } from '@/types/formItem';

import Radio from '@/components/BaseRadio.vue';
import Checkbox from '@/components/BaseCheckbox.vue';
import Select from '@/components/BaseSelect.vue';
import Upload from '@/components/BaseUpload.vue';

const defaultPlugins: Record<XComponentType, Component> = {
  input: Input,
  number: InputNumber,
  select: Select,
  radio: Radio,
  checkbox: Checkbox,
  switch: Switch,
  slider: Slider,
  timePicker: TimePicker,
  datePicker: DatePicker,
  rate: Rate,
  upload: Upload
};

export default defaultPlugins;

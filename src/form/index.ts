import Form from './form.vue';
import { VueConstructor } from 'Vue';
import { InstallOptions } from '@/typings/form';

const FormPlugin = {
  install(Vue: VueConstructor, options: InstallOptions = {}) {
    const componentName = options.name || 'x-form';
    Vue.component(componentName, Form);
  }
};

export default FormPlugin;

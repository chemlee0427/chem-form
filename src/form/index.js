import Form from './form.vue';

const FormPlugin = {
  install(Vue, options = {}) {
    const componentName = options.name || 'chem-form';
    Vue.component(componentName, Form);
  }
};

export default FormPlugin;

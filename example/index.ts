import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;
import ChemFrom from '@/form/index';

Vue.use(ChemFrom);

new Vue({
  render: h => h(App)
}).$mount('#app');

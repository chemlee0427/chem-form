import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
import WFrom from "@/form/index"

Vue.use(WFrom)

new Vue({
  render: h => h(App),
}).$mount('#app')

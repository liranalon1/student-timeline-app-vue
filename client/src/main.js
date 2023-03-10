import Vue from 'vue';
import App from './App.vue';
import router from './router';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faEye, faChevronDown, faCircleCheck, faXmark, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

library.add(faEye, faChevronDown, faCircleCheck, faXmark, faMagnifyingGlass);
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
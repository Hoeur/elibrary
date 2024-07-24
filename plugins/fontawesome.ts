import { defineNuxtPlugin } from '#app';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
export default defineNuxtPlugin((nuxtApp: any) => {
  nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon);
});

import { defineNuxtPlugin } from '#app';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
library.add(fas, fab, far);

export default defineNuxtPlugin((nuxtApp: any) => {
  nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon);
});

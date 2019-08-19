import Vue from 'vue';
import store from '@/store';
import App from '@/App';
import router from '@/router';

// registers Vue globals
import '@/filters';
import '@/components/common-ui';

// load vendor CSS
import '@/scss/theme.scss';
import '@fortawesome/fontawesome-free/css/all.css';

store.dispatch('init');

export default new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
});

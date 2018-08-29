import Vue from 'vue';
import store from './store';
import App from './App';
import router from './router';
import './filters';

// load vendor CSS
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css';

export default new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
});

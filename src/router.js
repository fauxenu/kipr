import Vue from 'vue';
import VueRouter from 'vue-router';
import Dashboard from 'pages/Dashboard';
import SplashScreen from 'pages/SplashScreen';

Vue.use(VueRouter);

const routes = [
  { path: '/', component: SplashScreen },
  { path: '/drafts/:slug', component: Dashboard },
];

export default new VueRouter({
  mode: 'history',
  routes,
});

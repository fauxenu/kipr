import Vue from 'vue';
import VueRouter from 'vue-router';
import GraphQLClient from '@/lib/GraphQLClient';
import LandingPage from '@/pages/LandingPage';
import LoginPage from '@/pages/LoginPage';
import SignupPage from '@/pages/SignupPage';
import HomePage from '@/pages/HomePage';
import DashboardPage from '@/pages/DashboardPage';
import ChangePasswordPage from '@/pages/ChangePasswordPage';
import store from '@/store';

Vue.use(VueRouter);

const PUBLIC_ROUTES = ['index', 'login', 'logout', 'signup'];

const passthruOnAuth = (to, from, next) => {
  if (store.state.users.authToken) {
    next({ name: 'dashboard' });
  } else {
    next();
  }
};

const routes = [
  { path: '/', name: 'index', component: LandingPage, beforeEnter: passthruOnAuth },
  { path: '/signup', name: 'signup', component: SignupPage, beforeEnter: passthruOnAuth },
  { path: '/login', name: 'login', component: LoginPage, beforeEnter: passthruOnAuth },
  {
    path: '/logout',
    name: 'logout',
    beforeEnter: (to, from, next) => {
      store.dispatch('logout');
      next({ name: 'index' });
    },
  },
  {
    path: '/dashboard',
    component: HomePage,
    children: [
      { path: '', name: 'dashboard', component: DashboardPage },
      { path: '/change-password', name: 'change-password', component: ChangePasswordPage },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

router.beforeEach((to, from, next) => {
  const { name } = to;
  const { authToken, currentUser } = store.state.users;

  if (PUBLIC_ROUTES.includes(name) || (authToken && currentUser)) {
    next(); // passthru
  } else if (!authToken) {
    next({ name: 'login' }); // redirect if auth token is required but missing
  } else {
    store.dispatch('current').then(() => next()); // load user if missing
  }
});

// redirect to site index on auth error
GraphQLClient.addStatusCodeInterceptor(401, () => {
  store.dispatch('logout');
  router.push({ name: 'login' });
});

export default router;

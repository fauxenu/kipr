import Vue from 'vue';
import capitalize from './capitalize';
import teamName from './teamName';
import formateDate from './formatDate';
import dictionary from './dictionary';

Vue.filter('capitalize', capitalize);
Vue.filter('team-name', teamName);
Vue.filter('format-date', formateDate);
Vue.filter('dictionary', dictionary);

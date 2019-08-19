import Vue from 'vue';
import Button from './Button';
import DropdownMenu from './DropdownMenu';
import NavList from './NavList';
import FormGroup from './FormGroup';
import Input from './Input';

// registers common UI components
Vue.component('ui-button', Button);
Vue.component('ui-dropdown-menu', DropdownMenu);
Vue.component('ui-nav-list', NavList);
Vue.component('ui-form-group', FormGroup);
Vue.component('ui-input', Input);

<template>
  <div class="navbar fixed-top" :class="{ transparent }">
    <div class="container">
      <router-link :to="{ name: 'dashboard' }" class="navbar-brand">
        <i class="logo fas fa-football-ball"></i>
        <span class="ml-1">{{ 'brand.name' | dictionary }}</span>
      </router-link>
      <user-menu />
    </div>
  </div>
</template>

<script>
import UserMenu from './UserMenu';

export default {
  props: {
    transparent: { type: Boolean, default: false },
  },
  components: { UserMenu },
};
</script>


<style lang="scss" scoped>
@import '@/scss/variables';

.navbar {
  background-color: $purple;

  &.transparent {
    background-color: transparent;
  }
}

.navbar-brand {
  text-transform: uppercase;
  color: #fff;

  .logo {
    background-color: $purple;
    padding: 8px;
    text-align: center;
    border-radius: 4px;
  }
}
</style>

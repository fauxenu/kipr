<template>
  <div class="navbar fixed-top navbar-light bg-light">
    <router-link to="/" class="navbar-brand">
      <i class="logo fas fa-football-ball"></i>
      <span class="ml-1">Kipr</span>
    </router-link>
    <player-search class="form-inline" />
  </div>
</template>

<script>
import PlayerSearch from './PlayerSearch';

export default {
  components: { PlayerSearch },
};
</script>


<style lang="scss" scoped>
@import 'variables';

.navbar-brand {
  text-transform: uppercase;

  .logo {
    color: #fff;
    background-color: $purple;
    padding: 8px;
    text-align: center;
    border-radius: 4px;
  }
}
</style>

<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import Dashboard from 'pages/Dashboard';

export default {
  components: { Dashboard },
};
</script>

<style lang="scss" scoped>
.fade {
  &-enter-active,
  &-leave-active {
    transition: all .2s ease-in-out;
  }

  &-enter,
  &-leave-to {
    opacity: 0;
    transform: scale(1.1);
  }
}
</style>

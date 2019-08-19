<template>
  <div id="home-page">
    <site-nav-bar />
    <notification-list />
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import SiteNavBar from '@/components/navigation/SiteNavBar';
import NotificationList from '@/components/notifications/NotificationList';

export default {
  components: { SiteNavBar, NotificationList },
};
</script>

<style lang="scss" scoped>
#home-page {
  padding-top: 100px;
}
</style>

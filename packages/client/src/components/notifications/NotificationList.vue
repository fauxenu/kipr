<template>
  <div class="notification-list">
    <transition-group name="notification-list__items" tag="ul" class="list-unstyled mb-0">
      <notification-list-item
        v-for="notification in notifications"
        :key="notification.id"
        :message="notification.message"
        :type="notification.type"
        :dismissible="!notification.duration"
        @close="dismiss({ id: notification.id })"
      />
    </transition-group>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import NotificationListItem from './NotificationListItem';

const { mapState, mapActions } = createNamespacedHelpers('notifications');

export default {
  components: { NotificationListItem },
  computed: {
    ...mapState({
      notifications: state => state.notifications,
    }),
  },
  methods: {
    ...mapActions(['dismiss']),
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/variables";

.notification-list {
  position: fixed;
  top: 80px;
  right: 15px;
  left: 15px;
  z-index: $z-index-top;

  @include media-breakpoint-up(md) {
    left: unset;
    width: 350px;
  }

  &:empty {
    display: none;
  }

  &__items-enter,
  &__items-leave-to {
    opacity: 0;
    transform: translateX(80%);
  }
}
</style>

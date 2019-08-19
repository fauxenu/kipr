<template>
  <li
    class="notification-list-item alert"
    :class="{ 'alert-dismissible': dismissible, [`alert-${type}`]: true }"
  >
    <button
      v-if="dismissible"
      type="button"
      class="close"
      aria-label="Close"
      @click="$emit('close')"
    >
      <span aria-hidden="true">&times;</span>
    </button>
    <div class="alert-content" v-html="message"></div>
  </li>
</template>

<script>
export default {
  props: {
    message: { type: String, required: true },
    type: { type: String, default: 'info' },
    dismissible: { type: Boolean, default: false },
  },
};
</script>

<style lang="scss" scoped>
.notification-list-item {
  transition: all .3s ease-in-out;
}
</style>

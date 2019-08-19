<template>
  <ui-dropdown-menu :items="items" variant="transparent" align-right>
    <i class="user-icon fas fa-user-circle"></i>
  </ui-dropdown-menu>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { label: 'Change Password', to: { name: 'change-password' } },
        { label: 'Logout', to: { name: 'logout' } },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.user-icon {
  font-size: 32px;
  color: #fff;
}
</style>

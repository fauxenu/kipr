<template>
  <div id="login-page">
    <div class="form-container">
      <login-form @login="onLogin" />
      <router-link class="btn btn-sm btn-link btn-block text-light" :to="{ name: 'signup' }">
        Or create an account
      </router-link>
    </div>
  </div>
</template>

<script>
import LoginForm from '@/components/LoginForm';

export default {
  components: { LoginForm },
  methods: {
    onLogin() {
      this.$router.push({ name: 'dashboard' });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/scss/variables';

#login-page {
  background-color: $purple;
  min-height: 100vh;
  padding-top: 30vh;
}

.form-container {
  max-width: 300px;
  margin: 0 auto;
}
</style>
